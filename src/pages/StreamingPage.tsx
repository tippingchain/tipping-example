import { useSDK, useWallet } from '../hooks'
import { StreamingPage, ChainSelector, MultiTokenTippingInterface } from '@tippingchain/ui-react'
import { createThirdwebClient } from 'thirdweb'
import { ENV } from '../utils/constants'
import React, { useState, useEffect } from 'react'
import { useActiveWalletChain } from 'thirdweb/react'

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: ENV.THIRDWEB_CLIENT_ID,
})

// Holesky testnet for the demo (will need contracts deployed)
const TESTNET_CHAINS = {
  17000: { name: 'Ethereum Holesky Testnet', symbol: 'ETH' },
}

// Testnet Chain Selector
const TestnetChainSelector: React.FC<{
  value?: number;
  onChange: (chainId: number) => void;
  label?: string;
  className?: string;
}> = ({ value, onChange, label = 'Select Source Chain', className = '' }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <select
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Holesky testnet</option>
        {Object.entries(TESTNET_CHAINS).map(([chainId, config]) => (
          <option key={chainId} value={chainId}>
            {config.name} ({config.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

const StreamingPageWrapper = () => {
  const { sdk, isReady, error } = useSDK()
  const { isConnected } = useWallet()
  const activeChain = useActiveWalletChain()
  const [selectedChainId, setSelectedChainId] = useState<number>(17000) // Default to Holesky

  // Update selectedChainId based on active chain if it's a testnet
  useEffect(() => {
    if (activeChain && Object.keys(TESTNET_CHAINS).includes(activeChain.id.toString())) {
      setSelectedChainId(activeChain.id)
    }
  }, [activeChain])

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">
          Failed to initialize TippingChain SDK: {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Initializing TippingChain SDK...</p>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-yellow-800">
            <h3 className="text-lg font-medium mb-2">Wallet Not Connected</h3>
            <p className="text-sm">
              Please connect your wallet to access the streaming page and start tipping creators.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Step indicator at the top */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          TippingChain Testnet Demo - Send a Tip!
        </h1>
        
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
            <span className="ml-2 text-green-700 font-medium">Wallet Connected</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
            <span className="ml-2 text-green-700 font-medium">Creator Selected: #{ENV.DEMO_CREATOR_ID}</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <span className="ml-2 text-blue-700 font-medium">Ready to Tip!</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-gray-700 mb-2">
            <strong>Network:</strong> Ethereum Holesky Testnet only → ApeChain Curtis (USDC conversion)
          </p>
          <p className="text-sm text-gray-600 mb-3">
            🧪 <strong>Holesky Testnet Demo</strong> - No real funds required! Get test ETH from faucet.
          </p>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-700">
              <strong>💡 Testnet Tips:</strong> Use amounts like 0.001, 0.01, or 0.1 ETH. Get Holesky ETH from: 
              <a href="https://faucet.quicknode.com/ethereum/holesky" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                QuickNode Faucet
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Testnet StreamingPage Implementation */}
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🔴 Live Testnet Demo Stream
            </h1>
            <p className="text-xl text-gray-300">
              Send a tip in Holesky ETH - it will automatically convert to USDC on ApeChain Curtis for the creator!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mock Video Section */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">DC</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Demo Creator</h3>
                    <p className="text-gray-300 mb-4">Testing TippingChain v2.0</p>
                  </div>

                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE TESTNET
                  </div>

                  {/* Viewer Count */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    👁️ 42 viewers
                  </div>
                </div>

                {/* Stream Info Bar */}
                <div className="bg-gray-800 text-white p-4">
                  <div className="flex items-center justify-between">
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
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      🧪 Live demo of TippingChain v2.0 - Testnet cross-chain tipping with USDC payouts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipping Interface */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">💰 Send Tip to Creator</h2>
              
              {/* Creator Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">Target Creator</h3>
                <div className="text-sm space-y-1">
                  <p className="text-gray-600">
                    Creator ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">#{ENV.DEMO_CREATOR_ID}</span>
                  </p>
                  <p className="text-gray-600">Name: <span className="font-medium">Demo Creator</span></p>
                  <p className="text-gray-600">Wallet:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">{ENV.DEMO_CREATOR_WALLET}</p>
                  <p className="text-green-600 text-xs">✓ Registered & Active</p>
                </div>
              </div>
              
              {/* Testnet Chain Selection */}
              <div className="mb-6">
                <TestnetChainSelector
                  value={selectedChainId}
                  onChange={setSelectedChainId}
                  label="Select Source Chain"
                  className="w-full"
                />
                {selectedChainId && activeChain && (
                  <p className="text-sm text-gray-500 mt-2">
                    Connected to: {activeChain.name || 'Unknown Chain'}
                  </p>
                )}
              </div>

              {/* Show Tipping Interface only if connected */}
              {isConnected ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">🧪 Holesky Testnet Mode</h4>
                    <p className="text-sm text-blue-700">
                      This demo uses Holesky → Curtis testnet. Tips will be processed using test ETH only.
                    </p>
                  </div>
                  
                  {/* Real MultiTokenTippingInterface component */}
                  <MultiTokenTippingInterface
                    creatorId={ENV.DEMO_CREATOR_ID}
                    client={client}
                    sdk={sdk}
                    onTipSuccess={(result) => {
                      console.log('Tip successful!', result)
                      alert('🎉 Tip sent successfully! The transaction is being processed. The creator will receive USDC on ApeChain Curtis.')
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
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <div className="w-12 h-12 text-gray-400 mx-auto mb-3">💰</div>
                  <p className="text-gray-600 font-medium mb-2">Tipping Interface Locked</p>
                  <p className="text-sm text-gray-500">
                    Connect your wallet to unlock tipping functionality
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreamingPageWrapper

