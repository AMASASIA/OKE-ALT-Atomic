# OKE-ALT-ATOMIC

## アプリケーション概要
このアプリケーションは、NFTと譲渡不可能なソウルバウンドトークン（SBT）の両方を単一のトランザクションでミントできる、柔軟なミントシステムを実装しています。

## 環境セットアップ

### 1. 依存関係のインストール
プロジェクトのすべての依存関係をインストールします。
`npm install`

### 2. スマートコントラクトのコンパイル
スマートコントラクトをコンパイルして、デプロイの準備をします。
`npx hardhat compile`

### 3. テストネットへのデプロイ
スマートコントラクトをMumbaiテストネットにデプロイします。
`npx hardhat run scripts/deploy.ts --network mumbai`

デプロイ後、表示されるコントラクトアドレスを `src/utils/constants.ts` ファイルの `MINTING_CONTRACT_ADDRESS` にコピー＆ペーストしてください。

### 4. アプリケーションの起動
ローカルでアプリケーションを起動します。
`npm start`

これで、アプリケーションは完全に動作し、テストネット上でNFTとSBTのミントを実行できるようになります。
これらのステップを完了することで、アプリケーションは完全に機能し、エンドツーエンドのワークフローをテストできるようになります。

# OKE: AI-Enhanced Digital Asset Creation Platform

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

This application provides a seamless and intelligent experience for creating unique digital assets on the blockchain. It leverages AI to generate rich metadata and provides a flexible minting flow for NFTs and Soul-Bound Tokens (SBTs), all powered by a robust, consolidated application architecture designed for a resilient user experience.

## Key Features

-   **Consolidated Minting Workflow:** Clicking "Mint" launches a single "AI Minting Preparation Modal" that handles the entire process, from a one-time API key setup to wallet connection and the final transaction.
-   **One-Time In-Browser API Key Setup:** Users are prompted to enter their Gemini and NFT.Storage keys once. These are then stored securely in the browser's local storage for all future use.
-   **AI-Powered Metadata:** Uses the Gemini API to automatically generate creative names and descriptions for assets based on the file type and an optional voice input.
-   **Flexible NFT + SBT Minting:** Mints a standard ERC-721 NFT, a non-transferable "Proof of Creation" SBT, or both in a single, gas-efficient transaction based on user selection from a decoupled UI.
-   **Simulated Cross-Chain Transfers:** Each NFT card features a "Wave 🌊" button, initiating a simulated cross-chain transfer to various testnets.
-   **ERC-6551 Token Bound Accounts (TBA):** Automatically computes the ERC-6551 Token Bound Account address for each minted NFT.
-   **Resilient User Experience:** Built with a centralized state management system that persists user progress through page reloads, ensuring a smooth, uninterrupted workflow.
-   **Featured NFT Showcase:** Includes a dedicated page to showcase a featured NFT, "Vert: MIDORI NFT / SBT", with options for sharing and downloading.

## Technology Stack

-   **Frontend:** React, TypeScript, TailwindCSS, Vite
-   **State Management:** React Context API with a `useReducer` pattern
-   **Blockchain Interaction:** `ethers.js`
-   **Smart Contracts:** Solidity, Hardhat, OpenZeppelin (`OkeMinter.sol`)
-   **AI Services:** Google Gemini API (`@google/genai`)
-   **Decentralized Storage:** NFT.Storage (IPFS)
-   **Browser Persistence:** IndexedDB for files, Local Storage for API keys.

---

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── context/     # Global state management
│   ├── services/    # External API services (Gemini)
│   └── utils/       # Helper functions (web3, IPFS, API Keys)
├── contracts/       # Solidity smart contracts (OkeMinter.sol)
├── scripts/         # Deployment scripts
├── index.html       # Main HTML entry point
├── vite.config.ts   # Vite configuration
└── ...
```

---

## Getting Started

### Prerequisites

-   Node.js and npm (or a compatible package manager).
-   A browser wallet that supports the Mumbai testnet (e.g., MetaMask).
-   Test MATIC on the Mumbai network for gas fees.
-   API Keys for **Google Gemini** and **NFT.Storage**.

### 1. Backend: Smart Contract Deployment

The `OkeMinter.sol` smart contract needs to be deployed to the Mumbai testnet.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Contract Environment Variables:**
    Create a `.env` file in the root directory and add the following, replacing the placeholder values:
    ```
    # .env

    # Your Mumbai RPC endpoint URL
    MUMBAI_RPC_URL="https://rpc-mumbai.maticvigil.com"

    # Your private key for the deployment wallet
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"

    # Optional: Polygonscan API key for verification
    POLYGONSCAN_API_KEY="YOUR_POLYGONSCAN_API_KEY"
    ```

3.  **Compile & Deploy:**
    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.ts --network mumbai
    ```

4.  **Update Contract Address:**
    After deployment, the console will output the new contract address. Copy this and paste it into `src/utils/constants.ts`:

    ```typescript
    // src/utils/constants.ts
    export const OKE_MINTER_ADDRESS = "YOUR_NEWLY_DEPLOYED_CONTRACT_ADDRESS";
    ```

### 2. Frontend: Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  Open your browser to the local address provided by Vite.

3.  **First-Time API Key Setup:**
    -   The first time you attempt to mint an asset, the "AI Minting Preparation Modal" will appear.
    -   You will be prompted to enter your **Gemini API Key** and your **NFT.Storage API Key**.
    -   These keys are stored securely in your browser's local storage and will be used for all subsequent minting operations. You will not need to enter them again unless you clear your browser's data.
