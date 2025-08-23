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
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to TippingChain
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Experience the future of multi-chain tipping with integrated Relay.link bridging, 
          creator management, and viewer rewards - all powered by USDC payouts on ApeChain.
        </p>
        
        {!isConnected && (
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <p className="text-gray-700 font-medium">
              🔗 Connect your wallet to get started
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
            className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            if (action.requiresAdmin && !user.canAccessAdmin) {
              return null
            }
            
            return (
              <Link
                key={action.label}
                to={action.path}
                className={`${action.color} text-white font-medium py-4 px-6 rounded-xl text-center transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <div className="text-lg font-semibold mb-1">{action.label}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Demo Creator Info */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎯 Demo Creator</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Creator ID</p>
              <p className="text-2xl font-bold text-primary-600">#{ENV.DEMO_CREATOR_ID}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Network</p>
              <p className="text-lg font-semibold text-gray-900">
                {ENV.USE_TESTNET ? '🧪 Testnet' : '🌐 Mainnet'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
              <p className="text-xs font-mono text-gray-700 bg-gray-50 rounded px-2 py-1">
                {ENV.DEMO_CREATOR_WALLET.slice(0, 6)}...{ENV.DEMO_CREATOR_WALLET.slice(-4)}
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to={ROUTES.STREAMING}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ⚡ Start Tipping Demo Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Platform Info */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📋 Platform Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              🌐 Supported Networks
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><span className="mr-2">⚡</span> Ethereum, Polygon, Optimism, BSC</li>
              <li className="flex items-center"><span className="mr-2">🔗</span> Abstract, Avalanche, Base, Arbitrum, Taiko</li>
              <li className="flex items-center"><span className="mr-2">🎯</span> Destination: ApeChain (USDC payouts)</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              💰 Fee Structure
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><span className="mr-2">🎪</span> Creator Tips: 5% platform fee + tier-based splits</li>
              <li className="flex items-center"><span className="mr-2">🎁</span> Viewer Rewards: 1% platform fee</li>
              <li className="flex items-center"><span className="mr-2">🔄</span> Automatic USDC conversion on ApeChain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

