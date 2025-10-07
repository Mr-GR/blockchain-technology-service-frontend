'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-pulse-slow">
              <span className="text-white text-lg sm:text-xl font-bold">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight pb-0.5">
                Certification NFT
              </h1>
              <p className="text-xs text-gray-500 leading-tight">Soulbound Credentials</p>
            </div>
          </Link>

          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-6xl mb-6">🔗</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect Your Wallet
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Connect your Web3 wallet to access your certificates and verify credentials
            </p>
          </div>

          {/* Connect Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100 animate-fade-in">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Choose Your Wallet
                </h3>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>

              <div className="w-full border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Why Connect?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>View all your earned certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Verify certificate authenticity on the blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Access admin panel if you're an issuer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Your certificates are permanently yours and non-transferable</span>
                  </li>
                </ul>
              </div>

              <div className="w-full border-t border-gray-200 pt-6">
                <p className="text-xs text-gray-500 text-center">
                  Supported wallets: MetaMask, WalletConnect, Coinbase Wallet, and more
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have a wallet yet?{' '}
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
              >
                Get MetaMask
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
