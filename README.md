# TippingChain Demo Application

A complete demo application showcasing the TippingChain platform - a unified multi-chain tipping platform with integrated Relay.link bridging, creator registry, and viewer rewards.

## 🚀 Features

- **Multi-Chain Tipping**: Send tips to creators across 9 blockchain networks
- **Integrated Relay.link**: Automatic cross-chain bridging to ApeChain with USDC conversion
- **Creator Management**: Admin tools for creator registration and tier management
- **Viewer Rewards**: Batch reward system with reduced platform fees
- **Advanced Analytics**: Platform statistics and creator performance tracking
- **Responsive Design**: Modern UI built with Tailwind CSS and React
- **TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

This demo application demonstrates the complete TippingChain ecosystem:

- **Smart Contracts**: Deployed on multiple chains with unified architecture
- **SDK Integration**: Full TypeScript SDK for contract interactions
- **UI Components**: Pre-built React components for rapid development
- **Service Layer**: Clean abstraction over blockchain operations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Thirdweb account and client ID

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```bash
   VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
   VITE_ENVIRONMENT=production
   VITE_USE_TESTNET=false
   VITE_DEFAULT_CHAIN_ID=8453
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🌐 GitHub Pages Deployment

This application includes automatic GitHub Pages deployment via GitHub Actions.

### Automatic Deployment Setup

1. **Fork or clone** this repository to your GitHub account
2. **Enable GitHub Pages**: Go to Settings → Pages → Source → "GitHub Actions"
3. **Add Repository Secrets**: Go to Settings → Secrets and variables → Actions
   - `VITE_THIRDWEB_CLIENT_ID`: Your Thirdweb client ID (required)
   - `VITE_ADMIN_ADDRESSES`: Comma-separated admin wallet addresses (optional)
   - `VITE_OWNER_ADDRESSES`: Comma-separated owner wallet addresses (optional)
4. **Push to main branch** - deployment happens automatically!

### Manual Deployment

To manually trigger a deployment:
1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Deployment Features

- ✅ **Automatic builds** on every push to main branch
- ✅ **Environment configuration** from repository secrets
- ✅ **Production optimization** with proper chunk splitting
- ✅ **Quality checks** with tests and linting
- ✅ **Secure deployment** with proper permissions

For detailed setup instructions, see [`.github/workflows/README.md`](.github/workflows/README.md).

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage
npm run test:ui      # Run tests with UI interface

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # TypeScript type checking
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx  # Main navigation
│   ├── Layout.tsx      # Page layout wrapper
│   └── ErrorBoundary.tsx # Error handling
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── StreamingPage.tsx # Streaming interface
│   └── AdminPage.tsx   # Admin dashboard
├── hooks/              # Custom React hooks
│   ├── useSDK.ts       # SDK management
│   └── useWallet.ts    # Wallet state
├── services/           # Business logic services
│   └── tippingService.ts # TippingChain operations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── tests/              # Test files and setup
```

### Key Dependencies

- **@tippingchain/sdk**: TippingChain TypeScript SDK
- **@tippingchain/ui-react**: Pre-built React components
- **@tippingchain/contracts-interface**: Contract ABIs and types
- **thirdweb**: Web3 wallet connection and account abstraction
- **react-router-dom**: Client-side routing
- **tailwindcss**: Utility-first CSS framework

## 🌐 Supported Networks

### Source Chains (9 networks)
- **Ethereum** (1) - ETH
- **Polygon** (137) - MATIC  
- **Optimism** (10) - ETH
- **BSC** (56) - BNB
- **Abstract** (2741) - ETH
- **Avalanche** (43114) - AVAX
- **Base** (8453) - ETH
- **Arbitrum** (42161) - ETH
- **Taiko** (167000) - ETH

### Destination Chain
- **ApeChain** (33139) - APE - USDC payouts

### Testnet Support
- **Holesky** (17000) - Ethereum testnet
- **Amoy** (80002) - Polygon testnet  
- **Curtis** (33111) - ApeChain testnet

## 💰 Fee Structure

### Creator Tips
- **Platform Fee**: 5% to TippingChain Treasury
- **Remaining 95%** split by creator tier:
  - **Tier 1**: 60/40 (creator/business)
  - **Tier 2**: 70/30 (creator/business)
  - **Tier 3**: 80/20 (creator/business)
  - **Tier 4**: 90/10 (creator/business)

### Viewer Rewards
- **Platform Fee**: 1% to TippingChain Treasury
- **Viewer receives**: 99% of reward amount
- **Auto-conversion**: All rewards → USDC on ApeChain

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_THIRDWEB_CLIENT_ID` | Thirdweb client ID | Required |
| `VITE_ENVIRONMENT` | Environment (production/development) | production |
| `VITE_USE_TESTNET` | Use testnet networks | false |
| `VITE_DEFAULT_CHAIN_ID` | Default source chain | 8453 (Base) |
| `VITE_DEMO_CREATOR_ID` | Demo creator ID | 1 |
| `VITE_DEMO_CREATOR_WALLET` | Demo creator wallet | Demo address |
| `VITE_ADMIN_ADDRESSES` | Admin wallet addresses | [] |
| `VITE_OWNER_ADDRESSES` | Owner wallet addresses | [] |

### Demo Creator Setup

The application includes a demo creator for testing:
- **Creator ID**: 1
- **Wallet**: Configured via environment
- **Network**: Base (8453) by default
- **Status**: Active and ready for tips

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Single run with coverage
npm run test:coverage

# UI interface
npm run test:ui
```

### Test Coverage

- **Component Testing**: All page components
- **Hook Testing**: Custom React hooks
- **Service Testing**: Business logic services
- **Integration Testing**: SDK interactions
- **Mock Testing**: External service mocking

## 🚀 Production Deployment

### GitHub Pages (Recommended)

The easiest way to deploy is using the included GitHub Actions:

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Set environment variables** in GitHub Actions secrets
4. **Push to main branch** - automatic deployment!

### Manual Build

```bash
# Production build
npm run build

# Preview build
npm run preview

# Testnet build
VITE_USE_TESTNET=true npm run build
```

## 🔧 Troubleshooting

### Build Issues

If you encounter build failures, use the debug script to identify the problem:

```bash
npm run debug-build
```

This script will:
- Clean previous installations
- Reinstall dependencies
- Verify package accessibility
- Test the build process
- Provide detailed error information

### Common Build Problems

1. **Package Resolution Issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Version Mismatches**
   - Ensure you're using Node.js 18+ or 20+
   - Check that package versions in package.json are correct
   - Verify npm cache: `npm cache clean --force`

3. **Vite Build Failures**
   - Check import statements in your components
   - Verify all dependencies are properly installed
   - Check the Vite configuration in `vite.config.ts`

4. **GitHub Actions Failures**
   - Ensure repository secrets are properly configured
   - Check workflow logs for specific error messages
   - Verify the workflow files are in the correct location

### Debug Commands

```bash
# Check package installation
npm list --depth=0

# Verify specific packages
npm list @tippingchain/ui-react @tippingchain/sdk

# Test package accessibility
node -e "console.log(require('@tippingchain/ui-react'))"

# Check build configuration
npm run typecheck
npm run lint
```

## 🔗 Integration

### Using TippingChain Components

```tsx
import { StreamingPage } from '@tippingchain/ui-react'

<StreamingPage
  client={client}
  sdk={sdk}
  creatorId={1}
  creatorWallet="0x..."
  onTipSuccess={handleTipSuccess}
/>
```

### Custom SDK Usage

```tsx
import { useSDK } from './hooks'

const { sendTip, rewardViewer } = useSDK()

const result = await sendTip({
  sourceChainId: 8453,
  creatorId: 1,
  amount: '1000000000000000000',
  token: 'native'
})
```

## 🆘 Support

### Common Issues

1. **SDK Initialization Failed**
   - Check `VITE_THIRDWEB_CLIENT_ID` is set
   - Verify network connectivity
   - Check browser console for errors

2. **Wallet Connection Issues**
   - Ensure MetaMask or other wallet is installed
   - Check if wallet is on supported network
   - Try refreshing the page

3. **Transaction Failures**
   - Verify sufficient balance
   - Check gas fees and limits
   - Ensure creator is registered

4. **GitHub Pages Deployment Issues**
   - Ensure GitHub Pages is enabled and set to "GitHub Actions"
   - Check that repository secrets are properly configured
   - Verify the main branch contains the latest code

### Resources

- **Documentation**: [TippingChain Docs](../docs)
- **GitHub**: [TippingChain Repository](https://github.com/tippingchain)
- **Issues**: [GitHub Issues](https://github.com/tippingchain/issues)
- **Workflows**: [GitHub Actions Setup](.github/workflows/README.md)

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ by the TippingChain Team**
