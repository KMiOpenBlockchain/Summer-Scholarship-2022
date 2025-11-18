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
const STORE_NAME = 'TikTokContractInstances';
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
	/** load any stored hashes onto the screen **/
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

	const addMinterButton = document.getElementById('addMinterButton'); // write to blockchain
	addMinterButton.disabled = false;
	const removeMinterButton = document.getElementById('removeMinterButton'); // write to blockchain
	removeMinterButton.disabled = false;
	const isMinterButton = document.getElementById('isMinterButton'); // write to blockchain
	isMinterButton.disabled = false;
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
 * Load all the required data from the page and if all there
 * Create a Token and issue it to the blockchain.
 * Store the details into browser local storage.
 */
async function addMinter() {

	try {
		// fetch the data from the html page
		const contractABI = document.getElementById('contractABI').value;
		if (contractABI.trim() == "" || contractABI == null) {
			alert("Please enter the contract abi for the contract addess given.");
			return;
		}
		const contractAddress = document.getElementById('contractAddress').value;
		if (contractAddress.trim() == "" || contractAddress == null) {
			alert("Please enter token contract address.");
			return;
		}

		const minterAddress = document.getElementById('minterAddress').value;
		if (minterAddress.trim() == "" || minterAddress == null) {
			alert("Please enter a minter address.");
			return;
		}
		
		document.getElementById('transactionReceipt').value = 'waiting for MetaMask and block mining...';

		// get the current network and write details to screen
		const network = await getNetwork();
		document.getElementById('network').value = JSON.stringify(network, null, 2);

		
		const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

		let tx = await contractInstance.connect(signer).addMinter(minterAddress);

        const transactionReceipt = await tx.wait()

		// Put the results on the screen
		document.getElementById('transactionReceipt').value = JSON.stringify(transactionReceipt, null, 2);
		
	} catch (e) {
		console.log(e);
		document.getElementById('transactionReceipt').value = e;
	}

}

async function removeMinter() {

	try {
		// fetch the data from the html page
		const contractABI = document.getElementById('contractABI').value;
		if (contractABI.trim() == "" || contractABI == null) {
			alert("Please enter the contract abi for the contract addess given.");
			return;
		}
		const contractAddress = document.getElementById('contractAddress').value;
		if (contractAddress.trim() == "" || contractAddress == null) {
			alert("Please enter token contract address.");
			return;
		}

		const minterAddress = document.getElementById('minterAddress').value;
		if (minterAddress.trim() == "" || minterAddress == null) {
			alert("Please enter a minter address.");
			return;
		}
		
		document.getElementById('transactionReceipt').value = 'waiting for MetaMask and block mining...';

		// get the current network and write details to screen
		const network = await getNetwork();
		document.getElementById('network').value = JSON.stringify(network, null, 2);

		
		const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

		let tx = await contractInstance.connect(signer).removeMinter(minterAddress);

        const transactionReceipt = await tx.wait()

		// Put the results on the screen
		document.getElementById('transactionReceipt').value = JSON.stringify(transactionReceipt, null, 2);
		
	} catch (e) {
		console.log(e);
		document.getElementById('transactionReceipt').value = e;
	}

}

async function isMinter() {

	try {
		// fetch the data from the html page
		const contractABI = document.getElementById('contractABI').value;
		if (contractABI.trim() == "" || contractABI == null) {
			alert("Please enter the contract abi for the contract addess given.");
			return;
		}
		const contractAddress = document.getElementById('contractAddress').value;
		if (contractAddress.trim() == "" || contractAddress == null) {
			alert("Please enter token contract address.");
			return;
		}

		const minterAddress = document.getElementById('minterAddress').value;
		if (minterAddress.trim() == "" || minterAddress == null) {
			alert("Please enter a minter address.");
			return;
		}
		
		document.getElementById('transactionReceipt').value = 'waiting for MetaMask and block mining...';

		// get the current network and write details to screen
		const network = await getNetwork();
		document.getElementById('network').value = JSON.stringify(network, null, 2);

		
		const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

		let isminter = await contractInstance.connect(signer).isMinter(minterAddress);

		// Put the results on the screen
		document.getElementById('transactionReceipt').value = isminter;
		
	} catch (e) {
		console.log(e);
		document.getElementById('transactionReceipt').value = e;
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

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = storedDataTable.insertRow(i);

		// Insert new cells (<td> elements) in the "new" <tr> element:
		var dateColumn = row.insertCell(0);
		var networkColumn = row.insertCell(1);
		var addressColumn = row.insertCell(2);
		var transColumn = row.insertCell(3);
		var bytecodeColumn = row.insertCell(4);
		var abiColumn = row.insertCell(5);

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
		transColumn.innerHTML = next.contractTransactionNumber;

		let bytecodeButton = document.createElement("button");
		bytecodeButton.innerHTML = "View Bytecode";
		bytecodeButton.className = "button";
		bytecodeButton.data = next.contractBytecode;
		bytecodeButton.onclick = function () {
			var popup = document.getElementById("popupDiv");
			var popupText = document.getElementById("popupText");
			var obj = JSON.parse(this.data);
  			popupText.innerHTML = JSON.stringify(obj, null, 2);
  			popup.style.visibility = "visible";
		};
		bytecodeColumn.appendChild(bytecodeButton);

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
		};
		abiColumn.appendChild(abiButton);
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
