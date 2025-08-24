// Environment configuration - TESTNET ONLY
export const ENV = {
  THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID || 'df6b18c1d07bf0cc9287b48180157b10',
  ENVIRONMENT: 'development', // Always development for testnet
  USE_TESTNET: true, // Always true - this is a testnet-only app
  DEFAULT_CHAIN_ID: 17000, // Always Holesky testnet
  RELAY_API_URL: import.meta.env.VITE_RELAY_API_URL || 'https://api.relay.link',
  DEMO_CREATOR_ID: Number(import.meta.env.VITE_DEMO_CREATOR_ID) || 1,
  DEMO_CREATOR_WALLET: import.meta.env.VITE_DEMO_CREATOR_WALLET || '0x479945d7931baC3343967bD0f839f8691E54a66e',
  ADMIN_ADDRESSES: import.meta.env.VITE_ADMIN_ADDRESSES?.split(',') || [],
  OWNER_ADDRESSES: import.meta.env.VITE_OWNER_ADDRESSES?.split(',') || []
} as const

// Application constants
export const APP_CONFIG = {
  NAME: 'TippingChain Testnet Demo',
  VERSION: '1.0.0-testnet',
  DESCRIPTION: 'Testnet demo showcasing cross-chain tipping: Holesky → Curtis',
  DEFAULT_TIP_AMOUNT: '0.001',
  MAX_BATCH_SIZE: 50,
  REFRESH_INTERVAL: 30000, // 30 seconds
} as const

// Navigation routes
export const ROUTES = {
  HOME: '/',
  STREAMING: '/streaming',
  ADMIN: '/admin',
  VIEWER_REWARDS: '/viewer-rewards',
  ANALYTICS: '/analytics',
  TRANSACTION_HISTORY: '/transactions'
} as const

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_AMOUNT: 'Please enter a valid amount',
  CREATOR_NOT_FOUND: 'Creator not found',
  PERMISSION_DENIED: 'You do not have permission to perform this action'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  TIP_SENT: 'Tip sent successfully!',
  CREATOR_ADDED: 'Creator added successfully!',
  REWARD_SENT: 'Reward sent successfully!',
  WALLET_CONNECTED: 'Wallet connected successfully!',
  TRANSACTION_CONFIRMED: 'Transaction confirmed!'
} as const

