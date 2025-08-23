# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the TippingChain Demo Application.

## Workflows

### 1. `deploy.yml` - GitHub Pages Deployment
Automatically builds and deploys the application to GitHub Pages when code is pushed to the main branch.

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Manual workflow dispatch

**Features:**
- Node.js 20 setup with npm caching
- Automatic dependency installation
- Environment file creation from secrets
- Application build and optimization
- GitHub Pages deployment

### 2. `test.yml` - Quality Assurance
Runs tests, type checking, and linting on all code changes.

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

**Features:**
- TypeScript type checking
- ESLint code quality checks
- Test execution with coverage
- Codecov integration for coverage reports

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"

### 2. Configure Repository Secrets
Add these secrets in your repository Settings → Secrets and variables → Actions:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `VITE_THIRDWEB_CLIENT_ID` | Your Thirdweb client ID | ✅ Yes |
| `VITE_ADMIN_ADDRESSES` | Comma-separated admin wallet addresses | ❌ No |
| `VITE_OWNER_ADDRESSES` | Comma-separated owner wallet addresses | ❌ No |

### 3. Set Branch Protection (Recommended)
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select the "Test and Quality Checks" workflow

## Environment Variables

The deployment workflow automatically creates a `.env` file with these values:

```bash
VITE_THIRDWEB_CLIENT_ID=<from_secret>
VITE_ENVIRONMENT=production
VITE_USE_TESTNET=false
VITE_DEFAULT_CHAIN_ID=8453
VITE_DEMO_CREATOR_ID=1
VITE_DEMO_CREATOR_WALLET=0x479945d7931baC3343967bD0f839f8691E54a66e
VITE_ADMIN_ADDRESSES=<from_secret_or_empty>
VITE_OWNER_ADDRESSES=<from_secret_or_empty>
```

## Manual Deployment

To manually trigger a deployment:

1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## Troubleshooting

### Build Failures
- Check that all dependencies are properly installed
- Verify environment variables are set correctly
- Check build logs for specific error messages

### Deployment Issues
- Ensure GitHub Pages is enabled and set to "GitHub Actions"
- Verify repository has proper permissions
- Check that the main branch contains the latest code

### Test Failures
- Run tests locally with `npm test`
- Check for TypeScript compilation errors
- Verify all dependencies are up to date

## Security Notes

- Never commit sensitive information like API keys
- Use repository secrets for all sensitive configuration
- Regularly rotate API keys and secrets
- Review workflow permissions and adjust as needed

