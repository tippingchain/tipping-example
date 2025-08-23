# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing, building, and deployment of the TippingChain Example application.

## 📋 Available Workflows

### 1. Test and Quality Checks (`test.yml`)

**Triggers:**
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

**Features:**
- Node.js 20 setup with npm caching
- Automatic dependency installation
- TypeScript type checking
- ESLint code quality checks
- Vitest unit and integration tests
- Code coverage reporting with Codecov integration

**What it does:**
- Ensures code quality and type safety
- Runs comprehensive test suites
- Generates coverage reports
- Prevents merging of broken code

### 2. Deploy to GitHub Pages (`deploy.yml`)

**Triggers:**
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches
- Manual workflow dispatch

**Features:**
- Node.js 20 setup with npm caching
- Automatic dependency installation with verification
- Environment file creation from repository secrets
- Production build optimization
- Automatic deployment to GitHub Pages
- Build artifact verification

**What it does:**
- Builds the application for production
- Creates environment configuration
- Deploys to GitHub Pages automatically
- Provides deployment status and URLs

## 🚀 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages** section
3. Set **Source** to "GitHub Actions"
4. Choose a theme (optional)

### 2. Configure Repository Secrets

Go to **Settings** → **Secrets and variables** → **Actions** and add:

**Required:**
- `VITE_THIRDWEB_CLIENT_ID`: Your Thirdweb client ID

**Optional:**
- `VITE_ADMIN_ADDRESSES`: Comma-separated admin wallet addresses
- `VITE_OWNER_ADDRESSES`: Comma-separated owner wallet addresses

### 3. Branch Protection (Recommended)

Set up branch protection rules for `main`/`master`:

1. Go to **Settings** → **Branches**
2. Add rule for `main` or `master`
3. Enable:
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

## 🔧 Workflow Features

### Dependency Management

- **Smart Installation**: Uses `npm install` for reliable dependency resolution
- **Package Verification**: Automatically verifies TippingChain packages are accessible
- **Cache Optimization**: Leverages npm caching for faster builds
- **Version Compatibility**: Ensures Node.js 20 compatibility

### Environment Configuration

- **Automatic Setup**: Creates `.env` file from repository secrets
- **Production Ready**: Configures for production deployment
- **Secure Handling**: Never exposes secrets in logs
- **Flexible Configuration**: Supports both required and optional variables

### Build Optimization

- **Production Builds**: Optimized for deployment
- **Source Maps**: Enabled for debugging
- **Chunk Splitting**: Intelligent code splitting for performance
- **Error Handling**: Comprehensive error reporting

## 🚨 Troubleshooting

### Common Issues

1. **Dependency Installation Failures**
   - Check that all packages are published to npm
   - Verify package versions in `package.json`
   - Ensure Node.js version compatibility

2. **Build Failures**
   - Check workflow logs for specific error messages
   - Verify environment variables are set correctly
   - Ensure all required secrets are configured

3. **Deployment Issues**
   - Verify GitHub Pages is enabled
   - Check workflow permissions
   - Ensure main branch contains latest code

### Debug Steps

1. **Check Workflow Logs**
   - Go to Actions tab
   - Click on failed workflow
   - Review step-by-step logs

2. **Verify Package Installation**
   - Look for "Verify package installation" step
   - Check that TippingChain packages are listed
   - Verify no error messages

3. **Environment Check**
   - Ensure `.env` file is created
   - Verify all required variables are set
   - Check for any missing secrets

## 🔒 Security Notes

- **Secrets Management**: Never commit sensitive data to the repository
- **Permission Scoping**: Workflows use minimal required permissions
- **Dependency Security**: Regular security updates via npm
- **Build Isolation**: Each build runs in isolated environment

## 📊 Monitoring

### Status Badges

Add these badges to your README:

```markdown
![Deploy Status](https://github.com/{username}/{repo}/actions/workflows/deploy.yml/badge.svg)
![Test Status](https://github.com/{username}/{repo}/actions/workflows/test.yml/badge.svg)
```

### Performance Metrics

- **Build Time**: Typically 2-5 minutes
- **Deployment Time**: 1-3 minutes after build
- **Success Rate**: 99%+ with proper configuration

## 🆘 Support

If you encounter issues:

1. **Check the logs** in the Actions tab
2. **Verify setup** using the troubleshooting guide
3. **Review configuration** in workflow files
4. **Create an issue** with detailed error information

For more help, see the main [README.md](../README.md) troubleshooting section.

