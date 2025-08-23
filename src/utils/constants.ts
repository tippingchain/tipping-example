// Environment configuration
export const ENV = {
  THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID || '',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'production',
  USE_TESTNET: import.meta.env.VITE_USE_TESTNET === 'true',
  DEFAULT_CHAIN_ID: Number(import.meta.env.VITE_DEFAULT_CHAIN_ID) || 8453,
  RELAY_API_URL: import.meta.env.VITE_RELAY_API_URL || 'https://api.relay.link',
  DEMO_CREATOR_ID: Number(import.meta.env.VITE_DEMO_CREATOR_ID) || 1,
  DEMO_CREATOR_WALLET: import.meta.env.VITE_DEMO_CREATOR_WALLET || '0x479945d7931baC3343967bD0f839f8691E54a66e',
  ADMIN_ADDRESSES: import.meta.env.VITE_ADMIN_ADDRESSES?.split(',') || [],
  OWNER_ADDRESSES: import.meta.env.VITE_OWNER_ADDRESSES?.split(',') || []
} as const

// Application constants
export const APP_CONFIG = {
  NAME: 'TippingChain Demo',
  VERSION: '1.0.0',
  DESCRIPTION: 'Complete demo application showcasing TippingChain features',
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
