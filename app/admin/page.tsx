'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import Link from 'next/link';

export default function AdminPage() {
  const { isConnected } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [courseName, setCourseName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [achievementLevel, setAchievementLevel] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const { data: hash, writeContract, isPending, error, reset: resetWrite } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Reset form when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        setRecipientAddress('');
        setCourseName('');
        setRecipientName('');
        setAchievementLevel('');
        setTokenURI('');
        resetWrite();
      }, 3000); // Reset after 3 seconds to let user see success message

      return () => clearTimeout(timer);
    }
  }, [isConfirmed, resetWrite]);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientAddress || !courseName || !recipientName || !achievementLevel) {
      alert('Please fill in all fields');
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'issueCertification',
      args: [recipientAddress, courseName, recipientName, achievementLevel, tokenURI],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🎓</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Certification NFT
                  </h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
            </Link>
          </div>
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
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">👨‍💼</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Issue Certificate</h2>
              <p className="text-gray-600">Create a soulbound NFT certificate</p>
            </div>
          </div>

          {!isConnected ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-4">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">You need to connect as the contract owner to issue certificates</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <form onSubmit={handleIssueCertificate} className="space-y-6">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Wallet Address *
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The wallet address that will receive the certificate</p>
              </div>

              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course/Achievement Name *
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g., Blockchain Development Bootcamp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Achievement Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Level *
                </label>
                <select
                  value={achievementLevel}
                  onChange={(e) => setAchievementLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select level...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                  <option value="Participation">Participation</option>
                  <option value="Completion">Completion</option>
                  <option value="Excellence">Excellence</option>
                </select>
              </div>

              {/* Token URI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token URI (Metadata)
                </label>
                <input
                  type="text"
                  value={tokenURI}
                  onChange={(e) => setTokenURI(e.target.value)}
                  placeholder="ipfs://... or https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">IPFS or HTTP URL for certificate metadata (optional for now)</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? 'Waiting for approval...' : isConfirming ? 'Issuing certificate...' : 'Issue Certificate'}
              </button>

              {/* Status Messages */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Error:</strong> {error.message}
                  </p>
                </div>
              )}

              {hash && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Transaction Hash:</strong>{' '}
                    <a
                      href={`https://polygonscan.com/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {hash.slice(0, 10)}...{hash.slice(-8)}
                    </a>
                  </p>
                </div>
              )}

              {isConfirmed && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <strong>Certificate issued successfully!</strong>
                  </p>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Only the contract owner can issue certificates</li>
            <li>• Certificates are soulbound (non-transferable)</li>
            <li>• Each certificate is unique and permanently on-chain</li>
            <li>• Connected to <strong>Polygon Mainnet</strong> (chainId 137) - ensure your wallet is on the correct network</li>
            <li>• Course names are <strong>case-sensitive</strong> - use exact capitalization for consistency</li>
            <li>• Wait for transaction confirmation before verifying certificates</li>
            <li>• You can issue the same course to multiple wallets</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
