const abi = [
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
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_satisfied",
				"type": "bool"
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
				"name": "satisfied",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
			}
		],
		"name": "executeTrade",
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
	}
];

export default abi;