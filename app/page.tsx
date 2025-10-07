'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, BLOCK_EXPLORER } from '@/lib/contract';
import { CertificateCard } from '@/components/CertificateCard';
import Link from 'next/link';

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: totalCerts } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalCertifications',
  });

  const { data: contractName } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'symbol',
  });

  const { data: userCertIds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCertifications',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 animate-slide-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-pulse-slow">
              <span className="text-white text-lg sm:text-xl font-bold">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight pb-0.5">
                Certification NFT
              </h1>
              <p className="text-xs text-gray-500 leading-tight">Soulbound Credentials</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent px-4 pb-2">
            Digital Credentials on Blockchain
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Verifiable, non-transferable NFT certificates for courses, achievements, and credentials
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-12 sm:mb-16 animate-fade-in">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">
                  📚
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  1
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                  Complete Course
                </h4>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  Finish your course or achievement requirements
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-3xl text-purple-300">
                →
              </div>
              {/* Arrow for mobile */}
              <div className="md:hidden flex justify-center mt-4 mb-2 text-3xl text-purple-300 rotate-90">
                →
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all hover:scale-105">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">
                  🎖️
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  2
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                  Receive NFT
                </h4>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  Get your certificate minted as an NFT on the blockchain
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-3xl text-blue-300">
                →
              </div>
              {/* Arrow for mobile */}
              <div className="md:hidden flex justify-center mt-4 mb-2 text-3xl text-blue-300 rotate-90">
                →
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all hover:scale-105">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">
                  🔒
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  3
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                  Own Forever
                </h4>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  Your certificate is permanently yours, non-transferable and verifiable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Contract Name</div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{contractName as string || 'Loading...'}</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Symbol</div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{symbol as string || 'Loading...'}</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Total Certificates</div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{totalCerts?.toString() || '0'}</div>
          </div>
        </div>

        {/* Action Links */}
        <div className="mb-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <span>👨‍💼</span>
            <span className="hidden sm:inline">Admin Panel - Issue Certificates</span>
            <span className="sm:hidden">Admin Panel</span>
          </Link>

          <Link
            href="/verify"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <span>✓</span>
            Verify Certificate
          </Link>
        </div>

        {/* Connected State */}
        {isConnected ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-bold">Your Certificates</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium w-fit">
                {userCertIds ? (userCertIds as bigint[]).length : 0} Total
              </span>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">Connected Wallet</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-gray-800 break-all">{address}</div>
            </div>

            {userCertIds && (userCertIds as bigint[]).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {(userCertIds as bigint[]).map((tokenId, index) => (
                  <div
                    key={tokenId.toString()}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CertificateCard tokenId={tokenId} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📜</div>
                <p className="text-base sm:text-lg mb-1 sm:mb-2 font-medium">No certificates yet</p>
                <p className="text-xs sm:text-sm px-4">Certificates will appear here once issued</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-gray-100 animate-fade-in">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔐</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-4">Connect Your Wallet</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4 max-w-md mx-auto">
              Connect your wallet to view your certificates and verify credentials
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        )}

        {/* Contract Info */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-700 text-sm sm:text-base">Contract Information</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-gray-500 font-medium">Address:</span>
              <a
                href={`${BLOCK_EXPLORER}/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-purple-600 hover:text-purple-800 hover:underline break-all"
              >
                {CONTRACT_ADDRESS}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Network:</span>
              <span className="font-medium">Polygon Amoy Testnet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium">ERC-721 (Soulbound)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Built with Next.js, wagmi, RainbowKit & Polygon Amoy</p>
        </div>
      </footer>
    </div>
  );
}
