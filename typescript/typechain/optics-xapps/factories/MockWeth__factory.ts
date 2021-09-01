/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockWeth, MockWethInterface } from "../MockWeth";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amnt",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "domainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amnt",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_newSymbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_newDecimals",
        type: "uint8",
      },
    ],
    name: "setDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9608052610120604052600160e052603160f81b610100527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660a05261190160f01b60c05234801561007057600080fd5b5060805160a05160c05160f01c61227c6100a560003980611060525080611486525080610d945280610ffc525061227c6000f3fe6080604052600436106101805760003560e01c80638129fc1c116100d6578063a9059cbb1161007f578063dd62ed3e11610059578063dd62ed3e146106c2578063f2fde38b1461070a578063f698da251461074a57610180565b8063a9059cbb14610609578063d0e30db01461064f578063d505accf1461065757610180565b8063982aaf6b116100b0578063982aaf6b146105685780639dc29fac1461057d578063a457c2d7146105c357610180565b80638129fc1c146105005780638da5cb5b1461051557806395d89b411461055357610180565b8063395093511161013857806370a082311161011257806370a082311461046b578063715018a6146104ab5780637ecebe00146104c057610180565b8063395093511461030b57806340c10f1914610351578063654935f41461039957610180565b806318160ddd1161016957806318160ddd1461026957806323b872dd14610290578063313ce567146102e057610180565b806306fdde0314610185578063095ea7b31461020f575b600080fd5b34801561019157600080fd5b5061019a61075f565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101d45781810151838201526020016101bc565b50505050905090810190601f1680156102015780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561021b57600080fd5b506102556004803603604081101561023257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610813565b604080519115158252519081900360200190f35b34801561027557600080fd5b5061027e610829565b60408051918252519081900360200190f35b34801561029c57600080fd5b50610255600480360360608110156102b357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020810135909116906040013561082f565b3480156102ec57600080fd5b506102f56108a5565b6040805160ff9092168252519081900360200190f35b34801561031757600080fd5b506102556004803603604081101561032e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356108ae565b34801561035d57600080fd5b506103976004803603604081101561037457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356108f1565b005b3480156103a557600080fd5b50610397600480360360608110156103bc57600080fd5b8101906020810181356401000000008111156103d757600080fd5b8201836020820111156103e957600080fd5b8035906020019184600183028401116401000000008311171561040b57600080fd5b91939092909160208101903564010000000081111561042957600080fd5b82018360208201111561043b57600080fd5b8035906020019184600183028401116401000000008311171561045d57600080fd5b91935091503560ff166109a7565b34801561047757600080fd5b5061027e6004803603602081101561048e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610aa1565b3480156104b757600080fd5b50610397610ab2565b3480156104cc57600080fd5b5061027e600480360360208110156104e357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610bc9565b34801561050c57600080fd5b50610397610bdb565b34801561052157600080fd5b5061052a610cf7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561055f57600080fd5b5061019a610d13565b34801561057457600080fd5b5061027e610d92565b34801561058957600080fd5b50610397600480360360408110156105a057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610db6565b3480156105cf57600080fd5b50610255600480360360408110156105e657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610e68565b34801561061557600080fd5b506102556004803603604081101561062c57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610ec4565b610397610ed1565b34801561066357600080fd5b50610397600480360360e081101561067a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610edd565b3480156106ce57600080fd5b5061027e600480360360408110156106e557600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661120a565b34801561071657600080fd5b506103976004803603602081101561072d57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611242565b34801561075657600080fd5b5061027e6113e4565b60688054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108095780601f106107de57610100808354040283529160200191610809565b820191906000526020600020905b8154815290600101906020018083116107ec57829003601f168201915b5050505050905090565b60006108203384846114da565b50600192915050565b60675490565b600061083c848484611621565b61089b8433610896856040518060600160405280602881526020016121906028913973ffffffffffffffffffffffffffffffffffffffff8a16600090815260666020908152604080832033845290915290205491906117f3565b6114da565b5060019392505050565b606a5460ff1690565b33600081815260666020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909161082091859061089690866118a4565b6108f961191f565b73ffffffffffffffffffffffffffffffffffffffff16610917610cf7565b73ffffffffffffffffffffffffffffffffffffffff161461099957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6109a38282611923565b5050565b6109af61191f565b73ffffffffffffffffffffffffffffffffffffffff166109cd610cf7565b73ffffffffffffffffffffffffffffffffffffffff1614610a4f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610a5b60688686611fef565b50610a6860698484611fef565b50606a80547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660ff9290921691909117905550505050565b6000610aac82611a56565b92915050565b610aba61191f565b73ffffffffffffffffffffffffffffffffffffffff16610ad8610cf7565b73ffffffffffffffffffffffffffffffffffffffff1614610b5a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b606b6020526000908152604090205481565b600054610100900460ff1680610bf45750610bf4611a7e565b80610c02575060005460ff16155b610c57576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612162602e913960400191505060405180910390fd5b600054610100900460ff16158015610cbd57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b610cc5611a8f565b8015610cf457600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b50565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b60698054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108095780601f106107de57610100808354040283529160200191610809565b7f000000000000000000000000000000000000000000000000000000000000000081565b610dbe61191f565b73ffffffffffffffffffffffffffffffffffffffff16610ddc610cf7565b73ffffffffffffffffffffffffffffffffffffffff1614610e5e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6109a38282611b81565b60006108203384610896856040518060600160405280602581526020016122226025913933600090815260666020908152604080832073ffffffffffffffffffffffffffffffffffffffff8d16845290915290205491906117f3565b6000610820338484611621565b610edb3334611923565b565b83421115610f4c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8716610fce57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332305065726d69743a206f776e6572207a65726f206164647265737300604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8088166000818152606b602090815260408083205481517f00000000000000000000000000000000000000000000000000000000000000008185015280830195909552948b166060850152608084018a905260a0840185905260c08085018a90528151808603909101815260e090940190528251920191909120907f00000000000000000000000000000000000000000000000000000000000000006110876113e4565b83604051602001808461ffff1660f01b81526002018381526020018281526020019350505050604051602081830303815290604052805190602001209050600060018288888860405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611121573d6000803e3d6000fd5b5050506020604051035190508a73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146111c757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8b166000908152606b602052604090206001850190556111fd8b8b8b6114da565b5050505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260666020908152604080832093909416825291909152205490565b61124a61191f565b73ffffffffffffffffffffffffffffffffffffffff16611268610cf7565b73ffffffffffffffffffffffffffffffffffffffff16146112ea57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116611356576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806120f46026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000804690507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6068600001604051808280546001816001161561010002031660029004801561146b5780601f1061144957610100808354040283529182019161146b565b820191906000526020600020905b815481529060010190602001808311611457575b505060408051918290038220602080840196909652828201527f0000000000000000000000000000000000000000000000000000000000000000606083015260808201959095523060a0808301919091528551808303909101815260c090910190945250508151910120905090565b73ffffffffffffffffffffffffffffffffffffffff8316611546576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806121fe6024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166115b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061211a6022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260666020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff831661168d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806121d96025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166116f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806120af6023913960400191505060405180910390fd5b611704838383611ccb565b61174e8160405180606001604052806026815260200161213c6026913973ffffffffffffffffffffffffffffffffffffffff861660009081526065602052604090205491906117f3565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260656020526040808220939093559084168152205461178a90826118a4565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526065602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561189c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611861578181015183820152602001611849565b50505050905090810190601f16801561188e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008282018381101561191857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b3390565b73ffffffffffffffffffffffffffffffffffffffff82166119a557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6119b160008383611ccb565b6067546119be90826118a4565b60675573ffffffffffffffffffffffffffffffffffffffff82166000908152606560205260409020546119f190826118a4565b73ffffffffffffffffffffffffffffffffffffffff831660008181526065602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526065602052604090205490565b6000611a8930611cd0565b15905090565b600054610100900460ff1680611aa85750611aa8611a7e565b80611ab6575060005460ff16155b611b0b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612162602e913960400191505060405180910390fd5b600054610100900460ff16158015611b7157600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b611b79611cd6565b610cc5611de8565b73ffffffffffffffffffffffffffffffffffffffff8216611bed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806121b86021913960400191505060405180910390fd5b611bf982600083611ccb565b611c43816040518060600160405280602281526020016120d26022913973ffffffffffffffffffffffffffffffffffffffff851660009081526065602052604090205491906117f3565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260656020526040902055606754611c769082611f78565b60675560408051828152905160009173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b505050565b3b151590565b600054610100900460ff1680611cef5750611cef611a7e565b80611cfd575060005460ff16155b611d52576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612162602e913960400191505060405180910390fd5b600054610100900460ff16158015610cc557600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790558015610cf457600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600054610100900460ff1680611e015750611e01611a7e565b80611e0f575060005460ff16155b611e64576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180612162602e913960400191505060405180910390fd5b600054610100900460ff16158015611eca57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b6000611ed461191f565b603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610cf457600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600082821115611fe957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826120255760008555612089565b82601f1061205c578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00823516178555612089565b82800160010185558215612089579182015b8281111561208957823582559160200191906001019061206e565b50612095929150612099565b5090565b5b80821115612095576000815560010161209a56fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122087487281dcb6f340c36b04d97239b771b42a3640023f9f72f8ae31270469c98864736f6c63430007060033";

export class MockWeth__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockWeth> {
    return super.deploy(overrides || {}) as Promise<MockWeth>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockWeth {
    return super.attach(address) as MockWeth;
  }
  connect(signer: Signer): MockWeth__factory {
    return super.connect(signer) as MockWeth__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockWethInterface {
    return new utils.Interface(_abi) as MockWethInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockWeth {
    return new Contract(address, _abi, signerOrProvider) as MockWeth;
  }
}
