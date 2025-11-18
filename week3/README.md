# Week 3 Demo - Use the ethers API to query an Ethereum testnet

## Overview
This folder contains the **Week 3: Use the ethers blockchain API to talk to an Ethereum testnet** demo from the **KMi Summer Scholarship Blockchain Project (2022)**.

The index page demonstrates how to connect a browser dapp to **MetaMask** and then retrieve core blockchain information from a connected **test network** using **ethers.js v5**.

## What you can do
- Connect to **MetaMask** and select a test network (e.g., Sepolia, Goerli, Rinkeby as it existed at the time)
- Request the **network name** from the provider
- Request the **current account balance** in ETH
- Request the **current block number**

## Prerequisites
- A browser with **MetaMask** installed and at least one test network configured
- Some test ETH on the selected network for balance checks (no spend is required)

## Usage
1. Open `index.html` in a modern browser.
2. Click **Connect to MetaMask** and approve the connection.
3. Use the provided buttons to:
   - **Request Blockchain Name** to populate the Network Name field
   - **Request Balance** to populate the Eth Balance field for the active account
   - **Current Block** to populate the Current Block field

## Technology
- HTML, CSS, JavaScript
- **ethers.js 5.2.0** for blockchain calls
- **MetaMask** as the injected provider
- `w3.includeHTML()` for header and footer includes

## Notes
- This is a **client-side only** demo. No backend services are used.
- Button states are enabled after connecting to MetaMask via `loginToMetaMask()`.
- Network names and availability reflect the 2022 scholarship period.

## Related resources
For full context and additional demos, see the [main repository README](../README.md).
