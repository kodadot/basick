export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "initialOwner"
            }
        ]
    },
    {
        "type": "function",
        "name": "collectionRegistry",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "name": "",
                "components": [
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "symbol"
                    },
                    {
                        "type": "string",
                        "name": "contractURI"
                    },
                    {
                        "type": "string",
                        "name": "baseURI"
                    },
                    {
                        "type": "uint256",
                        "name": "maxSupply"
                    },
                    {
                        "type": "address",
                        "name": "royaltyRecipient"
                    },
                    {
                        "type": "uint256",
                        "name": "royaltyPercentageBps"
                    },
                    {
                        "type": "uint8",
                        "name": "collectionType"
                    },
                    {
                        "type": "tuple",
                        "name": "mintInfo",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "price"
                            },
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "bytes4",
                                "name": "selector"
                            },
                            {
                                "type": "uint8",
                                "name": "mintType"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "paused",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "registerCollection",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "address",
                "name": "creator"
            },
            {
                "type": "uint256",
                "name": "maxSupply"
            },
            {
                "type": "string",
                "name": "contractUri"
            },
            {
                "type": "string",
                "name": "baseUri"
            },
            {
                "type": "tuple",
                "name": "mintInfo",
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "address",
                        "name": "token"
                    },
                    {
                        "type": "bytes4",
                        "name": "selector"
                    },
                    {
                        "type": "uint8",
                        "name": "mintType"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registerMultipleTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registerRoyalty",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registerSingleToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeCollection",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setAttribute",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "string",
                "name": "key"
            },
            {
                "type": "string",
                "name": "value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateMintInfo",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "tuple",
                "name": "mintInfo",
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "address",
                        "name": "token"
                    },
                    {
                        "type": "bytes4",
                        "name": "selector"
                    },
                    {
                        "type": "uint8",
                        "name": "mintType"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "AttributeSet",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "string",
                "name": "key",
                "indexed": true
            },
            {
                "type": "string",
                "name": "value",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CollectionRegistered",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "address",
                "name": "creator",
                "indexed": true
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "tuple",
                "name": "info",
                "indexed": false,
                "components": [
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "symbol"
                    },
                    {
                        "type": "string",
                        "name": "contractURI"
                    },
                    {
                        "type": "string",
                        "name": "baseURI"
                    },
                    {
                        "type": "uint256",
                        "name": "maxSupply"
                    },
                    {
                        "type": "address",
                        "name": "royaltyRecipient"
                    },
                    {
                        "type": "uint256",
                        "name": "royaltyPercentageBps"
                    },
                    {
                        "type": "uint8",
                        "name": "collectionType"
                    },
                    {
                        "type": "tuple",
                        "name": "mintInfo",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "price"
                            },
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "bytes4",
                                "name": "selector"
                            },
                            {
                                "type": "uint8",
                                "name": "mintType"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CollectionRemoved",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "MintInfoUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "tuple",
                "name": "mintInfo",
                "indexed": false,
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "address",
                        "name": "token"
                    },
                    {
                        "type": "bytes4",
                        "name": "selector"
                    },
                    {
                        "type": "uint8",
                        "name": "mintType"
                    }
                ]
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Paused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RoyaltySet",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "address",
                "name": "recipient",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "royaltyBps",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenListRegistered",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "address[]",
                "name": "owners"
            },
            {
                "type": "string[]",
                "name": "tokenURIs"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenRegistered",
        "inputs": [
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "string",
                "name": "tokenURI",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Unpaused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "error",
        "name": "EnforcedPause",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ExpectedPause",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "type": "address",
                "name": "account"
            }
        ]
    },
    {
        "type": "error",
        "name": "RegistryInvalidCollection",
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            }
        ]
    },
    {
        "type": "error",
        "name": "RegistryNonexistentCollection",
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            }
        ]
    }
]
