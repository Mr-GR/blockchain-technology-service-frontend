# Certification NFT - Soulbound Digital Credentials

A blockchain-based certification system using non-transferable (soulbound) NFTs for issuing verifiable credentials on Polygon Amoy testnet.

## Overview

Certification NFT is a decentralized application that enables institutions, bootcamps, and organizations to issue tamper-proof, verifiable digital certificates as NFTs. These certificates are **soulbound** (non-transferable), ensuring they permanently represent the recipient's achievement.

### Key Features

- **Soulbound NFTs** - Certificates cannot be transferred or sold
-  **Verifiable Credentials** - On-chain proof of achievement
-  **Admin Panel** - Easy certificate issuance interface
-  **Certificate Gallery** - Beautiful display of earned certificates
-  **Verification Tool** - Anyone can verify certificate ownership
-  **Blockchain Transparency** - All data publicly verifiable on Polygonscan

## Tech Stack

### Smart Contract
- **Solidity** - Smart contract development
- **OpenZeppelin** - Secure ERC-721 implementation
- **Hardhat** - Ethereum development environment
- **Polygon Amoy** - Testnet deployment

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **wagmi** - React hooks for Ethereum
- **viem** - Ethereum library
- **RainbowKit** - Wallet connection UI

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MetaMask or compatible Web3 wallet
- Polygon Amoy testnet configured in wallet

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hackathon-token-app
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## Usage

### For Certificate Issuers (Admins)

1. Connect your wallet (must be contract owner)
2. Navigate to **Admin Panel**
3. Fill in certificate details:
   - Recipient wallet address
   - Course/achievement name
   - Recipient name
   - Achievement level
4. Click "Issue Certificate"
5. Approve the transaction in MetaMask

### For Certificate Recipients

1. Connect your wallet to the app
2. Switch to **Polygon Amoy** network
3. View your certificates on the home page
4. Certificates appear automatically once issued

### For Verifiers

1. Navigate to **Verify Certificate**
2. Enter the wallet address to verify
3. Enter the course/achievement name
4. Click "Verify Certificate"
5. See instant verification results

## Smart Contract

**Contract Address:** `0xbc9bb1E472c072B085415481D83f11BBcC629915`

**Network:** Polygon Amoy Testnet (Chain ID: 80002)

**Explorer:** [View on Polygonscan](https://amoy.polygonscan.com/address/0xbc9bb1E472c072B085415481D83f11BBcC629915)

### Contract Features

- **ERC-721 Standard** - NFT compatibility
- **Soulbound Mechanism** - Prevents transfers
- **Batch Issuance** - Issue multiple certificates at once
- **On-chain Metadata** - Store certificate details permanently
- **Verification Functions** - Public verification methods

## Screenshots

_Screenshots will be added here_

### Home Page
<!-- Add screenshot -->

### Certificate Gallery
<!-- Add screenshot -->

### Admin Panel
<!-- Add screenshot -->

### Verification Tool
<!-- Add screenshot -->

### Mobile View
<!-- Add screenshot -->

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy with default settings
4. (Optional) Add custom domain in Vercel settings

### Environment Variables (Optional)

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

Get a free WalletConnect Project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com)

## Security

-  Soulbound tokens prevent unauthorized transfers
-  Only contract owner can issue certificates
-  Private keys never exposed (stored in `.env`)
-  All certificate data verifiable on blockchain
-  Immutable certificate records

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💼 Author

Built for hackathon demonstration

---

**Smart Contract:** [View on Polygonscan](https://amoy.polygonscan.com/address/0xbc9bb1E472c072B085415481D83f11BBcC629915)
