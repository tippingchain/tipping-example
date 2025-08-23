import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock thirdweb
vi.mock('thirdweb/react', () => ({
  useActiveAccount: vi.fn(() => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true
  })),
  ConnectButton: vi.fn(() => <div data-testid="connect-button">Connect Wallet</div>),
  ThirdwebProvider: vi.fn(({ children }) => children)
}))

// Mock TippingChain packages
vi.mock('@tippingchain/ui-react', () => ({
  StreamingPage: vi.fn(() => <div data-testid="streaming-page">Streaming Page</div>),
  AdminDashboard: vi.fn(() => <div data-testid="admin-dashboard">Admin Dashboard</div>),
  ViewerRewardsPage: vi.fn(() => <div data-testid="viewer-rewards-page">Viewer Rewards Page</div>),
  AnalyticsDashboard: vi.fn(() => <div data-testid="analytics-dashboard">Analytics Dashboard</div>),
  TransactionHistoryPage: vi.fn(() => <div data-testid="transaction-history-page">Transaction History Page</div>),
  ApeChainTippingInterface: vi.fn(() => <div data-testid="tipping-interface">Tipping Interface</div>),
  ViewerRewardStats: vi.fn(() => <div data-testid="viewer-reward-stats">Viewer Reward Stats</div>),
  TransactionStatusMessage: vi.fn(() => <div data-testid="transaction-status-message">Transaction Status</div>),
  Button: vi.fn(({ children, ...props }) => <button {...props}>{children}</button>)
}))

vi.mock('@tippingchain/sdk', () => ({
  ApeChainTippingSDK: vi.fn().mockImplementation(() => ({
    sendTip: vi.fn().mockResolvedValue({ success: true, transactionHash: '0x123' }),
    addCreator: vi.fn().mockResolvedValue(1),
    getCreator: vi.fn().mockResolvedValue({ id: 1, wallet: '0x123', totalTips: '1000000' })
  }))
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
