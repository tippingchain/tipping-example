import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
import { defineChain } from 'thirdweb/chains'
import { useWallet } from '../hooks'
import { ROUTES, ENV } from '../utils/constants'

// Define Holesky testnet chain
const holeskyTestnet = defineChain({
  id: 17000,
  name: 'Ethereum Holesky Testnet',
  rpc: 'https://ethereum-holesky-rpc.publicnode.com',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Holesky Etherscan',
      url: 'https://holesky.etherscan.io',
    },
  ],
  testnet: true,
})

// Define Curtis testnet chain  
const curtisTestnet = defineChain({
  id: 33111,
  name: 'ApeChain Curtis Testnet',
  rpc: 'https://curtis.rpc.caldera.xyz/http',
  nativeCurrency: {
    name: 'ApeCoin',
    symbol: 'APE',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Curtis Explorer',
      url: 'https://curtis.explorer.caldera.xyz',
    },
  ],
  testnet: true,
})

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: ENV.THIRDWEB_CLIENT_ID,
})

const Navigation = () => {
  const location = useLocation()
  const { user, canAccessAdmin } = useWallet()

  const navigationItems = [
    { label: 'TippingChain Demo', path: ROUTES.HOME }
  ]

  const isActiveRoute = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/tipping-example/tippingchain.png" 
                alt="TippingChain" 
                className="mr-2"
                style={{ width: '24px', height: '24px' }}
              />
              <span className="text-xl font-bold text-gray-900">
                🧪 TippingChain Holesky Demo
              </span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActiveRoute(item.path)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Wallet Connection */}
          <div className="flex items-center">
            {user.isConnected && (
              <div className="mr-4 text-sm text-gray-500">
                {user.shortAddress}
                {user.isAdmin && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Admin
                  </span>
                )}
                {user.isOwner && (
                  <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                    Owner
                  </span>
                )}
              </div>
            )}
            <ConnectButton 
              client={client}
              chains={[holeskyTestnet, curtisTestnet]}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActiveRoute(item.path)
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

