const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "getOfferErc20",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
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
				"name": "_erc20Address",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "pushOfferErc20",
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
				"name": "_count",
				"type": "uint8"
			}
		],
		"name": "setCountErc721",
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
				"name": "_partnerNonce",
				"type": "uint256"
			}
		],
		"name": "acceptTrade",
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
		"name": "unacceptTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "getOfferErc721",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
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
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			}
		],
		"name": "getErc721Count",
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
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_erc721Address",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "pushOfferErc721",
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
				"name": "_count",
				"type": "uint8"
			}
		],
		"name": "setCountErc20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			}
		],
		"name": "getNonce",
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
				"name": "_partnerNonce",
				"type": "uint256"
			}
		],
		"name": "acceptAndExecuteTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			}
		],
		"name": "getErc20Count",
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
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			}
		],
		"name": "getPartnerNonce",
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
			}
		],
		"name": "executeTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default abi;