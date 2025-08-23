// Application types
export interface AppConfig {
  name: string
  version: string
  description: string
  defaultTipAmount: string
  maxBatchSize: number
  refreshInterval: number
}

// User types
export interface User {
  address: string
  isConnected: boolean
  isAdmin: boolean
  isOwner: boolean
}

// Creator types
export interface Creator {
  id: number
  wallet: string
  thirdwebId?: string
  tier: number
  totalTips: string
  isActive: boolean
}

// Transaction types
export interface Transaction {
  hash: string
  type: 'tip' | 'reward' | 'creator_add'
  amount: string
  token: string
  chainId: number
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  creatorId?: number
  viewerAddress?: string
}

// Tip types
export interface TipParams {
  sourceChainId: number
  creatorId: number
  amount: string
  token: string
}

export interface TipResult {
  success: boolean
  transactionHash?: string
  error?: string
  estimatedUsdcAmount?: string
}

// Reward types
export interface RewardParams {
  viewerAddress?: string
  viewerId?: number
  thirdwebId?: string
  amount: string
  reason: string
  token: string
  chainId: number
}

export interface RewardResult {
  success: boolean
  transactionHash?: string
  error?: string
  viewerAmount?: string
  platformFee?: string
  estimatedUsdcAmount?: string
}

// Batch reward types
export interface BatchRewardParams {
  viewers: Array<{
    address?: string
    id?: number
    thirdwebId?: string
    amount: string
    reason: string
  }>
  token: string
  chainId: number
}

// Navigation types
export interface NavigationItem {
  label: string
  path: string
  icon?: string
  requiresAuth?: boolean
  requiresAdmin?: boolean
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  message?: string
}

// Form validation
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}
