import { useSDK, useWallet } from '../hooks'
import { StreamingPage } from '@tippingchain/ui-react'
import { ENV } from '../utils/constants'

const StreamingPageWrapper = () => {
  const { isReady, error } = useSDK()
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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Live Streaming with Tipping
        </h1>
        <p className="text-gray-600">
          Watch your favorite creators and send tips across multiple blockchain networks
        </p>
      </div>

      <StreamingPage
        client={null} // Will be provided by ThirdwebProvider context
        sdk={null} // Will be provided by ThirdwebProvider context
        creatorId={ENV.DEMO_CREATOR_ID}
        creatorWallet={ENV.DEMO_CREATOR_WALLET}
        creatorName="Demo Creator"
        streamTitle="🔴 Live Demo Stream"
        streamDescription="Experience TippingChain's multi-chain tipping platform with this demo stream. Send tips from any supported network and watch them automatically convert to USDC on ApeChain!"
        enableViewerCount={true}
        enableLikeButton={true}
        isLiveStream={true}
        onTipSuccess={(result) => {
          console.log('Tip successful!', result)
          // You can add custom success handling here
        }}
        onTipError={(error) => {
          console.error('Tip failed:', error)
          // You can add custom error handling here
        }}
        onViewerCountChange={(count) => {
          console.log('Viewer count:', count)
        }}
        onStreamStatusChange={(status) => {
          console.log('Stream status:', status)
        }}
      />
    </div>
  )
}

export default StreamingPageWrapper

