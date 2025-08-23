# GitHub Actions Status Badges

Add these badges to your README.md to show the status of your workflows:

## Deployment Status

```markdown
[![Deploy to GitHub Pages](https://github.com/{username}/{repo-name}/actions/workflows/deploy.yml/badge.svg)](https://github.com/{username}/{repo-name}/actions/workflows/deploy.yml)
```

## Test Status

```markdown
[![Test and Quality Checks](https://github.com/{username}/{repo-name}/actions/workflows/test.yml/badge.svg)](https://github.com/{username}/{repo-name}/actions/workflows/test.yml)
```

## Combined Status

```markdown
[![Deploy to GitHub Pages](https://github.com/{username}/{repo-name}/actions/workflows/deploy.yml/badge.svg)](https://github.com/{username}/{repo-name}/actions/workflows/deploy.yml)
[![Test and Quality Checks](https://github.com/{username}/{repo-name}/actions/workflows/test.yml/badge.svg)](https://github.com/{username}/{repo-name}/actions/workflows/test.yml)
```

## Example Usage

Replace `{username}` and `{repo-name}` with your actual GitHub username and repository name:

```markdown
# TippingChain Demo Application

[![Deploy to GitHub Pages](https://github.com/tippingchain/tipping-example/actions/workflows/deploy.yml/badge.svg)](https://github.com/tippingchain/tipping-example/actions/workflows/deploy.yml)
[![Test and Quality Checks](https://github.com/tippingchain/tipping-example/actions/workflows/test.yml/badge.svg)](https://github.com/tippingchain/tipping-example/actions/workflows/test.yml)

A complete demo application showcasing the TippingChain platform...
```

## Badge Colors

- 🟢 **Green**: All checks passing
- 🟡 **Yellow**: Some checks failing
- 🔴 **Red**: All checks failing
- ⚪ **Gray**: No recent runs

## Note

Badges will only appear after the first workflow run. If you haven't pushed any code yet, the badges may show as broken links initially.

