import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThirdwebProvider } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
import { defineChain } from 'thirdweb/chains'
import { NotificationProvider } from '@tippingchain/ui-react'
import { Layout, ErrorBoundary } from './components'
import { HomePage } from './pages'
import { ENV } from './utils/constants'
import './App.css'

// TESTNET ONLY CONFIGURATION
// This app is configured to work only with testnet chains

// Define Holesky testnet chain (source chain)
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

// Define Curtis testnet chain (destination chain)
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

// Main App Component
const App = () => {
  return (
    <ThirdwebProvider client={client}>
      <NotificationProvider>
        <ErrorBoundary>
          <Router basename="/tipping-example">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </NotificationProvider>
    </ThirdwebProvider>
  )
}

export default App
