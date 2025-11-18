<img alt="TikTok Logo" style="padding-right:20px;vertical-align:bottom" src="./images/tiktok.png" width="100" />  Summer Scholarship 2022 - Tokens
===========================================

## Notes
- This is an **archived project**. 
- This page summarises ouput from the scholarship.
- This work is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.


TikTok Token Contract
---------------------

Ethereum Network: **Rinkby**
  
  
TikTok Token Contract Address: **0x3Cd6b82D86416BC04A204e52443f74E608d0B2C5**
  
  
TikTok Token Contract ABI:
<div style="overflow:auto;height:400px; border:1px solid gray">
    <pre>
	[
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "approved",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "ApprovalForAll",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "tokenurl",
					"type": "string"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenid",
					"type": "uint256"
				}
			],
			"name": "TokenMint",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_minter",
					"type": "address"
				}
			],
			"name": "addMinter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getApproved",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				}
			],
			"name": "isApprovedForAll",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_minter",
					"type": "address"
				}
			],
			"name": "isMinter",
			"outputs": [
				{
					"internalType": "bool",
					"name": "success",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "newTokenURI",
					"type": "string"
				}
			],
			"name": "mintToken",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "ownerOf",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_minter",
					"type": "address"
				}
			],
			"name": "removeMinter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "data",
					"type": "bytes"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "setApprovalForAll",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_minter",
					"type": "address"
				}
			],
			"name": "suspendMinter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "tokenURI",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
    </pre>
</div>  

Noodle Video Token
------------------

TikTok Video URL:
[hhttps://www.tiktok.com/@user978522036/video/7127769987086880005?is_from_webapp=1&sender_device=pc&web_id=7125788811665884678](https://www.tiktok.com/@user978522036/video/7127769987086880005?is_from_webapp=1&sender_device=pc&web_id=7125788811665884678)
  
  
TikTok Token Image
![Image for TikTok Explanation Movie](https://nftstorage.link/ipfs/bafybeihmir777baxu2wdtgpdi7xpf3y4yrz42274wc4oqfgi4q5gciokja)
  
  
TikTok Token ID: 0
  
  
TikTok Token Metadata URL: <https://bafkreigrgzy3u2cuoixgjgseb4hm2djgpqhw5vnr7rfaqza5jgypxbnzxq.ipfs.nftstorage.link/>
  
  
TikTok Token Metadata:
  

```
	{
		"name": "How To Make Noodles KMI Scholarship Program",
		"description": "This is a tiktok video that showcases how to make noodles. This video was made for the purpose of the KMI Open University Summer Scholarship Program.",
		"image": "https://nftstorage.link/ipfs/bafybeihmir777baxu2wdtgpdi7xpf3y4yrz42274wc4oqfgi4q5gciokja",
		"properties": {
			"movieLength": "53 seconds",
			"beforeTikTokHash": "0xe3a6c1ac6543a6434650d8cd6291be3489d233f9e6d68c28d70dc7fa5a4f7631",
			"afterTikTokHash": "0xd887b25fe4005fbecdbb45d8dbeaa223df030ea1351c271eb33d198d70c8882a",
			"Video URL": "https://www.tiktok.com/@user978522036/video/7127769987086880005"
		}
	}
						
```

Scholarship Video Token
-----------------------

TikTok Video URL: [https://www.tiktok.com/@user978522036/video/7141390636904762630?is_from_webapp=1&sender_device=pc&web_id=7125788811665884678](https://www.tiktok.com/@user978522036/video/7141390636904762630?is_from_webapp=1&sender_device=pc&web_id=7125788811665884678)
  
  
TikTok Token Image
![Image for TikTok Demo Movie](https://nftstorage.link/ipfs/bafkreibav2y5x6pptiredjqtihdscvrxpz765fx75ghnqjczey2botcofa)
  
  
TikTok Token ID: 2
  
  
TikTok Token Metadata URL: <https://nftstorage.link/ipfs/bafkreic42l3bhg57mukxx4vzskdleanafwz3dcbhxciprfm64zxnyzwe4y>
  
  
TikTok Token Metadata:
  

```
	{
		"name": "Final KMI Video 2",
		"description": "Final video summarising all that happened during the KMI summer scholarship 2022: Turning TikTok Content into NFTs Project",
		"image": "https://nftstorage.link/ipfs/bafkreibav2y5x6pptiredjqtihdscvrxpz765fx75ghnqjczey2botcofa",
		"properties": {
			"movieLength": "2 minutes 58 seconds",
			"beforeTikTokHash": "0xc2515b63523682fc2b33ea61c07b471f249bbe1460a19b5bc256a36a0ea6c12c",
			"afterTikTokHash": "0x7c664b8282c5dcf200bb8f3f13d69ef65e2b07877bbea346b1c9d422c3f5758e",
			"Video URL": "https://www.tiktok.com/@user978522036/video/7141390636904762630"
		}
	}
						

