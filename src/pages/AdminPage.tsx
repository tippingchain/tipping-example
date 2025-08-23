import { useSDK, useWallet } from '../hooks'
import { AdminDashboard } from '@tippingchain/ui-react'
import { ENV } from '../utils/constants'

const AdminPageWrapper = () => {
  const { isReady, error } = useSDK()
  const { user, canAccessAdmin } = useWallet()

  if (!canAccessAdmin) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-800">
            <h3 className="text-lg font-medium mb-2">Access Denied</h3>
            <p className="text-sm">
              You do not have permission to access the admin dashboard. 
              Only admin users and contract owners can view this page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">
          Failed to initialize TippingChain SDK: {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Initializing TippingChain SDK...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage creators, view platform analytics, and control contract settings
        </p>
        <div className="mt-2 text-sm text-gray-500">
          Connected as: {user.shortAddress} 
          {user.isAdmin && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Admin</span>}
          {user.isOwner && <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Owner</span>}
        </div>
      </div>

      <AdminDashboard
        client={null} // Will be provided by ThirdwebProvider context
        sdk={null} // Will be provided by ThirdwebProvider context
        defaultChainId={ENV.DEFAULT_CHAIN_ID}
        enablePlatformStats={true}
        enableCreatorAnalytics={true}
        adminAddresses={ENV.ADMIN_ADDRESSES}
        ownerAddresses={ENV.OWNER_ADDRESSES}
        requirePermissionCheck={true}
        defaultView="overview"
      />
    </div>
  )
}

export default AdminPageWrapper
