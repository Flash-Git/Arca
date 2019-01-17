const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "clearBox",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "executeTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_ethOffer",
				"type": "int256"
			}
		],
		"name": "pushEthOffer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_contract",
				"type": "address"
			},
			{
				"name": "_encodedFunction",
				"type": "bytes"
			}
		],
		"name": "pushFuncOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_ethOffer",
				"type": "int256"
			},
			{
				"name": "_contract",
				"type": "address"
			},
			{
				"name": "_encodedFunction",
				"type": "bytes"
			}
		],
		"name": "pushOffer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_count",
				"type": "uint8"
			}
		],
		"name": "setCount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "setNotSatisfied",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_funcsHash",
				"type": "bytes32"
			}
		],
		"name": "setSatisfied",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amt",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_escrow",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "boxes",
		"outputs": [
			{
				"name": "ethOffer",
				"type": "int256"
			},
			{
				"name": "count",
				"type": "uint8"
			},
			{
				"name": "satisfied",
				"type": "bool"
			},
			{
				"name": "funcsHash",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "checkHashes",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_bitty1",
				"type": "bytes"
			},
			{
				"name": "_bitty2",
				"type": "bytes"
			},
			{
				"name": "_count",
				"type": "uint8"
			},
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			}
		],
		"name": "combineFuncs",
		"outputs": [
			{
				"name": "",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "escrow",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "ethBalances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add",
				"type": "address"
			},
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "getCount",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add",
				"type": "address"
			},
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "getEthOffer",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add",
				"type": "address"
			},
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "getFuncCall",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add",
				"type": "address"
			},
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "getFuncsHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add",
				"type": "address"
			},
			{
				"name": "_tradePartner",
				"type": "address"
			}
		],
		"name": "getSatisfied",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default abi;