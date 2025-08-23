import { useMemo } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { ENV } from '../utils/constants'
import type { User } from '../types'

export const useWallet = () => {
  const account = useActiveAccount()

  const user: User = useMemo(() => {
    const address = account?.address || ''
    const isConnected = !!address
    
    // Check if user is admin or owner
    const isAdmin = ENV.ADMIN_ADDRESSES.includes(address.toLowerCase())
    const isOwner = ENV.OWNER_ADDRESSES.includes(address.toLowerCase())

    return {
      address,
      isConnected,
      isAdmin,
      isOwner
    }
  }, [account?.address])

  const canManageCreators = useMemo(() => {
    return user.isAdmin || user.isOwner
  }, [user.isAdmin, user.isOwner])

  const canAccessAdmin = useMemo(() => {
    return user.isAdmin || user.isOwner
  }, [user.isAdmin, user.isOwner])

  const canSendRewards = useMemo(() => {
    return user.isConnected // Any connected user can send rewards
  }, [user.isConnected])

  const shortAddress = useMemo(() => {
    if (!user.address) return ''
    return `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
  }, [user.address])

  return {
    // User state
    user,
    
    // Computed permissions
    canManageCreators,
    canAccessAdmin,
    canSendRewards,
    
    // Utility
    shortAddress,
    
    // Account info
    account,
    address: user.address,
    isConnected: user.isConnected
  }
}

