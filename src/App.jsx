// src/App.jsx (ساختار بازنویسی شده با استفاده از Web3Modal/Wagmi 2)

import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'; // هوک مورد نیاز برای باز کردن مودال

// وارد کردن هوک‌های منطقی شما
import { useCheckApprovals, useRevokeApproval } from './utils/wagmiHooks'; 

function App() {
  const { address, isConnected, chain } = useAccount();
  
  // دسترسی به تابع open() از Web3Modal
  const { open } = useWeb3Modal(); 
  
  // استفاده از هوک‌های سفارشی شما
  const { approvals, isLoading, scanForApprovals } = useCheckApprovals(); 
  const { revokeApproval, isRevoking } = useRevokeApproval();

  return (
    <div className="container">
      <header>
        <h1>RevokeGuard</h1>
        <p>Your DeFi Approval Manager</p>
      </header>
      
      {/* 💡 ناحیه اتصال کیف پول (کامپوننت ConnectWallet حذف شد) */}
      <div className="wallet-area">
        {isConnected ? (
            // دکمه مدیریت کیف پول Web3Modal (اگر متصل باشد)
            <w3m-button />
        ) : (
            // دکمه Connect Wallet (اگر متصل نباشد)
            <button onClick={() => open()} className="connect-button"> 
              Connect Wallet
            </button>
        )}
      </div>

      {isConnected && address && (
        <div className="app-content">
          <h2>Approvals Scanner</h2>
          <p>
            Connected: <strong>{address.slice(0, 6)}...{address.slice(-4)}</strong> on <strong>{chain.name}</strong>.
          </p>

          <button 
            className="scan-button" 
            onClick={scanForApprovals} 
            disabled={isLoading || isRevoking}
          >
            {isLoading ? 'Scanning...' : 'Scan Approvals'}
          </button>
          
          <div className="result-area">
            {/* نمایش نتایج اسکن */}
            {isLoading && <p>Scanning for approvals. Please wait...</p>}

            {approvals.length > 0 ? (
                approvals.map((approval, index) => (
                    <div key={index} className="approval-item">
                        <p>
                            **Token:** {approval.token} ({approval.amount.toString()})<br/>
                            **Spender:** {approval.spender.slice(0, 6)}...{approval.spender.slice(-4)}
                        </p>
                        <button 
                            onClick={() => revokeApproval(approval)} 
                            disabled={isRevoking}
                        >
                            {isRevoking ? 'Revoking...' : 'Revoke'}
                        </button>
                    </div>
                ))
            ) : (
                !isLoading && <p>No high-risk approvals found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
 
