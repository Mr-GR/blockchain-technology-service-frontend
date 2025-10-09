'use client';

import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, BLOCK_EXPLORER } from '@/lib/contract';

interface CertificateCardProps {
  tokenId: bigint;
}

export function CertificateCard({ tokenId }: CertificateCardProps) {
  const { address: connectedAddress } = useAccount();

  const { data: certDetails } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertificationDetails',
    args: [tokenId],
  });

  // Get the owner of this token
  const { data: tokenOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'ownerOf',
    args: [tokenId],
  });

  if (!certDetails) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
        <div className="h-32 sm:h-48 bg-gray-200 rounded-lg mb-4 loading-skeleton"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 loading-skeleton"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 loading-skeleton"></div>
      </div>
    );
  }

  const [courseName, recipientName, achievementLevel, issueDate, issuer] = certDetails as [
    string,
    string,
    string,
    bigint,
    string
  ];

  const formattedDate = new Date(Number(issueDate) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Check if the connected wallet is the owner of this certificate
  const isOwner = connectedAddress && tokenOwner &&
    connectedAddress.toLowerCase() === tokenOwner.toLowerCase();

  const handleLinkedInShare = () => {
    // Construct the NFT verification URL on Polygonscan
    const nftUrl = `${BLOCK_EXPLORER}/token/${CONTRACT_ADDRESS}?a=${tokenId}`;

    // Create the LinkedIn share message
    const shareText = `I'm excited to share that I've earned a blockchain-verified certificate for "${courseName}"!\n\nAchievement Level: ${achievementLevel}\nIssued: ${formattedDate}\n\nThis soulbound NFT is permanently recorded on the Polygon blockchain and can be verified at: ${nftUrl}\n\n#BlockchainCertification #Web3 #NFT #Achievement`;

    // LinkedIn share URL format
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(nftUrl)}`;

    // Open in new window
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');

    // Copy the text to clipboard for easy pasting
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(err => console.error('Failed to copy:', err));
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 overflow-hidden hover:scale-105 group">
      {/* Certificate Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-4 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 transform -skew-y-6 origin-top-left"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform">
              <span className="text-2xl sm:text-3xl">🎓</span>
            </div>
            <span className="text-xs bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
              #{tokenId.toString()}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">{courseName}</h3>
          <p className="text-purple-100 text-xs sm:text-sm">Soulbound Certificate</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Awarded to</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">{recipientName}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Achievement Level</p>
            <span className="inline-block px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              {achievementLevel}
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Issue Date</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900">{formattedDate}</p>
          </div>
        </div>

        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Issued by</p>
          <a
            href={`${BLOCK_EXPLORER}/address/${issuer}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-purple-600 hover:text-purple-800 hover:underline break-all block"
          >
            {issuer.slice(0, 6)}...{issuer.slice(-4)}
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="truncate">Non-transferable • Verified on-chain</span>
        </div>

        {/* LinkedIn Share Button - Only visible to owner */}
        {isOwner && (
          <button
            onClick={handleLinkedInShare}
            className="w-full mt-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            aria-label="Share certificate on LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            <span>Share on LinkedIn</span>
          </button>
        )}
      </div>
    </div>
  );
}
