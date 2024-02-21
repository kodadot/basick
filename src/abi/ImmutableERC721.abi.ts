export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner_"
            },
            {
                "type": "string",
                "name": "name_"
            },
            {
                "type": "string",
                "name": "symbol_"
            },
            {
                "type": "string",
                "name": "baseURI_"
            },
            {
                "type": "string",
                "name": "contractURI_"
            },
            {
                "type": "address",
                "name": "operatorAllowlist_"
            },
            {
                "type": "address",
                "name": "royaltyReceiver_"
            },
            {
                "type": "uint96",
                "name": "feeNumerator_"
            }
        ]
    },
    {
        "type": "error",
        "name": "AllowlistDoesNotImplementIOperatorAllowlist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ApproveTargetNotInAllowlist",
        "inputs": [
            {
                "type": "address",
                "name": "target"
            }
        ]
    },
    {
        "type": "error",
        "name": "ApproverNotInAllowlist",
        "inputs": [
            {
                "type": "address",
                "name": "approver"
            }
        ]
    },
    {
        "type": "error",
        "name": "CallerNotInAllowlist",
        "inputs": [
            {
                "type": "address",
                "name": "caller"
            }
        ]
    },
    {
        "type": "error",
        "name": "IImmutableERC721IDAboveThreshold",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ]
    },
    {
        "type": "error",
        "name": "IImmutableERC721MismatchedTokenOwner",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "currentOwner"
            }
        ]
    },
    {
        "type": "error",
        "name": "IImmutableERC721MismatchedTransferLengths",
        "inputs": []
    },
    {
        "type": "error",
        "name": "IImmutableERC721NotOwnerOrOperator",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ]
    },
    {
        "type": "error",
        "name": "IImmutableERC721SendingToZerothAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "IImmutableERC721TokenAlreadyBurned",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ]
    },
    {
        "type": "error",
        "name": "InvalidShortString",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidSignature",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PermitExpired",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SignerCannotBeZerothAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "StringTooLong",
        "inputs": [
            {
                "type": "string",
                "name": "str"
            }
        ]
    },
    {
        "type": "error",
        "name": "TransferFromNotInAllowlist",
        "inputs": [
            {
                "type": "address",
                "name": "from"
            }
        ]
    },
    {
        "type": "error",
        "name": "TransferToNotInAllowlist",
        "inputs": [
            {
                "type": "address",
                "name": "to"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Approval",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "approved",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "approved",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EIP712DomainChanged",
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OperatorAllowlistRegistryUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "oldRegistry",
                "indexed": false
            },
            {
                "type": "address",
                "name": "newRegistry",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true
            },
            {
                "type": "bytes32",
                "name": "previousAdminRole",
                "indexed": true
            },
            {
                "type": "bytes32",
                "name": "newAdminRole",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RoleGranted",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true
            },
            {
                "type": "address",
                "name": "account",
                "indexed": true
            },
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RoleRevoked",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true
            },
            {
                "type": "address",
                "name": "account",
                "indexed": true
            },
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "MINTER_ROLE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "approve",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
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
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "baseURI",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "burn",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "burnBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "tokenIDs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "contractURI",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "eip712Domain",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes1",
                "name": "fields"
            },
            {
                "type": "string",
                "name": "name"
            },
            {
                "type": "string",
                "name": "version"
            },
            {
                "type": "uint256",
                "name": "chainId"
            },
            {
                "type": "address",
                "name": "verifyingContract"
            },
            {
                "type": "bytes32",
                "name": "salt"
            },
            {
                "type": "uint256[]",
                "name": "extensions"
            }
        ]
    },
    {
        "type": "function",
        "name": "exists",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getAdmins",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getApproved",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getRoleMember",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            },
            {
                "type": "uint256",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getRoleMemberCount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "grantMinterRole",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "user"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "grantRole",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "hasRole",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "address",
                "name": "operator"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "mint",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
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
        "name": "mintBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "mints",
                "components": [
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "uint256[]",
                        "name": "tokenIds"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "mintBatchByQuantity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "mints",
                "components": [
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "uint256",
                        "name": "quantity"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "mintBatchByQuantityThreshold",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "mintByQuantity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "quantity"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "name",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "nonces",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "operatorAllowlist",
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
        "name": "ownerOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "permit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bytes",
                "name": "sig"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "renounceRole",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "revokeMinterRole",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "user"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "revokeRole",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "role"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "royaltyInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "salePrice"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "safeBurn",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
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
        "name": "safeBurnBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "burns",
                "components": [
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "uint256[]",
                        "name": "tokenIds"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeMint",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
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
        "name": "safeMintBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "mints",
                "components": [
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "uint256[]",
                        "name": "tokenIds"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeMintBatchByQuantity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "mints",
                "components": [
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "uint256",
                        "name": "quantity"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeMintByQuantity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "quantity"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
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
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes",
                "name": "_data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeTransferFromBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "tr",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address[]",
                        "name": "tos"
                    },
                    {
                        "type": "uint256[]",
                        "name": "tokenIds"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "bool",
                "name": "approved"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBaseURI",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "baseURI_"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setContractURI",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_contractURI"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setDefaultRoyaltyReceiver",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "receiver"
            },
            {
                "type": "uint96",
                "name": "feeNumerator"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setNFTRoyaltyReceiver",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "receiver"
            },
            {
                "type": "uint96",
                "name": "feeNumerator"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setNFTRoyaltyReceiverBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "address",
                "name": "receiver"
            },
            {
                "type": "uint96",
                "name": "feeNumerator"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "symbol",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "tokenURI",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "totalSupply",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    }
]
