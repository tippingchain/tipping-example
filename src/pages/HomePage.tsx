import { Link } from 'react-router-dom'
import { useWallet } from '../hooks'
import { ROUTES, ENV } from '../utils/constants'

const HomePage = () => {
  const { user, isConnected } = useWallet()

  const features = [
    {
      title: 'Multi-Chain Tipping',
      description: 'Send tips to creators across 9 blockchain networks with automatic USDC conversion on ApeChain.',
      icon: '🌐',
      path: ROUTES.STREAMING
    },
    {
      title: 'Creator Management',
      description: 'Register creators with tier-based revenue splits and comprehensive analytics.',
      icon: '👑',
      path: ROUTES.ADMIN
    },
    {
      title: 'Viewer Rewards',
      description: 'Reward your audience with batch operations and reduced platform fees.',
      icon: '🎁',
      path: ROUTES.VIEWER_REWARDS
    },
    {
      title: 'Advanced Analytics',
      description: 'Track platform performance, creator statistics, and transaction history.',
      icon: '📊',
      path: ROUTES.ANALYTICS
    }
  ]

  const quickActions = [
    {
      label: 'Start Tipping',
      description: 'Send tips to creators',
      path: ROUTES.STREAMING,
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      label: 'View Analytics',
      description: 'Check platform stats',
      path: ROUTES.ANALYTICS,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Manage Creators',
      description: 'Admin functions',
      path: ROUTES.ADMIN,
      color: 'bg-purple-600 hover:bg-purple-700',
      requiresAdmin: true
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/tippingchain.png" 
            alt="TippingChain" 
            className="h-24 w-24"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TippingChain Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the future of multi-chain tipping with integrated Relay.link bridging, 
          creator management, and viewer rewards - all powered by USDC payouts on ApeChain.
        </p>
        
        {!isConnected && (
          <div className="mt-8">
            <p className="text-gray-500 mb-4">
              Connect your wallet to get started
            </p>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            if (action.requiresAdmin && !user.canAccessAdmin) {
              return null
            }
            
            return (
              <Link
                key={action.label}
                to={action.path}
                className={`${action.color} text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200`}
              >
                <div className="text-lg font-semibold">{action.label}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Demo Creator Info */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Creator</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Creator ID</p>
              <p className="text-lg font-semibold text-gray-900">#{ENV.DEMO_CREATOR_ID}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Wallet Address</p>
              <p className="text-sm font-mono text-gray-900 break-all">
                {ENV.DEMO_CREATOR_WALLET}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Network</p>
              <p className="text-lg font-semibold text-gray-900">
                {ENV.USE_TESTNET ? 'Testnet' : 'Mainnet'}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={ROUTES.STREAMING}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Start Tipping Demo Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Platform Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Networks</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Ethereum, Polygon, Optimism, BSC</li>
              <li>• Abstract, Avalanche, Base, Arbitrum, Taiko</li>
              <li>• Destination: ApeChain (USDC payouts)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Fee Structure</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Creator Tips: 5% platform fee + tier-based splits</li>
              <li>• Viewer Rewards: 1% platform fee</li>
              <li>• Automatic USDC conversion on ApeChain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

