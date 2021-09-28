import { OpticsContext } from "@optics-xyz/multi-provider";
import { xapps, core } from '@optics-xyz/ts-interface'
import { TypedEvent, TypedEventFilter } from "@optics-xyz/ts-interface/dist/optics-xapps/commons";
import { Event, BaseContract, BigNumber, ethers } from "ethers";
import { getBlockHeight } from "./utils";
import config from "./config";

export type SendEvent = TypedEvent<[string, string, number, string, BigNumber] & { token: string; from: string; toDomain: number; toId: string; amount: BigNumber; }>
export type TokenDeployedEvent = TypedEvent<[number, string, string] & { domain: number; id: string; representation: string }>

export type UpdateEvent = TypedEvent<[number, string, string, string] & {homeDomain: number; oldRoot: string; newRoot: string; signature: string;}>
export type ProcessEvent = TypedEvent<[string, boolean, string] & { messageHash: string; success: boolean; returnData: string;}>

export type ProcessEventFilter = TypedEventFilter<[string, boolean, string], {messageHash: string; success: boolean; returnData: string;}>
export type UpdateFilter = TypedEventFilter<[number, string, string, string], {homeDomain: number; oldRoot: string; newRoot: string; signature: string;}>

interface SendDetail {
    name?: string;
    symbol?: string;
    decimals?: number;
    address: string;
    total: BigNumber;
}

interface SendDetails {
    [key: string]: SendDetail
}

interface TokenDeployDetail {
    name?: string;
    symbol?: string;
    decimals?: number;
    address: string;
    id: string;
    domain: number;
}

interface TokenDeployDetails {
    [key: string]: TokenDeployDetail
}


async function getLogs(chainName: string, context: OpticsContext, contract: BaseContract, logFilter: TypedEventFilter<any, any>, blockNumber?: number): Promise<Array<Event>> {
    if(blockNumber) {
        return contract.queryFilter(logFilter, blockNumber, blockNumber);
    }
    // TODO: this is a major kludge, will update to be more general within multi-provider
    const POLYGON_FIRST_BLOCK = 18895794;
    const POLYGON = "polygon";
    const BLOCKS_PER_PAGE = 2500;
    if (chainName == POLYGON || chainName == "matic") {
        const provider = context.getProvider("polygon");
        let currentBlockHeight = await provider!.getBlockNumber();
        let logsPromises = [];
        for (let index = POLYGON_FIRST_BLOCK; index < currentBlockHeight; index += BLOCKS_PER_PAGE) {
            let endBlock = index + BLOCKS_PER_PAGE > currentBlockHeight ? currentBlockHeight : index + BLOCKS_PER_PAGE;
            const logsPromise = contract.queryFilter(logFilter, index, endBlock);
            logsPromises.push(logsPromise);
        }
        const logsArrays = await Promise.all(logsPromises);
        let logs: Array<Event> = [];
        for(let logsArray of logsArrays) {
            logs = logs.concat(logsArray);
        }
        return logs;
    } else {
        return await contract.queryFilter(logFilter);
    }
}

async function getSendEvents(context:OpticsContext, networkName:string, fromBlock:number, toBlock?:number) {
    let router = context.mustGetBridge(networkName).bridgeRouter;
    let filter = router.filters.Send();
    if(toBlock){
        return router.queryFilter(filter, fromBlock, toBlock);
    }
    else{
        return router.queryFilter(filter, fromBlock);
    }
}

async function processSendEvents(context: OpticsContext, networkName:string, events: SendEvent[]){
    let token = new xapps.BridgeToken__factory()
    let details: SendDetails = {};

    // events.forEach(async (event) => {
        
    // })
    for (let index = 0; index < events.length; index++) {
        const event = events[index];
        const address = event.args["token"]
        try {
            if (address in details){
                //console.log(`adding ${event.args["amount"]} to ${address}`)
                details[address].total = details[address].total.add(event.args["amount"])
            }
            else {
                let contract = token.attach(address).connect(context.getProvider(networkName) ?? "")
                let name = await contract.name()
                let symbol = await contract.symbol()
                let decimals = await contract.decimals()
                details[address] = {
                    name: name,
                    symbol: symbol,
                    address: address,
                    decimals: decimals,
                    total: event.args["amount"]
                }
            }
            
        } catch (error) {
            console.log(error)
            if (address in details){
                details[address].total.add(event.args["amount"])
            }
            else {
                details[address] = {
                    address: address,
                    total: event.args["amount"]
                }
            }
        }
    } 
    return details
}

async function getTokenDeployedEvents(context:OpticsContext, networkName:string, fromBlock:number, toBlock?:number) {
    let router = context.mustGetBridge(networkName).bridgeRouter;
    let filter = router.filters.TokenDeployed();
    if(toBlock){
        return router.queryFilter(filter, fromBlock, toBlock);
    }
    else{
        return router.queryFilter(filter, fromBlock);
    }
}

async function processTokenDeployedEvents(context: OpticsContext, networkName:string, events: TokenDeployedEvent[]){
    let token = new xapps.BridgeToken__factory()
    let details: TokenDeployDetails = {};

    for (let index = 0; index < events.length; index++) {
        const event = events[index];
        const address = event.args["representation"]
        const tokenId = event.args["id"]
        const domain = event.args["domain"]
        
        try {
            let contract = token.attach(address).connect(context.getProvider(networkName) ?? "")
            let name = await contract.name()
            let symbol = await contract.symbol()
            let decimals = await contract.decimals()
            details[address] = {
                name: name,
                symbol: symbol,
                address: address,
                decimals: decimals,
                id: tokenId,
                domain: domain
            }
        } catch(error) {
            console.log(error)
            console.log(event)
            details[address] = {
                address: address,
                id: tokenId,
                domain: domain
            }
        }
        
    } 
    return details
}

export { getSendEvents };
export { getTokenDeployedEvents };
export { processSendEvents };
export { processTokenDeployedEvents };
export { TokenDeployDetails }
export {getLogs}