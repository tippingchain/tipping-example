# End-to-End TippingChain Testing Setup

## 🎯 Overview

This examples project has been updated to use the **new end-to-end contracts** deployed for immediate testing without timelock delays.

## 📋 Contract Configuration

### ✅ Deployed Contracts

| Network | Chain ID | Address | Role |
|---------|----------|---------|------|
| **Holesky Testnet** | 17000 | `0xD4CbCE6aE8Fd2c2a3009607FeB6328bF9BBE4223` | Source |
| **ApeChain Curtis** | 33111 | `0x2b50C16877a3E262e0D5B9a4B9f7517634Ba27d8` | Destination |

### ⚙️ Configuration Features

- ✅ **Relay receivers configured** (no timelock delays)
- ✅ **Auto-relay enabled** on both chains
- ✅ **Test creator added** (ID #1: `0x479945d7931baC3343967bD0f839f8691E54a66e`)
- ✅ **Admin accounts configured**
- ✅ **Cross-chain bridging ready**

## 🚀 Quick Start

### 1. Environment Setup

The `.env` file is pre-configured for testnet use:

```bash
VITE_USE_TESTNET=true
VITE_DEFAULT_CHAIN_ID=17000  # Holesky
VITE_DEMO_CREATOR_ID=1
VITE_DEMO_CREATOR_WALLET=0x479945d7931baC3343967bD0f839f8691E54a66e
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test Features

The demo app includes:

- **🎯 Basic Tipping** - Send ETH tips on Holesky
- **🌉 Cross-Chain Flow** - Tips automatically relay to Curtis as USDC
- **👥 Creator Management** - Add/manage creators (admin only)
- **🎁 Viewer Rewards** - Send rewards to viewers
- **📊 Analytics** - Platform stats and creator analytics
- **📜 Transaction History** - View all transactions

## 🧪 Testing Scenarios

### End-to-End Flow
1. Connect wallet to Holesky testnet
2. Send tip to Creator #1 (0.01 ETH minimum)
3. Tip automatically bridges to Curtis as USDC
4. Check Curtis contract for USDC balance updates

### Admin Features
Admin addresses: `0x29aE0362FcF55cc646fD83B6E0DeB433FF7e019b`, `0xFacc5779f01348986F3f6ac3b563F4164f7c4213`

- Add new creators
- Manage creator tiers
- Platform configuration
- View detailed analytics

### Multi-Chain Testing
- Test from Holesky → Curtis
- Monitor relay progress
- Verify USDC payouts
- Check fee distributions

## 🔧 Package Updates

### Updated Dependencies
- `@tippingchain/contracts-interface@1.5.0` - New contract addresses
- `@tippingchain/sdk@2.5.0` - Updated for new contracts
- `@tippingchain/ui-react@2.5.3` - Latest UI components

### Build Verification
```bash
npm run build    # ✅ Builds successfully
npm run test     # Run integration tests
```

## 🌐 Network Requirements

### Holesky Testnet
- **Chain ID:** 17000
- **RPC:** https://rpc.ankr.com/eth_holesky
- **Faucet:** https://faucet.quicknode.com/ethereum/holesky

### ApeChain Curtis
- **Chain ID:** 33111
- **RPC:** https://curtis.rpc.caldera.xyz/http
- **Explorer:** https://curtis.explorer.caldera.xyz

## 🎉 Ready for Testing!

The examples project is now fully configured for **immediate end-to-end testing** with:
- ✅ Zero timelock delays
- ✅ Real cross-chain functionality
- ✅ Complete UI/SDK integration
- ✅ Production-like testing environment

Start the app and test the full cross-chain tipping flow! 🚀