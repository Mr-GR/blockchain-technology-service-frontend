# Block Certify - Soulbound Digital Credentials

**Live Site:** [https://www.blockcertify.io](https://www.blockcertify.io)
**Network:** Polygon Mainnet

A blockchain-based certification system using non-transferable (soulbound) NFTs for issuing verifiable credentials on Polygon blockchain.

## Overview

Block Certify is a decentralized application that enables institutions, bootcamps, and organizations to issue tamper-proof, verifiable digital certificates as NFTs. These certificates are **soulbound** (non-transferable), ensuring they permanently represent the recipient's achievement.

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
- **Polygon Mainnet** - Production deployment

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
- Polygon Mainnet configured in wallet

## 🔍 Test It Yourself

To see a verified blockchain certificate in action, use the following **test wallet address**:

```
0x742393C6DE984A492C807c48EbDf201E33179388
```

You can paste this address in the verification field at [BlockCertify.io](https://www.blockcertify.io) to fetch and verify an existing NFT certificate on Polygon Mainnet.

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
2. Switch to **Polygon Mainnet** network
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

**Network:** Polygon Mainnet (Chain ID: 137)

**Explorer:** [View on Polygonscan](https://polygonscan.com/address/0xbc9bb1E472c072B085415481D83f11BBcC629915)

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

MIT License - see the [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💼 Author

Built for hackathon demonstration

---

**Smart Contract:** [View on Polygonscan](https://polygonscan.com/address/0xbc9bb1E472c072B085415481D83f11BBcC629915)
