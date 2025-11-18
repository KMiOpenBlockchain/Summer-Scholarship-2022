# Week 4 Demo - Publish a contract to the Ethereum blockchain

## Overview
This folder contains the **Week 4: Publish a Contract on the Ethereum blockchain** demo from the **KMi Summer Scholarship Blockchain Project (2022)**.

The index page walks through deploying a smart contract using **MetaMask** and **ethers.js v5**, then capturing the deployment details for later use in Week 5.

## What you can do
- Connect to **MetaMask** on a test network
- Paste **Contract Bytecode** and **Contract ABI**
- Click **Publish Contract** to deploy
- View and copy deployment outputs:
  - **Transaction Number**
  - **Contract Address**
  - Full transaction details
  - Network information
- **Store Data** to browser storage for reuse in Week 5
- View previously stored deployments and **Clear Stored Data** if needed

## Prerequisites
- A browser with **MetaMask** and a configured test network
- Sufficient test ETH for a contract deployment
- Compiled contract **bytecode** and **ABI** from your Solidity build toolchain

## Usage
1. Open `index.html` in a modern browser.
2. Click **Connect to MetaMask** and ensure the correct test network is selected.
3. Paste your compiled **Contract Bytecode** and **Contract ABI**.
4. Click **Publish Contract** and confirm the transaction in MetaMask.
5. After mining, copy the **Contract Address** and other outputs.
6. Click **Store Data** to save details in local storage. These values are needed in Week 5.
7. Use the **Stored Data** table to review or clear previous entries.

## Technology
- HTML, CSS, JavaScript
- **ethers.js 5.2.0** for deployment
- **MetaMask** for transaction signing
- `w3.includeHTML()` for header and footer includes

## Notes
- This demo is **client-side only** and intended for educational purposes.
- Storing deployment details in the browser is for convenience only. Consider copying them somewhere safe.

## Related Resources
For full context and additional demos, see the [main repository README](../README.md).
