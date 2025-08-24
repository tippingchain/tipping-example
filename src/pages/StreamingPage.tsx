import { useSDK, useWallet } from '../hooks'
import { StreamingPage } from '@tippingchain/ui-react'
import { createThirdwebClient } from 'thirdweb'
import { ENV } from '../utils/constants'

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: ENV.THIRDWEB_CLIENT_ID,
})

const StreamingPageWrapper = () => {
  const { sdk, isReady, error } = useSDK()
  const { isConnected } = useWallet()

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
          TippingChain Demo - Send a Tip!
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
            <strong>Network:</strong> {ENV.USE_TESTNET ? 'Ethereum Holesky Testnet → ApeChain Curtis' : 'Base → ApeChain'} (USDC conversion)
          </p>
          <p className="text-sm text-gray-600 mb-3">
            {ENV.USE_TESTNET ? 'Demo using testnet - no real funds required' : 'Your tip will be sent and automatically converted to USDC on ApeChain for the creator'}
          </p>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>💡 Tip:</strong> Use amounts like 0.001, 0.01, or 0.1 ETH. {ENV.USE_TESTNET ? '(Testnet mode - get test ETH from faucet)' : ''}
            </p>
          </div>
        </div>
      </div>

      <StreamingPage
        client={client}
        sdk={sdk}
        creatorId={ENV.DEMO_CREATOR_ID}
        creatorWallet={ENV.DEMO_CREATOR_WALLET}
        creatorName="Demo Creator"
        streamTitle="🔴 Live Demo Stream"
        streamDescription="Send a tip in Base ETH - it will automatically convert to USDC on ApeChain for the creator! Watch the transaction process in your wallet."
        enableViewerCount={true}
        enableLikeButton={true}
        isLiveStream={true}
        onTipSuccess={(result) => {
          console.log('Tip successful!', result)
          alert('🎉 Tip sent successfully! The transaction is being processed. The creator will receive USDC on ApeChain.')
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
        onViewerCountChange={(count) => {
          // console.log('Viewer count:', count)
        }}
        onStreamStatusChange={(status) => {
          console.log('Stream status:', status)
        }}
      />
    </div>
  )
}

export default StreamingPageWrapper

