import { useState, useEffect, useCallback } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import tippingService from '../services/tippingService'
import { ENV } from '../utils/constants'
import type { TipParams, TipResult, RewardParams, RewardResult, BatchRewardParams } from '../types'

export const useSDK = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const account = useActiveAccount()

  // Initialize SDK
  const initialize = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      await tippingService.initialize()
      setIsInitialized(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize SDK'
      setError(errorMessage)
      console.error('SDK initialization failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Reset SDK
  const reset = useCallback(() => {
    tippingService.reset()
    setIsInitialized(false)
    setError(null)
  }, [])

  // Initialize on mount
  useEffect(() => {
    if (!isInitialized && !isLoading) {
      initialize()
    }
  }, [isInitialized, isLoading, initialize])

  // Re-initialize when client ID changes
  useEffect(() => {
    if (ENV.THIRDWEB_CLIENT_ID && !isInitialized) {
      initialize()
    }
  }, [ENV.THIRDWEB_CLIENT_ID, isInitialized, initialize])

  // SDK methods
  const sendTip = useCallback(async (params: TipParams): Promise<TipResult> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.sendTip(params)
  }, [isInitialized])

  const rewardViewer = useCallback(async (params: RewardParams): Promise<RewardResult> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.rewardViewer(params)
  }, [isInitialized])

  const batchRewardViewers = useCallback(async (params: BatchRewardParams): Promise<RewardResult> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.batchRewardViewers(params)
  }, [isInitialized])

  const addCreator = useCallback(async (creatorWallet: string, tier: number, thirdwebId?: string): Promise<number> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.addCreator(creatorWallet, tier, thirdwebId)
  }, [isInitialized])

  const getCreator = useCallback(async (creatorId: number, chainId: number) => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getCreator(creatorId, chainId)
  }, [isInitialized])

  const getCreatorByWallet = useCallback(async (wallet: string, chainId: number) => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getCreatorByWallet(wallet, chainId)
  }, [isInitialized])

  const getPlatformStats = useCallback(async (chainId: number) => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getPlatformStats(chainId)
  }, [isInitialized])

  const getTopCreators = useCallback(async (limit: number, chainId: number) => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getTopCreators(limit, chainId)
  }, [isInitialized])

  const getViewerRewardStats = useCallback(async (viewerAddress: string, chainId: number) => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getViewerRewardStats(viewerAddress, chainId)
  }, [isInitialized])

  const getNativeBalance = useCallback(async (wallet: string, chainId: number): Promise<string> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getNativeBalance(wallet, chainId)
  }, [isInitialized])

  const getTokenBalance = useCallback(async (wallet: string, tokenAddress: string, chainId: number): Promise<string> => {
    if (!isInitialized) {
      throw new Error('SDK not initialized')
    }
    return await tippingService.getTokenBalance(wallet, tokenAddress, chainId)
  }, [isInitialized])

  const getSDKInstance = useCallback(() => {
    if (!isInitialized) {
      return null
    }
    try {
      return tippingService.getSDK()
    } catch {
      return null
    }
  }, [isInitialized])

  return {
    // State
    isInitialized,
    isLoading,
    error,
    
    // SDK instance
    sdk: getSDKInstance(),
    
    // Actions
    initialize,
    reset,
    
    // SDK methods
    sendTip,
    rewardViewer,
    batchRewardViewers,
    addCreator,
    getCreator,
    getCreatorByWallet,
    getPlatformStats,
    getTopCreators,
    getViewerRewardStats,
    getNativeBalance,
    getTokenBalance,
    
    // Utility
    isReady: isInitialized && !isLoading && !error
  }
}

