use crate::db::{DbError, TypedDB, DB};
use crate::UpdateMeta;
use crate::{
    accumulator::merkle::Proof, traits::RawCommittedMessage, utils, Decode, OpticsMessage,
    SignedUpdate,
};
use color_eyre::Result;
use ethers::core::types::H256;
use tokio::time::sleep;
use tracing::{debug, warn};

use std::future::Future;
use std::time::Duration;

use crate::db::iterator::PrefixIterator;

static LEAF_IDX: &str = "leaf_index_";
static LEAF: &str = "leaf_";
static PREV_ROOT: &str = "update_prev_root_";
static PROOF: &str = "proof_";
static MESSAGE: &str = "message_";
static UPDATE: &str = "update_";
static UPDATE_META: &str = "update_metadata_";
static LATEST_ROOT: &str = "update_latest_root_";
static LATEST_NONCE: &str = "latest_nonce_";
static LATEST_LEAF_INDEX: &str = "latest_known_leaf_index_";
static PRODUCED_UPDATE: &str = "produced_update_";

/// DB handle for storing data tied to a specific home.
///
/// Key structure: ```<entity>_<additional_prefix(es)>_<key>```
#[derive(Debug, Clone)]
pub struct OpticsDB {
    entity: String,
    db: TypedDB,
}

impl std::ops::Deref for OpticsDB {
    type Target = TypedDB;

    fn deref(&self) -> &Self::Target {
        &self.db
    }
}

impl OpticsDB {
    /// Instantiated new `OpticsDB`
    pub fn new(entity: impl AsRef<str>, db: DB) -> Self {
        Self {
            entity: entity.as_ref().to_owned(),
            db: TypedDB::new(db),
        }
    }

    /// Store a raw committed message
    ///
    /// Keys --> Values:
    /// - `destination_and_nonce` --> `leaf`
    /// - `leaf_index` --> `leaf`
    /// - `leaf` --> `message`
    pub fn store_raw_committed_message(&self, message: &RawCommittedMessage) -> Result<()> {
        let parsed = OpticsMessage::read_from(&mut message.message.clone().as_slice())?;

        let destination_and_nonce = parsed.destination_and_nonce();

        let leaf = message.leaf();

        debug!(
            leaf = ?leaf,
            destination_and_nonce,
            destination = parsed.destination,
            nonce = parsed.nonce,
            leaf_index = message.leaf_index,
            "storing raw committed message in db"
        );
        self.store_leaf(message.leaf_index, destination_and_nonce, leaf)?;
        self.store_keyed_encodable(&self.entity, MESSAGE, &leaf, message)?;
        Ok(())
    }

    /// Store the latest known leaf_index
    ///
    /// Key --> value: `LATEST_LEAF_INDEX` --> `leaf_index`
    pub fn update_latest_leaf_index(&self, leaf_index: u32) -> Result<(), DbError> {
        if let Ok(Some(idx)) = self.retrieve_latest_leaf_index() {
            if leaf_index <= idx {
                return Ok(());
            }
        }
        self.store_encodable(&self.entity, "", LATEST_LEAF_INDEX, &leaf_index)
    }

    /// Retrieve the highest known leaf_index
    pub fn retrieve_latest_leaf_index(&self) -> Result<Option<u32>, DbError> {
        self.retrieve_decodable(&self.entity, "", LATEST_LEAF_INDEX)
    }

    /// Store the leaf keyed by leaf_index
    fn store_leaf(
        &self,
        leaf_index: u32,
        destination_and_nonce: u64,
        leaf: H256,
    ) -> Result<(), DbError> {
        debug!(
            leaf_index,
            leaf = ?leaf,
            "storing leaf hash keyed by index and dest+nonce"
        );
        self.store_keyed_encodable(&self.entity, LEAF, &destination_and_nonce, &leaf)?;
        self.store_keyed_encodable(&self.entity, LEAF, &leaf_index, &leaf)?;
        self.update_latest_leaf_index(leaf_index)
    }

    /// Retrieve a raw committed message by its leaf hash
    pub fn message_by_leaf(&self, leaf: H256) -> Result<Option<RawCommittedMessage>, DbError> {
        self.retrieve_keyed_decodable(&self.entity, MESSAGE, &leaf)
    }

    /// Retrieve the leaf hash keyed by leaf index
    pub fn leaf_by_leaf_index(&self, leaf_index: u32) -> Result<Option<H256>, DbError> {
        self.retrieve_keyed_decodable(&self.entity, LEAF, &leaf_index)
    }

    /// Retrieve the leaf hash keyed by destination and nonce
    pub fn leaf_by_nonce(&self, destination: u32, nonce: u32) -> Result<Option<H256>, DbError> {
        let dest_and_nonce = utils::destination_and_nonce(destination, nonce);
        self.retrieve_keyed_decodable(&self.entity, LEAF, &dest_and_nonce)
    }

    /// Retrieve a raw committed message by its leaf hash
    pub fn message_by_nonce(
        &self,
        destination: u32,
        nonce: u32,
    ) -> Result<Option<RawCommittedMessage>, DbError> {
        let leaf = self.leaf_by_nonce(destination, nonce)?;
        match leaf {
            None => Ok(None),
            Some(leaf) => self.message_by_leaf(leaf),
        }
    }

    /// Retrieve a raw committed message by its leaf index
    pub fn message_by_leaf_index(
        &self,
        index: u32,
    ) -> Result<Option<RawCommittedMessage>, DbError> {
        let leaf: Option<H256> = self.leaf_by_leaf_index(index)?;
        match leaf {
            None => Ok(None),
            Some(leaf) => self.message_by_leaf(leaf),
        }
    }

    /// Stores the latest inspected nonce for a given replica domain
    ///
    /// Keys --> Values:
    /// - `replica_domain` --> `nonce`
    pub fn store_latest_nonce(&self, replica_domain: u32, nonce: u32) -> Result<(), DbError> {
        self.store_keyed_encodable(&self.entity, LATEST_NONCE, &replica_domain, &nonce)?;

        Ok(())
    }

    /// Retrieves the latest inspected nonce for a given replica domain
    pub fn retrieve_latest_nonce(&self, replica_domain: u32) -> Result<Option<u32>, DbError> {
        self.retrieve_keyed_decodable(&self.entity, LATEST_NONCE, &replica_domain)
    }

    /// Store the latest committed
    fn store_latest_root(&self, entity: impl AsRef<[u8]>, root: H256) -> Result<(), DbError> {
        debug!(root = ?root, "storing new latest root in DB");
        self.store_encodable(entity, "", LATEST_ROOT, &root)
    }

    /// Retrieve the latest committed
    pub fn retrieve_latest_root(&self, entity: impl AsRef<[u8]>) -> Result<Option<H256>, DbError> {
        self.retrieve_decodable(entity, "", LATEST_ROOT)
    }

    /// Store update metadata (by update's new root)
    ///
    /// Keys --> Values:
    /// - `update_new_root` --> `update_metadata`
    pub fn store_update_metadata(
        &self,
        entity: impl AsRef<[u8]>,
        new_root: H256,
        metadata: UpdateMeta,
    ) -> Result<(), DbError> {
        debug!(new_root = ?new_root, metadata = ?metadata, "storing update metadata in DB");

        self.store_keyed_encodable(entity, UPDATE_META, &new_root, &metadata)
    }

    /// Retrieve update metadata (by update's new root)
    pub fn retrieve_update_metadata(
        &self,
        entity: impl AsRef<[u8]>,
        new_root: H256,
    ) -> Result<Option<UpdateMeta>, DbError> {
        self.retrieve_keyed_decodable(entity, UPDATE_META, &new_root)
    }

    /// Store a signed update building off latest root
    ///
    /// Keys --> Values:
    /// - `LATEST_ROOT` --> `root`
    /// - `new_root` --> `prev_root`
    /// - `prev_root` --> `update`
    pub fn store_latest_update(
        &self,
        entity: impl AsRef<[u8]>,
        update: &SignedUpdate,
    ) -> Result<(), DbError> {
        debug!(
            previous_root = ?update.update.previous_root,
            new_root = ?update.update.new_root,
            "storing update in DB"
        );

        // If there is no latest root, or if this update is on the latest root
        // update latest root
        match self.retrieve_latest_root(&entity)? {
            Some(root) => {
                if root == update.update.previous_root {
                    self.store_latest_root(&entity, update.update.new_root)?;
                } else {
                    warn!(
                        "Attempted to store update not building off latest root: {:?}",
                        update
                    )
                }
            }
            None => self.store_latest_root(&entity, update.update.new_root)?,
        }

        self.store_keyed_encodable(&entity, UPDATE, &update.update.previous_root, update)?;
        self.store_keyed_encodable(
            &entity,
            PREV_ROOT,
            &update.update.new_root,
            &update.update.previous_root,
        )
    }

    /// Retrieve an update by its previous root
    pub fn update_by_previous_root(
        &self,
        entity: impl AsRef<[u8]>,
        previous_root: H256,
    ) -> Result<Option<SignedUpdate>, DbError> {
        self.retrieve_keyed_decodable(entity, UPDATE, &previous_root)
    }

    /// Retrieve an update by its new root
    pub fn update_by_new_root(
        &self,
        entity: impl AsRef<[u8]>,
        new_root: H256,
    ) -> Result<Option<SignedUpdate>, DbError> {
        let prev_root: Option<H256> =
            self.retrieve_keyed_decodable(&entity, PREV_ROOT, &new_root)?;

        match prev_root {
            Some(prev_root) => self.update_by_previous_root(&entity, prev_root),
            None => Ok(None),
        }
    }

    /// Iterate over all leaves
    pub fn leaf_iterator(&self) -> PrefixIterator<H256> {
        PrefixIterator::new(self.db().prefix_iterator(LEAF_IDX), LEAF_IDX.as_ref())
    }

    /// Store a proof by its leaf index
    ///
    /// Keys --> Values:
    /// - `leaf_index` --> `proof`
    pub fn store_proof(&self, leaf_index: u32, proof: &Proof) -> Result<(), DbError> {
        debug!(leaf_index, "storing proof in DB");
        self.store_keyed_encodable(&self.entity, PROOF, &leaf_index, proof)
    }

    /// Retrieve a proof by its leaf index
    pub fn proof_by_leaf_index(&self, leaf_index: u32) -> Result<Option<Proof>, DbError> {
        self.retrieve_keyed_decodable(&self.entity, PROOF, &leaf_index)
    }

    // TODO(james): this is a quick-fix for the prover_sync and I don't like it
    /// poll db ever 100 milliseconds waitinf for a leaf.
    pub fn wait_for_leaf(
        &self,
        leaf_index: u32,
    ) -> impl Future<Output = Result<Option<H256>, DbError>> {
        let slf = self.clone();
        async move {
            loop {
                if let Some(leaf) = slf.leaf_by_leaf_index(leaf_index)? {
                    return Ok(Some(leaf));
                }
                sleep(Duration::from_millis(100)).await
            }
        }
    }

    /// Store a pending update in the DB for potential submission.
    ///
    /// This does not produce update meta or update the latest update db value.
    /// It is used by update production and submission.
    pub fn store_produced_update(&self, update: &SignedUpdate) -> Result<(), DbError> {
        self.store_keyed_encodable(
            "updater",
            PRODUCED_UPDATE,
            &update.update.previous_root,
            update,
        )?;

        Ok(())
    }

    /// Retrieve a pending update from the DB (if one exists).
    pub fn retrieve_produced_update(
        &self,
        previous_root: H256,
    ) -> Result<Option<SignedUpdate>, DbError> {
        self.retrieve_keyed_decodable("updater", PRODUCED_UPDATE, &previous_root)
    }
}
