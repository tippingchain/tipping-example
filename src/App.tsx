import { useState, useEffect } from 'react';
import { StreamingPage, ApeChainTippingInterface, ViewerRewardStats, TransactionStatusMessage, Button } from '@tippingchain/ui-react';
import { ApeChainTippingSDK } from '@tippingchain/sdk';
import type { TipParams, TipResult } from '@tippingchain/sdk';
import { getContractAddress, SUPPORTED_CHAINS } from '@tippingchain/contracts-interface';
import './App.css';

import { useActiveAccount, ConnectButton } from 'thirdweb/react';

function App() {
  const [sdk, setSdk] = useState<ApeChainTippingSDK | null>(null);
  const [tipResult, setTipResult] = useState<TipResult | null>(null);
  const [isTipping, setIsTipping] = useState(false);
  const [tipAmount, setTipAmount] = useState<string>('');
  const [isEth, setIsEth] = useState<boolean>(true);
  const account = useActiveAccount(); // Adjusted to use the correct hook
  const address = account?.address || ''; // Extract address from account

  // Initialize SDK for Base network
  useEffect(() => {
    const initializeSdk = async () => {
      // Hardcode Base chain ID as SUPPORTED_CHAINS might be an object
      const baseChainId = 8453; // Base chain ID as per earlier error context
      const config = {
        environment: import.meta.env.VITE_ENVIRONMENT || 'production',
        chainId: Number(import.meta.env.VITE_CHAIN_ID) || baseChainId,
        contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || getContractAddress(baseChainId) || '',
        clientId: import.meta.env.VITE_CLIENT_ID || 'placeholder-client-id', // Fallback to placeholder if not set
        endpoints: {
          relayApi: import.meta.env.VITE_RELAY_API_URL || 'https://api.relay.link', // Fallback to placeholder if not set
        },
      };

      const tippingSdk = new ApeChainTippingSDK(config);
      setSdk(tippingSdk);
    };

    initializeSdk();
  }, []);

  const handleTip = async () => {
    if (!sdk || !address || !tipAmount) {
      alert('Please connect your wallet and enter a tip amount');
      return;
    }

    setIsTipping(true);
    try {
      const amount = parseFloat(tipAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Invalid tip amount');
        setIsTipping(false);
        return;
      }

      const tipParams: TipParams = {
        sourceChainId: 8453, // Base chain ID as number
        creatorId: 1, // Placeholder numeric value for creator ID; adjust based on SDK
        amount: amount.toString(), // Convert to string to match expected type
        token: isEth ? '0' : '1', // Placeholder string values for ETH ('0') and USD/stablecoin ('1'); adjust based on SDK token IDs
      };

      // Assuming a method like sendTip or similar exists; adjust based on SDK
      const result = await sdk.sendTip(tipParams); // Placeholder for actual method
      setTipResult(result);
    } catch (error) {
      console.error('Tipping failed:', error);
      alert('Tipping failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsTipping(false);
    }
  };

  // Using ConnectButton component directly for wallet connection

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <ConnectButton client={{ clientId: import.meta.env.VITE_CLIENT_ID || 'placeholder-client-id', secretKey: import.meta.env.VITE_SECRET_KEY || 'placeholder-secret-key' }} />
      </div>
      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <img src="/tippingchain.png" alt="Stream Thumbnail" style={{ maxWidth: '200px' }} />
        <h1>Streaming Demo</h1>
        <p>Viewers: 123</p>
      </div>
      <div className="tipping-container" style={{ marginTop: '20px' }}>
        <h2>Tip the Streamer</h2>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tipAmount">Amount:</label>
          <input
            id="tipAmount"
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder={isEth ? 'ETH Amount' : 'USD Amount'}
            style={{ marginRight: '10px' }}
          />
          <Button onClick={() => setIsEth(!isEth)}>
            {isEth ? 'Switch to USD' : 'Switch to ETH'}
          </Button>
        </div>
        {/* Simplified tipping interface usage */}
        <Button onClick={handleTip} disabled={isTipping || !sdk || !address}>
          {isTipping ? 'Tipping...' : 'Tip Now'}
        </Button>
        {tipResult && (
          <>
            {/* Simplified status message */}
            <p>Status: {JSON.stringify(tipResult)}</p>
            {/* Display contract split details */}
            <div style={{ marginTop: '15px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <h3>Contract Split Details</h3>
              <p>Creator: 80% of tip amount</p>
              <p>Platform: 15% of tip amount</p>
              <p>Viewer Rewards: 5% of tip amount</p>
              <p>Note: These are placeholder values and should be updated based on actual contract logic.</p>
            </div>
            {/* Display viewer splits if successful */}
            {/* ViewerRewardStats component usage commented out due to prop issues */}
          </>
        )}
        {!address && <p>Please connect your wallet to tip.</p>}
      </div>
    </div>
  );
}

export default App;
