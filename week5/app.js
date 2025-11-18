/*********************************************************************************
* The MIT License (MIT)                                                          *
*                                                                                *
* Copyright (c) 2022 KMi, The Open University UK                                 *
*                                                                                *
* Permission is hereby granted, free of charge, to any person obtaining          *
* a copy of this software and associated documentation files (the "Software"),   *
* to deal in the Software without restriction, including without limitation      *
* the rights to use, copy, modify, merge, publish, distribute, sublicense,       *
* and/or sell copies of the Software, and to permit persons to whom the Software *
* is furnished to do so, subject to the following conditions:                    *
*                                                                                *
* The above copyright notice and this permission notice shall be included in     *
* all copies or substantial portions of the Software.                            *
*                                                                                *
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR     *
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,       *
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL        *
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER     *
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  *
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN      *
* THE SOFTWARE.                                                                  *
*                                                                                *
**********************************************************************************/

// Used for storing Token Metadata to the public IPFS network using https://nft.storage/ service
const NFT_STORAGE_API_UPLOAD_URL = "https://api.nft.storage/upload";
const NFT_STORAGE_IPFS_URL_STUB = "https://nftstorage.link/ipfs/";
const NFT_STORAGE_IPFS_URL_END = ".ipfs.nftstorage.link/";

// This is an nft.storage API I got for testing from the nft.storage website.
// It will work, but if you want to get one of your own for your version of the code, please go here to find out how: https://nft.storage/docs/#get-an-api-token
const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJBOWMyMWY4RTQ4YzIwQ0Y1OEQ5N0FEMUNGNjFCQ2JFMjEwMzBDMjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NTI5ODE4OTUwMCwibmFtZSI6IklTV1MgU3VtbWVyIFNjaG9vbCJ9.28SHco_HLw0K_0LyKEKVLjWYlO46E9dcmnnZpoeyRG8';

const STORE_NAME = 'TikTokIssuedTokens';

let ethereum = {}
let account = "";

let provider = {};
let signer = {}


/**
 * Initialise page - load ethereum object, and any locally stored data.
 */
function initApp() {

	// connect this webpage to ethereum, through metamask
	setUpEthereumAndMetamask()

	/** load issued tokens from local storage, if there are any saved, into the data table **/
	if (window.localStorage.getItem(STORE_NAME)) {
		loadStoredData();
	} else {
		// setup an empty hash store
		window.localStorage.setItem(STORE_NAME, '[]');
	}

	/** Load contract details of last created contract, from local storage if stored from Week 4 demo **/
	if (window.localStorage.getItem('contractABI')) {
		document.getElementById('contractABI').value = window.localStorage.getItem('contractABI');
	}
	if (window.localStorage.getItem('contractAddress')) {
		document.getElementById('contractAddress').value = window.localStorage.getItem('contractAddress');
	}
}

/**
 * Setup ethereum and metmask.
 */
async function setUpEthereumAndMetamask() {
	ethereum = window.ethereum;

	// A Web3Provider wraps a standard Web3 provider, which is
	// what MetaMask injects as window.ethereum into each page
	provider = new ethers.providers.Web3Provider(window.ethereum)
	console.log('provider:', provider);

	// The MetaMask plugin also allows signing transactions to
	// send ether and pay to change state within the blockchain.
	// For this, you need the account signer...
	signer = provider.getSigner();
	console.log('signer:', signer);

	// Check if logged into MetaMask already
	if (typeof ethereum !== 'undefined') {

		// detect Network change and reassign provider and signer
		ethereum.on('chainChanged', async function() {
			provider = new ethers.providers.Web3Provider(window.ethereum)
			console.log('provider:', provider);
			signer = provider.getSigner();
			console.log('signer:', signer);

			// get the current network and write details to screen
			const network = await getNetwork();
			document.getElementById("network").value = JSON.stringify(result, null, 2);
		});

		// detect an account change
		ethereum.on("accountsChanged", () => {
			if (account != ethereum.selectedAddress) {
				account = ethereum.selectedAddress;
				document.getElementById('ethereumaccount').innerHTML = account;
			}
		});

		if (ethereum.isMetaMask) {
			console.log('MetaMask is installed');
		}

		if (ethereum.selectedAddress == "" || ethereum.selectedAddress == null) {
			const button = document.getElementById('enableEthereumButton');
			button.disabled = false;
		} else {
			const button = document.getElementById('enableEthereumButton');
			button.disabled = true;
			enableMetaMaskButtons();
			account = ethereum.selectedAddress;
			document.getElementById('ethereumaccount').innerHTML = account;
		}
	} else {
		const button = document.getElementById('enableEthereumButton');
		button.disabled = false;
		console.log('MetaMask needs to be installed.');
	}
}

/**
 * Start the metamask extension for user to login.
 */
async function loginToMetaMask() {

	let reply = await ethereum.request({ method: 'eth_requestAccounts' });

	if (ethereum.selectedAddress) {
		const button = document.getElementById('enableEthereumButton');
		button.disabled = true;

		enableMetaMaskButtons();

		account = ethereum.selectedAddress;
		document.getElementById('ethereumaccount').innerHTML = account;
	} else {
		alert("Please select a MetaMask account to use with this page.");
	}
}

/**
 * Enable metamask dependent buttons after connected to Metamask
 */
function enableMetaMaskButtons() {

	const anchorMetadataTokenButton = document.getElementById('anchorMetadataTokenButton'); // write to blockchain
	anchorMetadataTokenButton.disabled = false;
}

/**
 * Ask MetaMask for the details of the current network selected.
 */
async function getNetwork() {
	try {
		// get the chain id of the current blockchain your wallet is pointing at.
		const chainId = await signer.getChainId();
		//console.log(chainId);

		// get the network details for the given chain id.
		const network = await provider.getNetwork(chainId);
		//console.log(network);

		return network;
	} catch (e) {
		throw e;
	}
}

/** WEEK 5 - NEW FUNCTIONS **/

/**
 * Load an image from a local file.
 * Post the file to IPFS and get a url for it back
 */
async function loadImage() {
	var filefield = document.getElementById('tokenImageFile');
	if (filefield) {
		var file = filefield.files[0];
		if (file) {

			let result = await storeFileToIPFS(file);
			result = JSON.parse(result);

			let hash = result.value.cid;
			let tokenimageurl = NFT_STORAGE_IPFS_URL_STUB + hash;

			document.getElementById('tokenImageURL').value = tokenimageurl;

		} else {
			alert("Please select a token image file first.");
		}
	} else {
		alert("Please select a a token imagefile first.");
	}
}

/**
 * Load all the required data from the page and if all there
 * Create a Token and issue it to the blockchain.
 * Store the details into browser local storage.
 */
async function createToken() {

	try {
		// fetch the data from the html page
		const contractABI = document.getElementById('contractABI').value;
		if (contractABI.trim() == "" || contractABI == null) {
			alert("Please enter the contract abi for the contract addess given.");
			return;
		}
		const contractAddress = document.getElementById('contractAddress').value;
		if (contractAddress.trim() == "" || contractAddress == null) {
			alert("Please enter token contract address to issue this token on.");
			return;
		}

		const name = document.getElementById('tokenName').value;
		if (name.trim() == "" || name == null) {
			alert("Please enter a name for this Token.");
			return;
		}
		const description = document.getElementById('tokenDescription').value;
		if (description == null || description.trim() == "") {
			alert("Please enter a description for this Token.");
			return;
		}
		const imageurl = document.getElementById('tokenImageURL').value;
		if ( (imageurl == null || imageurl.trim() == "")) {
			alert("Please add an image url for this token.");
			return;
		}
		if (!isValidURL(imageurl)) {
			alert("Please add a valid url for the token image.");
			return;
		}

		const movieMetaData = document.getElementById('movieMetaData').value;
		if (movieMetaData == null || movieMetaData.trim() == "") {
			alert("please enter some movie metadata for this Token");
			return;
		}

		document.getElementById('transactionReceipt').value = 'waiting for MetaMask and block mining...';

		// MovieMetaData will be a string of an object - so convert
		let properties = JSON.parse(movieMetaData);

		// get the current network and write details to screen
		const network = await getNetwork();
		document.getElementById('network').value = JSON.stringify(network, null, 2);

		// issue the token
		const result = await issueTokenToBlockchain(contractAddress, contractABI, name, description, imageurl, properties);

		// Put the results on the screen
		document.getElementById('transactionReceipt').value = JSON.stringify(result.receipt, null, 2);
		document.getElementById('tokenID').value = result.tokenid;
		document.getElementById('tokenURL').value = result.tokenurl;

		// If there is no array of items yet - create and store and empty array (coevers first time)
		if (!window.localStorage.getItem(STORE_NAME)) {
			window.localStorage.setItem(STORE_NAME, []);
		}

		// Add the new data object to the array of stored items in the Browser local storage
		const dataDetailsArray = JSON.parse(window.localStorage.getItem(STORE_NAME));
		let newItem = {};
		newItem.date = new Date().getTime();
		newItem.contractAddress = contractAddress;
		newItem.contractABI = contractABI;
		newItem.transactionReceipt = JSON.stringify(result.receipt);
		newItem.tokenID = result.tokenid;
		newItem.tokenURL = result.tokenurl;
		newItem.network = JSON.stringify(network, null, 2);
		dataDetailsArray.push(newItem);

		window.localStorage.setItem(STORE_NAME, JSON.stringify(dataDetailsArray));

		// reload stored data so new entry appears on screen
		loadStoredData();
	} catch (e) {
		console.log(e);
		document.getElementById('transactionReceipt').value = e;
	}

}

/**
 * Check if a URL is valid
 */
function isValidURL(urlstring) {
	try {
		const URLObj = new URL(urlstring);
		return true;
	} catch(e) {
		return false;
	}
}

// https://www.quicknode.com/guides/web3-sdks/how-to-mint-an-nft-with-ethers-js
// https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-an-nft-with-ethers
/**
 * Issue a Token for the given name, description, imageurl and movie metadata
 * @param name, the name of your TikTok movie
 * @param description, the description of your TikTok movie
 * @param imageurl, the url for the token image for TikTok movie
 * @param properties, the properties/metadata to verify this TikTok movie instance
 */
async function issueTokenToBlockchain(contractAddress, abi, name, description, imageurl, properties) {

	try {
		const tokenurl = await createTokenMetadata(name, description, imageurl, properties);

		const contractInstance = new ethers.Contract(contractAddress, abi, provider);

		let tx = await contractInstance.connect(signer).mintToken(account, tokenurl);

        const transactionReceipt = await tx.wait()
		const event = transactionReceipt.events.find(event => event.event === 'TokenMint');
		const [recipient, url, tokenid] = event.args;
		const convertedtokenid = tokenid.toString();

		const result = {
			receipt: transactionReceipt,
			tokenurl: tokenurl,
			transactionHash: transactionReceipt.transactionHash,
			tokenid: convertedtokenid,
		};

		return result;
	} catch (e) {
		throw(e);
	}
}

/**
 * Create the IPFS file of metadata to associate with your TikTok Token
 * based on the data passed
 * @param name, the name of your TikTok movie
 * @param description, the description of your TikTok movie
 * @param imageurl, the url for the token image for TikTok movie
 * @param properties, a JSON object for the properties/metadata to verify this TikTok movie instance
 * @return string, representing the url of the IPFS metdata file created
 */
async function createTokenMetadata(name, description, imageurl, properties) {

	if (name && description && imageurl && properties) {
		try {
			json = {};
			json.name = name;
			json.description = description;

			if (imageurl && imageurl != "") {
				json.image = imageurl;
			}

			json.properties = {}
			json.properties = properties;

			let content = JSON.stringify(json);

			let result = await storeToIPFS(content);
			result = JSON.parse(result);

			let hash = result.value.cid;
			let metadataurl = NFT_STORAGE_IPFS_URL_STUB + hash;

			return metadataurl;

		} catch (e) {
			console.log(e);
			throw new Error("Failed to write token metadata file to IPFS");
		}

	} else {
		throw new Error("Missing required parameters for creating token metadata");
	}
}

/**
 * This uses the NFT.STORAGE platform to store data on the global IPFS network
 * https://nft.storage/
 * Requires an API token -  total request body size limit of 100MB and no more than 30 requests with the same API token within a ten second window else 429 returned
 */
function storeToIPFS(content) {
    return new Promise(function (resolve, reject) {

		let xhr = new XMLHttpRequest();
		xhr.open("POST", NFT_STORAGE_API_UPLOAD_URL, true);
		xhr.setRequestHeader('Authorization', 'Bearer ' + NFT_STORAGE_API_KEY);
		xhr.onload = function (oEvent) {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
		};
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

		var blob = new Blob([content], {type: 'application/json'});

		xhr.send(blob);
    });
}

/**
 * This uses the NFT.STORAGE platform to store an image file on the global IPFS network
 * https://nft.storage/
 * Requires an API token -  total request body size limit of 100MB and no more than 30 requests with the same API token within a ten second window else 429 returned
 */
function storeFileToIPFS(file) {
    return new Promise(function (resolve, reject) {

		let xhr = new XMLHttpRequest();
		xhr.open("POST", NFT_STORAGE_API_UPLOAD_URL, true);
		xhr.setRequestHeader('Authorization', 'Bearer ' + NFT_STORAGE_API_KEY);
		xhr.onload = function (oEvent) {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
		};
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

		xhr.send(file);
    });
}


/**
 * Given a URL to an IPFS Token metadata file, read in the data.
 */
function readFromIPFS(url) {
    return new Promise(function (resolve, reject) {

		let xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onload = function (oEvent) {
            if (this.status >= 200 && this.status < 300) {
                resolve(this.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
		};
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
		xhr.send();
    });
}

/** NOT USED - if we were not storing token details in the Browser's storage - we would need to read it from the contract / IPFS, something like the below function does **/

/**
 * Given a URL to an IPFS Token metadata file, read in the data.
 */
async function readTokenContractMetadata(contractAddress, abi, tokenid) {

	try {
		const theContract = new ethers.Contract(contractAddress, abi, provider);

		// get the token url
		const tokenURI = await theContract.tokenURI(parseInt(tokenid));

		// read from NFT Storage
		const response = await readFromIPFS(tokenURI);
		const ipfsmetadata = JSON.parse(response);

		return ipfsmetadata;
	} catch (e) {
		console.log(e);
	}
}

/*** LOCAL DATA STORAGE FUNCTIONS ***/

/**
 * Load any previously stored local data
 */
function loadStoredData() {

	var storedDataTable = document.getElementById("storedDataTable");
	// empty any old data on screen
	storedDataTable.innerHTML = "";

	var dataDetailsArray = JSON.parse(window.localStorage.getItem(STORE_NAME));
	if (!dataDetailsArray) {
		dataDetailsArray = [];
	}

	var count = dataDetailsArray.length;
	for (var i=0; i<count; i++) {
		var next = dataDetailsArray[i];

		// Create an empty <tr> element and add it to the the table:
		var row = storedDataTable.insertRow(i);

		// Insert new cells (<td> elements) in the "new" <tr> element:
		var dateColumn = row.insertCell(0);
		var networkColumn = row.insertCell(1);
		var addressColumn = row.insertCell(2);
		var abiColumn = row.insertCell(3);
		var tokenidColumn = row.insertCell(4);
		var tokenURLColumn = row.insertCell(5);
		var receiptColumn = row.insertCell(6);

		// Add some text to the new cells:
		dateColumn.innerHTML = (new Date(next.date)).toLocaleDateString('en-GB')+" - "+(new Date(next.date)).toLocaleTimeString('en-GB');

		if (next.network && next.network != "") {
			const network = JSON.parse(next.network);
			let networkButton = document.createElement("button");
			networkButton.innerHTML = "View "+network.name+" Details";
			networkButton.className = "button";
			networkButton.data = next.network;
			networkButton.onclick = function () {
				var popup = document.getElementById("popupDiv");
				var popupText = document.getElementById("popupText");
				var obj = JSON.parse(this.data);
				popupText.innerHTML = JSON.stringify(obj, null, 2);
				popup.style.visibility = "visible";
			};
			networkColumn.appendChild(networkButton);
		} else {
			networkColumn.innerHTML = "Unknown";
		}

		addressColumn.innerHTML = next.contractAddress;

		let abiButton = document.createElement("button");
		abiButton.innerHTML = "View ABI";
		abiButton.className = "button";
		abiButton.data = next.contractABI;
		abiButton.onclick = function () {
			var popup = document.getElementById("popupDiv");
			var popupText = document.getElementById("popupText");
			var obj = JSON.parse(this.data);
  			popupText.innerHTML = JSON.stringify(obj, null, 2);
  			popup.style.visibility = "visible";
  			//popup.classList.toggle("show");
		};
		abiColumn.appendChild(abiButton);

		tokenidColumn.innerHTML = next.tokenID;
		tokenURLColumn.innerHTML = '<a href="'+next.tokenURL+'" target="_blank">'+next.tokenURL+'</a>';

		let receiptButton = document.createElement("button");
		receiptButton.innerHTML = "View Receipt";
		receiptButton.className = "button";
		receiptButton.data = next.transactionReceipt;
		receiptButton.onclick = function () {
			var popup = document.getElementById("popupDiv");
			var popupText = document.getElementById("popupText");
			var obj = JSON.parse(this.data);
  			popupText.innerHTML = JSON.stringify(obj, null, 2);
  			//popup.classList.toggle("show");
  			popup.style.visibility = "visible";
		};
		receiptColumn.appendChild(receiptButton);
	}
}

/**
 * Close data popup
 */
function closePopup() {
	var popup = document.getElementById("popupDiv");
	//popup.classList.toggle("show");
	popup.style.visibility = "hidden";
}

/**
 * Copy popup contents to system Clipboard
 */
function copyToClipboard() {
	var popupText = document.getElementById("popupText");
	navigator.clipboard.writeText(popupText.innerHTML);
}

/**
 * Clear Store
 */
function clearDataStore() {
	if (window.confirm("Do you really want to delete all your stored data?")) {
	  	window.localStorage.setItem(STORE_NAME, '[]');
	  	loadStoredData();
	}
}
