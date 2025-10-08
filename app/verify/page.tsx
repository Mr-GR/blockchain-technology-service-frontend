'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import Link from 'next/link';
import { isAddress } from 'viem';

interface CertificationDetails {
  courseName: string;
  recipientName: string;
  achievementLevel: string;
  issueDate: bigint;
  tokenURI: string;
}

// Component to display individual certificate details
function CertificateCard({ tokenId }: { tokenId: bigint }) {
  const { data: details, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertificationDetails',
    args: [tokenId],
  });

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

  return (
    <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
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
              <span className="text-sm text-gray-600">Achievement Level:</span>
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
            {tokenURI && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  // Get all certification token IDs for the wallet
  const { data: tokenIds, isLoading: isLoadingIds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertifications',
    args: [walletAddress as `0x${string}`],
    query: {
      enabled: shouldFetch && isAddress(walletAddress),
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(walletAddress)) {
      alert('Please enter a valid wallet address');
      return;
    }

    setShouldFetch(true);
  };

  const handleReset = () => {
    setShouldFetch(false);
    setWalletAddress('');
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
                  Certification NFT
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
            {/* Wallet Address */}
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

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoadingIds}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoadingIds ? 'Loading Certificates...' : 'Get All Certificates'}
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
          {shouldFetch && !isLoadingIds && (
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
