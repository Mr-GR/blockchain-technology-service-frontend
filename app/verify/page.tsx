'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, BLOCK_EXPLORER } from '@/lib/contract';
import Link from 'next/link';
import { isAddress } from 'viem';

interface CertificationDetails {
  courseName: string;
  recipientName: string;
  achievementLevel: string;
  issueDate: bigint;
  tokenURI: string;
}

// Component to display certificate with owner (for course search)
function CertificateCardWithOwner({ tokenId }: { tokenId: bigint }) {
  const { address: connectedAddress } = useAccount();

  const { data: details, isLoading } = useReadContract({
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
  }) as { data: `0x${string}` | undefined };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!details) return null;

  const [courseName, recipientName, achievementLevel, issueDate] = details as [string, string, string, bigint, string];
  const date = new Date(Number(issueDate) * 1000);

  // Check if the connected wallet is the owner of this certificate
  const isOwner = connectedAddress && tokenOwner &&
    connectedAddress.toLowerCase() === tokenOwner.toLowerCase();

  const handleLinkedInShare = () => {
    const nftUrl = `${BLOCK_EXPLORER}/token/${CONTRACT_ADDRESS}?a=${tokenId}`;
    const shareText = `I'm excited to share that I've earned a blockchain-verified certificate for "${courseName}"!\n\nAchievement Level: ${achievementLevel}\nIssued: ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n\nThis soulbound NFT is permanently recorded on the Polygon blockchain and can be verified at: ${nftUrl}\n\n#BlockchainCertification #Web3 #NFT #Achievement`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(nftUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(err => console.error('Failed to copy:', err));
    }
  };

  return (
    <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl">🎓</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">{courseName}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Recipient:</span>
                <span className="text-sm font-semibold text-gray-900">{recipientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Owner:</span>
                <a
                  href={`${BLOCK_EXPLORER}/address/${tokenOwner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-purple-600 hover:underline"
                >
                  {tokenOwner ? `${tokenOwner.slice(0, 6)}...${tokenOwner.slice(-4)}` : 'Unknown'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Achievement:</span>
                <span className="text-sm font-semibold text-purple-600">{achievementLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Issued:</span>
                <span className="text-sm font-semibold text-gray-900">{date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Token ID:</span>
                <span className="text-sm font-mono text-gray-900">#{tokenId.toString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Share Button - Only visible to owner */}
        {isOwner && (
          <button
            onClick={handleLinkedInShare}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
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

// Component to display individual certificate details
function CertificateCard({ tokenId }: { tokenId: bigint }) {
  const { address: connectedAddress } = useAccount();

  const { data: details, isLoading } = useReadContract({
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
  }) as { data: `0x${string}` | undefined };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!details) return null;

  const [courseName, recipientName, achievementLevel, issueDate, tokenURI] = details as [string, string, string, bigint, string];
  const date = new Date(Number(issueDate) * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
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
    <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl">🎓</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">{courseName}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Recipient:</span>
                <span className="text-sm font-semibold text-gray-900">{recipientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Achievement:</span>
                <span className="text-sm font-semibold text-purple-600">{achievementLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Issued:</span>
                <span className="text-sm font-semibold text-gray-900">{date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Token ID:</span>
                <span className="text-sm font-mono text-gray-900">#{tokenId.toString()}</span>
              </div>
              {/* {tokenURI && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Metadata:</span>
                  <a
                    href={tokenURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {tokenURI.slice(0, 40)}...
                  </a>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* LinkedIn Share Button - Only visible to owner */}
        {isOwner && (
          <button
            onClick={handleLinkedInShare}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
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

// Component to search certificates by course name
function CourseSearchResults({ courseName }: { courseName: string }) {
  const [matchingTokenIds, setMatchingTokenIds] = useState<bigint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: totalCerts } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalCertifications',
  });

  // Fetch all certificate details and filter by course name
  useEffect(() => {
    async function fetchAndFilter() {
      if (!totalCerts) return;

      setIsLoading(true);
      const matching: bigint[] = [];
      const total = Number(totalCerts);

      // Loop through all token IDs (starting from 1)
      for (let i = 1; i <= total; i++) {
        try {
          // We'll use the component to fetch each one
          matching.push(BigInt(i));
        } catch (error) {
          console.error(`Error fetching token ${i}:`, error);
        }
      }

      setMatchingTokenIds(matching);
      setIsLoading(false);
    }

    fetchAndFilter();
  }, [totalCerts]);

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">⏳</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800">Searching...</h3>
              <p className="text-blue-700">Scanning {totalCerts?.toString() || '0'} certificates for &quot;{courseName}&quot;</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Now render all tokens and let each component filter itself
  return (
    <div className="mt-8">
      <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🔍</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-800">Search Results</h3>
            <p className="text-blue-700">
              Showing certificates matching &quot;{courseName}&quot;
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {matchingTokenIds.map((tokenId) => (
          <CourseFilteredCard key={tokenId.toString()} tokenId={tokenId} targetCourseName={courseName} />
        ))}
      </div>
    </div>
  );
}

// Component to display a certificate if it matches the course name
function CourseFilteredCard({ tokenId, targetCourseName }: { tokenId: bigint; targetCourseName: string }) {
  const { data: details, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertificationDetails',
    args: [tokenId],
  });

  // Show loading state while fetching
  if (isLoading) return null;

  if (!details) return null;

  const [courseName] = details as [string, string, string, bigint, string];

  // Case-insensitive partial match - check if the course name contains the search term
  const courseNameLower = courseName.toLowerCase();
  const targetLower = targetCourseName.toLowerCase();

  if (!courseNameLower.includes(targetLower)) {
    return null;
  }

  return <CertificateCardWithOwner tokenId={tokenId} />;
}

export default function VerifyPage() {
  const [searchType, setSearchType] = useState<'wallet' | 'course'>('wallet');
  const [walletAddress, setWalletAddress] = useState('');
  const [courseName, setCourseName] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  // Get all certification token IDs for the wallet
  const { data: tokenIds, isLoading: isLoadingIds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertifications',
    args: [walletAddress as `0x${string}`],
    query: {
      enabled: shouldFetch && searchType === 'wallet' && isAddress(walletAddress),
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchType === 'wallet') {
      if (!isAddress(walletAddress)) {
        alert('Please enter a valid wallet address');
        return;
      }
    } else {
      if (!courseName.trim()) {
        alert('Please enter a course name');
        return;
      }
    }

    setShouldFetch(true);
  };

  const handleReset = () => {
    setShouldFetch(false);
    setWalletAddress('');
    setCourseName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Block Certify
                </h1>
                <p className="text-xs text-gray-500">Verification Tool</p>
              </div>
            </div>
          </Link>
          <ConnectButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Verify Certificate</h2>
              <p className="text-gray-600">Check if an address holds a specific certification</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* Search Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search By
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="wallet"
                    checked={searchType === 'wallet'}
                    onChange={(e) => {
                      setSearchType(e.target.value as 'wallet' | 'course');
                      setShouldFetch(false);
                    }}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Wallet Address</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="course"
                    checked={searchType === 'course'}
                    onChange={(e) => {
                      setSearchType(e.target.value as 'wallet' | 'course');
                      setShouldFetch(false);
                    }}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Course Name</span>
                </label>
              </div>
            </div>

            {/* Wallet Address Input */}
            {searchType === 'wallet' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address *
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                    setShouldFetch(false);
                  }}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The wallet address to verify</p>
              </div>
            )}

            {/* Course Name Input */}
            {searchType === 'course' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                    setShouldFetch(false);
                  }}
                  placeholder="e.g., Introduction to Web3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Find all certificates for this course</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoadingIds}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoadingIds ? 'Loading...' : searchType === 'wallet' ? 'Get Certificates' : 'Search Course'}
              </button>

              {shouldFetch && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Certification Results */}
          {shouldFetch && searchType === 'wallet' && !isLoadingIds && (
            <div className="mt-8">
              {tokenIds && Array.isArray(tokenIds) && tokenIds.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">✓</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800">Certificates Found!</h3>
                        <p className="text-green-700">
                          This wallet holds {tokenIds.length} certificate{tokenIds.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Display each certificate */}
                  {tokenIds.map((tokenId) => (
                    <CertificateCard key={tokenId.toString()} tokenId={tokenId} />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-3xl">ℹ</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-800 mb-2">No Certificates Found</h3>
                      <p className="text-yellow-700 mb-4">
                        This wallet address does not hold any certificates yet.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                        <p className="font-mono text-xs text-gray-900 break-all">{walletAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Course Search Results */}
          {shouldFetch && searchType === 'course' && (
            <CourseSearchResults courseName={courseName} />
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">💡 How Verification Works</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Enter the wallet address you want to verify</li>
            <li>• The system retrieves all certificates for that wallet from the blockchain</li>
            <li>• Each certificate shows course name, recipient, achievement level, and issue date</li>
            <li>• Results are instant and verifiable on-chain</li>
            <li>• Connected to Polygon Mainnet (chainId 137)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
