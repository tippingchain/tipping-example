import { ApeChainTippingSDK } from '@tippingchain/sdk'
import { ENV } from '../utils/constants'
import type { TipParams, TipResult, RewardParams, RewardResult, BatchRewardParams } from '../types'

class TippingService {
  private sdk: ApeChainTippingSDK | null = null
  private isInitialized = false

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      if (!ENV.THIRDWEB_CLIENT_ID) {
        throw new Error('Thirdweb client ID is required')
      }

      this.sdk = new ApeChainTippingSDK({
        clientId: ENV.THIRDWEB_CLIENT_ID,
        environment: ENV.ENVIRONMENT as 'production' | 'development',
        useTestnet: ENV.USE_TESTNET
      })

      this.isInitialized = true
      console.log('TippingService initialized successfully')
    } catch (error) {
      console.error('Failed to initialize TippingService:', error)
      throw error
    }
  }

  getSDK(): ApeChainTippingSDK {
    if (!this.sdk || !this.isInitialized) {
      throw new Error('TippingService not initialized. Call initialize() first.')
    }
    return this.sdk
  }

  async sendTip(params: TipParams): Promise<TipResult> {
    try {
      const sdk = this.getSDK()
      const result = await sdk.sendTip(params)
      return result
    } catch (error) {
      console.error('Failed to send tip:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async rewardViewer(params: RewardParams): Promise<RewardResult> {
    try {
      const sdk = this.getSDK()
      const result = await sdk.rewardViewer(params)
      return result
    } catch (error) {
      console.error('Failed to reward viewer:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async batchRewardViewers(params: BatchRewardParams): Promise<RewardResult> {
    try {
      const sdk = this.getSDK()
      const result = await sdk.batchRewardViewers(params)
      return result
    } catch (error) {
      console.error('Failed to batch reward viewers:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async addCreator(creatorWallet: string, tier: number, thirdwebId?: string): Promise<number> {
    try {
      const sdk = this.getSDK()
      const creatorId = await sdk.addCreator({
        creatorWallet,
        tier,
        thirdwebId
      })
      return creatorId
    } catch (error) {
      console.error('Failed to add creator:', error)
      throw error
    }
  }

  async getCreator(creatorId: number, chainId: number) {
    try {
      const sdk = this.getSDK()
      return await sdk.getCreator(creatorId, chainId)
    } catch (error) {
      console.error('Failed to get creator:', error)
      throw error
    }
  }

  async getCreatorByWallet(wallet: string, chainId: number) {
    try {
      const sdk = this.getSDK()
      return await sdk.getCreatorByWallet(wallet, chainId)
    } catch (error) {
      console.error('Failed to get creator by wallet:', error)
      throw error
    }
  }

  async getPlatformStats(chainId: number) {
    try {
      const sdk = this.getSDK()
      return await sdk.getPlatformStats(chainId)
    } catch (error) {
      console.error('Failed to get platform stats:', error)
      throw error
    }
  }

  async getTopCreators(limit: number, chainId: number) {
    try {
      const sdk = this.getSDK()
      return await sdk.getTopCreators(limit, chainId)
    } catch (error) {
      console.error('Failed to get top creators:', error)
      throw error
    }
  }

  async getViewerRewardStats(viewerAddress: string, chainId: number) {
    try {
      const sdk = this.getSDK()
      return await sdk.getViewerRewardStats(viewerAddress, chainId)
    } catch (error) {
      console.error('Failed to get viewer reward stats:', error)
      throw error
    }
  }

  async getNativeBalance(wallet: string, chainId: number): Promise<string> {
    try {
      const sdk = this.getSDK()
      return await sdk.getNativeBalance(wallet, chainId)
    } catch (error) {
      console.error('Failed to get native balance:', error)
      return '0'
    }
  }

  async getTokenBalance(wallet: string, tokenAddress: string, chainId: number): Promise<string> {
    try {
      const sdk = this.getSDK()
      return await sdk.getTokenBalance(wallet, tokenAddress, chainId)
    } catch (error) {
      console.error('Failed to get token balance:', error)
      return '0'
    }
  }

  isReady(): boolean {
    return this.isInitialized && this.sdk !== null
  }

  reset(): void {
    this.sdk = null
    this.isInitialized = false
  }
}

// Export singleton instance
export const tippingService = new TippingService()
export default tippingService

