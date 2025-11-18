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

let ethereum = {}
let account = "";

let provider = {};
let signer = {}


/**
 * Initialise page - load ethereum object.
 */
function initApp() {

	// connect this webpage to ethereum through metamask
	setUpEthereumAndMetamask()
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
		console.log('MetaMask needs to be installed');
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
		alert("Please select a MetaMask account to use with this page");
	}
}

/**
 * Enable metamask dependent buttons after connected to Metamask
 */
function enableMetaMaskButtons() {

	const accountBalanceButton = document.getElementById('accountBalanceButton');
	accountBalanceButton.disabled = false;

	const networkNameButton = document.getElementById('networkNameButton');
	networkNameButton.disabled = false;

	const currentBlockButton = document.getElementById('currentBlockButton');
	currentBlockButton.disabled = false;
}

/**
 * Get the name for the blockchain network MetaMask is currently pointing at.
 */
async function getNetworkName() {

	// get the chain id of the current blockchain your wallet is pointing at.
	const chainId = await signer.getChainId();
	//console.log(chainId);

	// get the network details for the given chain id.
	const network = await provider.getNetwork(chainId);

	// put the netowrk name on the screen
	document.getElementById('networkName').value = network.name;
}

/**
 * Get the account balance for the blockchain account MetaMask is currently pointing at.
 */
async function getAccountBalance() {

	// Get the balance of an account by it's account address (can also take an ENS name, if supported by network)
	const balance = await provider.getBalance(account);

	// the balance returned will be a BigNumber object - so needs converting to eth
	const ethBlanace = ethers.utils.formatEther(balance);

	// put the results on the screen
	document.getElementById('accountBalance').value = ethBlanace;
}

/**
 * Get the current block number for the blockchain MetaMask is currently pointing at.
 */
async function getCurrentBlock() {

	// Look up the current block number
	const block = await provider.getBlockNumber()

	// put the results on the screen
	document.getElementById('currentBlock').value = block;
}
