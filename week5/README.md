# Week 5 Demo - Issue a token for a TikTok video (NFT minting UI)

## Overview
This folder contains the **Week 5: Issue a Token for a TikTok Video** demo from the **KMi Summer Scholarship Blockchain Project (2022)**.

The index page provides a UI for minting a token that represents a TikTok video. You connect MetaMask, provide your **contract address** and **ABI** from Week 4, assemble token metadata, optionally upload an image to IPFS, and submit a transaction using **ethers.js v5**.

## What you can do
- Connect to **MetaMask** on the same network as your deployed contract
- Provide the **Contract Address** and **ABI** for your TikTok Token contract
- Prepare token details:
  - **Token Name**
  - **Token Description**
  - **Token Image URL** or upload an image file to publish to **IPFS**
  - **Token Metadata (JSON)** including anchors to the TikTok content (e.g., file hash, post URL)
- Click **Create a Tik Tok Token** to mint
- View the blockchain **Transaction Details**, **Network**, and the resulting **Token ID** and **Token Metadata URL**
- **Store Data** entries and review them in the **Stored Data** table, with the option to **Clear Stored Data**

## Prerequisites
- A browser with **MetaMask** and the correct network selected
- A deployed token contract from Week 4 and its **ABI**
- Test ETH for minting fees

## Usage
1. Open `index.html` in a modern browser.
2. Click **Connect to MetaMask** and select the network where your contract is deployed.
3. Enter the **Contract Address** and **Contract ABI**.
4. Provide token details and either paste an image URL or use **Load Image Up To IPFS** to obtain one.
5. Optionally build your **Token Metadata (JSON)**, including references such as the video file hash and TikTok post URL.
6. Click **Create a Tik Tok Token** and confirm the transaction in MetaMask.
7. After mining, review **Transaction Details**, **Token ID**, and **Token Metadata URL**. Save the details as needed.

## Technology
- HTML, CSS, JavaScript
- **ethers.js 5.2.0** for blockchain interaction
- **MetaMask** for transaction signing
- Optional image hosting via **IPFS**
- `w3.includeHTML()` for header and footer includes

## Notes
- This demo is **client-side only** and intended for educational purposes.
- Ensure you have the correct network selected before minting.
- Respect copyright for any images you upload to IPFS.

## Related resources
For full context and additional demos, see the [main repository README](../README.md).
