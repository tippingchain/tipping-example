import React, { useState, useEffect } from 'react'
import { useSDK, useWallet } from '../hooks'
import { MultiTokenTippingInterface } from '@tippingchain/ui-react'
import { createThirdwebClient } from 'thirdweb'
import { useActiveWalletChain } from 'thirdweb/react'
import { ENV } from '../utils/constants'

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: ENV.THIRDWEB_CLIENT_ID,
})

// Holesky testnet for the demo
const TESTNET_CHAINS = {
  17000: { name: 'Ethereum Holesky Testnet', symbol: 'ETH' },
}

const HomePage = () => {
  const { sdk, isReady, error } = useSDK()
  const { isConnected } = useWallet()
  const activeChain = useActiveWalletChain()
  const [selectedChainId, setSelectedChainId] = useState<number>(17000) // Default to Holesky
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Update selectedChainId based on active chain if it's a testnet
  useEffect(() => {
    if (activeChain && Object.keys(TESTNET_CHAINS).includes(activeChain.id.toString())) {
      setSelectedChainId(activeChain.id)
    }
  }, [activeChain])

  // Update step progress based on connection status
  useEffect(() => {
    if (!isConnected) {
      setCurrentStep(1)
    } else if (isConnected && isReady) {
      setCurrentStep(3)
    } else if (isConnected) {
      setCurrentStep(2)
    }
  }, [isConnected, isReady])

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 text-lg mb-4">
            Failed to initialize TippingChain SDK: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Full Width */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                🧪 TippingChain
                <br />Holesky Demo
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Experience cross-chain tipping on testnet. Send ETH on Holesky, creators receive USDC on ApeChain Curtis.
              </p>
              
              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🌐</div>
                  <div className="text-sm text-purple-100">Source Network</div>
                  <div className="font-semibold">Ethereum Holesky</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm text-purple-100">Destination</div>
                  <div className="font-semibold">ApeChain Curtis</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  ✅ No real funds needed
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  🧪 Testnet only
                </div>
              </div>
            </div>
            
            {/* Quick Status Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Start Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Wallet Connected</span>
                  <span className={isConnected ? 'text-green-300' : 'text-red-300'}>
                    {isConnected ? '✅' : '❌'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SDK Ready</span>
                  <span className={isReady ? 'text-green-300' : 'text-yellow-300'}>
                    {isReady ? '✅' : '⏳'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ready to Tip</span>
                  <span className={currentStep >= 3 ? 'text-green-300' : 'text-gray-300'}>
                    {currentStep >= 3 ? '🚀' : '⏸️'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps - Horizontal Layout */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                isConnected ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                {isConnected ? '✓' : '1'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Connect Wallet</h3>
                <p className="text-sm text-gray-600">
                  {isConnected ? 'Connected to Holesky' : 'Click Connect Wallet button'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                isReady ? 'bg-green-500' : isConnected ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                {isReady ? '✓' : '2'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Initialize SDK</h3>
                <p className="text-sm text-gray-600">
                  {isReady ? 'TippingChain ready' : 'Loading contracts...'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                currentStep >= 3 ? 'bg-purple-500' : 'bg-gray-400'
              }`}>
                {currentStep >= 3 ? '💰' : '3'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Send Tip</h3>
                <p className="text-sm text-gray-600">
                  {currentStep >= 3 ? 'Ready to tip!' : 'Complete steps above'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Demo Stream */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Mock Video Player */}
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">DC</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Demo Creator</h3>
                  <p className="text-gray-300 mb-4">Testing TippingChain Holesky → Curtis</p>
                </div>

                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE TESTNET
                </div>

                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  👁️ 42 viewers
                </div>
              </div>

              {/* Stream Info */}
              <div className="bg-gray-800 text-white p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">DC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Demo Creator</h4>
                    <p className="text-xs text-gray-400 font-mono">
                      {ENV.DEMO_CREATOR_WALLET.slice(0, 8)}...{ENV.DEMO_CREATOR_WALLET.slice(-6)}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    🧪 Live demo of TippingChain v2.0 - Holesky testnet cross-chain tipping
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tipping Interface */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
              💰 Send Tip to Creator
            </h2>
            
            {/* Creator Info Box */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border">
              <h3 className="font-semibold text-gray-900 mb-3">Target Creator</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator ID:</span>
                  <span className="font-mono bg-purple-100 px-2 py-1 rounded">#{ENV.DEMO_CREATOR_ID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">Demo Creator</span>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 text-xs mb-1">Wallet:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">{ENV.DEMO_CREATOR_WALLET}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 text-xs">✓ Registered & Active</span>
                </div>
              </div>
            </div>

            {/* Network Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                🌐 Network: Holesky Testnet Only
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><span className="font-medium">Source:</span> Ethereum Holesky (17000)</p>
                <p><span className="font-medium">Destination:</span> ApeChain Curtis (33111)</p>
                <p><span className="font-medium">Conversion:</span> ETH → USDC</p>
              </div>
            </div>

            {/* Tipping Interface */}
            {isConnected && isReady ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    🎉 <strong>Ready!</strong> You can now send tips to the demo creator.
                  </p>
                </div>
                
                <MultiTokenTippingInterface
                  creatorId={ENV.DEMO_CREATOR_ID}
                  client={client}
                  sdk={sdk}
                  onTipSuccess={(result) => {
                    console.log('Tip successful!', result)
                    alert('🎉 Tip sent successfully! Transaction is being processed. Creator will receive USDC on ApeChain Curtis.')
                  }}
                  onTipError={(error) => {
                    console.error('Tip failed:', error)
                    let errorMessage = '❌ Tip failed. Please try again.'
                    
                    if (error.includes('BigInt')) {
                      errorMessage = '❌ Invalid tip amount. Please try a different amount (e.g., 0.001 ETH).'
                    } else if (error.includes('calculateTipSplits')) {
                      errorMessage = '❌ Contract configuration issue. The demo may need updates.'
                    } else if (error.includes('user rejected')) {
                      errorMessage = '❌ Transaction was cancelled by user.'
                    }
                    
                    alert(errorMessage)
                  }}
                />
              </div>
            ) : !isConnected ? (
              <div className="p-6 bg-yellow-50 rounded-xl border-2 border-dashed border-yellow-300 text-center">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-yellow-800 font-medium mb-2">Connect Your Wallet</p>
                <p className="text-sm text-yellow-700">
                  Use the "Connect Wallet" button in the top right to get started
                </p>
              </div>
            ) : (
              <div className="p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-300 text-center">
                <div className="text-4xl mb-3">⏳</div>
                <p className="text-blue-800 font-medium mb-2">Initializing TippingChain</p>
                <p className="text-sm text-blue-700">
                  Please wait while we connect to the Holesky testnet...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Grid - Full Width Sections */}
        <div className="grid lg:grid-cols-4 gap-6 mt-12">
          {/* Testnet Instructions - Takes 2 columns */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              🧪 Testnet Setup Guide
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-1">1. Get Test ETH</h4>
                <p className="text-sm text-gray-600 mb-3">Claim Holesky ETH from faucet (free)</p>
                <a 
                  href="https://faucet.quicknode.com/ethereum/holesky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🚰 Get Free ETH
                </a>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-1">2. Switch Network</h4>
                <p className="text-sm text-gray-600">Add Holesky testnet to your wallet</p>
                <div className="text-xs font-mono bg-gray-100 p-2 rounded mt-2">
                  Chain ID: 17000
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-1">3. Test Amounts</h4>
                <p className="text-sm text-gray-600">Start with: 0.001, 0.01, or 0.1 ETH</p>
              </div>
            </div>
          </div>

          {/* Supported Networks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              🌐 Networks
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">Testnet (Active)</h4>
                <div className="text-xs text-blue-800 mt-1">
                  <div>• Holesky (Source)</div>
                  <div>• Curtis (Destination)</div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 text-sm">Production</h4>
                <div className="text-xs text-gray-700 mt-1">
                  <div>• 9 Source chains</div>
                  <div>• ApeChain (USDC)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              💰 Fees
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">Creator Tips</h4>
                <div className="text-xs text-green-800 mt-1">
                  <div>• 5% Platform fee</div>
                  <div>• Tier-based splits</div>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 text-sm">Viewer Rewards</h4>
                <div className="text-xs text-purple-800 mt-1">
                  <div>• 1% Platform fee</div>
                  <div>• 99% to viewer</div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 text-sm">Auto Conversion</h4>
                <div className="text-xs text-yellow-800 mt-1">
                  <div>• ETH → USDC</div>
                  <div>• Via Relay.link</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info Strip */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                🎯 Demo Information
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                This demo uses testnet contracts with Creator #{ENV.DEMO_CREATOR_ID} pre-configured
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600">Creator Wallet</div>
              <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {ENV.DEMO_CREATOR_WALLET.slice(0, 8)}...{ENV.DEMO_CREATOR_WALLET.slice(-6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

