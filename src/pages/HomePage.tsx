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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Demo Stream */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Mock Video Player */}
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  👁️ 42 viewers
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
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator ID: </span>
                  <span className="font-mono bg-purple-100 px-2 py-1 rounded">#{ENV.DEMO_CREATOR_ID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name: </span>
                  <span className="font-medium">Demo Creator</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wallet: </span>
                  <span className="font-medium">{ENV.DEMO_CREATOR_WALLET}</span>
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
      </div>
    </div>
  )
}

export default HomePage

