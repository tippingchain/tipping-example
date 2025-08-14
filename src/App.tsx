import { useState, useEffect } from 'react';
import { StreamingPage, ApeChainTippingInterface, ViewerRewardStats, TransactionStatusMessage, Button } from '@tippingchain/ui-react';
import { ApeChainTippingSDK } from '@tippingchain/sdk';
import type { TipParams, TipResult } from '@tippingchain/sdk';
import { getContractAddress, SUPPORTED_CHAINS } from '@tippingchain/contracts-interface';
import './App.css';

import { useActiveAccount } from 'thirdweb/react'; // Trying a different hook based on thirdweb docs

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
        environment: 'production' as const, // Fixed to use literal type
        chainId: baseChainId,
        contractAddress: getContractAddress(baseChainId) || '', // Adjusted argument based on error
        clientId: 'placeholder-client-id', // Added required field
        endpoints: {
          relayApi: 'https://api.relay.link',
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

  return (
    <div>
      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Streaming Demo</h1>
        <p>Streamer: Demo Streamer</p>
        <p>Stream Title: Live Streaming Demo</p>
        <p>Viewers: 123</p>
        <img src="/vite.svg" alt="Stream Thumbnail" style={{ maxWidth: '200px' }} />
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
