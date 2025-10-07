'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import Link from 'next/link';
import { isAddress } from 'viem';

export default function VerifyPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [courseName, setCourseName] = useState('');
  const [shouldVerify, setShouldVerify] = useState(false);

  const { data: hasCertificate, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'verifyCertification',
    args: [walletAddress as `0x${string}`, courseName],
    query: {
      enabled: shouldVerify && isAddress(walletAddress) && courseName.length > 0,
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(walletAddress)) {
      alert('Please enter a valid wallet address');
      return;
    }

    if (!courseName) {
      alert('Please enter a course name');
      return;
    }

    setShouldVerify(true);
  };

  const handleReset = () => {
    setShouldVerify(false);
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
                  setShouldVerify(false);
                }}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-1">The wallet address to verify</p>
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course/Achievement Name *
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                  setShouldVerify(false);
                }}
                placeholder="e.g., Blockchain Development Bootcamp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">The exact name of the course or achievement</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Verifying...' : 'Verify Certificate'}
              </button>

              {shouldVerify && (
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

          {/* Verification Result */}
          {shouldVerify && !isLoading && (
            <div className="mt-8">
              {hasCertificate ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-3xl">✓</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-800 mb-2">Certificate Verified!</h3>
                      <p className="text-green-700 mb-4">
                        This wallet address holds a certificate for <strong>{courseName}</strong>
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                        <p className="font-mono text-xs text-gray-900 break-all">{walletAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-3xl">✗</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-800 mb-2">Certificate Not Found</h3>
                      <p className="text-red-700 mb-4">
                        This wallet address does not hold a certificate for <strong>{courseName}</strong>
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-red-200">
                        <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                        <p className="font-mono text-xs text-gray-900 break-all">{walletAddress}</p>
                      </div>
                      <p className="text-sm text-red-600 mt-4">
                        ⚠️ Make sure the course name matches exactly as it appears on the certificate
                      </p>
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
            <li>• Enter the exact course/achievement name</li>
            <li>• The system checks the blockchain for matching certificates</li>
            <li>• Results are instant and verifiable on-chain</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
