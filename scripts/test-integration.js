// Test script to verify integration with new contracts
import { getContractAddress, isContractDeployed } from '@tippingchain/contracts-interface';

console.log('\n🔍 Testing Integration with New Contracts\n');

// Test Holesky (source chain)
const holeskyChainId = 17000;
const holeskyAddress = getContractAddress(holeskyChainId, true);
const holeskyDeployed = isContractDeployed(holeskyChainId, true);

console.log(`🌐 Holesky Testnet (${holeskyChainId}):`);
console.log(`   📍 Contract Address: ${holeskyAddress}`);
console.log(`   ✅ Deployed: ${holeskyDeployed}`);

// Test Curtis (destination chain)
const curtisChainId = 33111;
const curtisAddress = getContractAddress(curtisChainId, true);
const curtisDeployed = isContractDeployed(curtisChainId, true);

console.log(`\n🐒 ApeChain Curtis (${curtisChainId}):`);
console.log(`   📍 Contract Address: ${curtisAddress}`);
console.log(`   ✅ Deployed: ${curtisDeployed}`);

// Test expected addresses match
const expectedHolesky = "0xD4CbCE6aE8Fd2c2a3009607FeB6328bF9BBE4223";
const expectedCurtis = "0x2b50C16877a3E262e0D5B9a4B9f7517634Ba27d8";

console.log(`\n✅ Configuration Verification:`);
console.log(`   Holesky matches: ${holeskyAddress === expectedHolesky}`);
console.log(`   Curtis matches: ${curtisAddress === expectedCurtis}`);

if (holeskyDeployed && curtisDeployed) {
  console.log(`\n🎉 All contracts configured correctly!`);
  console.log(`🌉 Ready for end-to-end cross-chain testing`);
  console.log(`📱 Start the demo app with: npm run dev`);
} else {
  console.log(`\n❌ Contract configuration incomplete`);
}