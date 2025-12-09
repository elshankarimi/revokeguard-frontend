import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'; // 👈 ایمپورت هوک Web3Modal

// وارد کردن هوک‌های منطقی جدید
import { useCheckApprovals, useRevokeApproval } from './utils/wagmiHooks'; 

function App() {
  const { address, isConnected, chain } = useAccount();
  
  // فراخوانی هوک Web3Modal برای دسترسی به تابع open()
  const { open } = useWeb3Modal(); 
  
  // استفاده از هوک‌های سفارشی
  const { approvals, isLoading, scanForApprovals } = useCheckApprovals(); 
  const { revokeApproval, isRevoking } = useRevokeApproval();
  
  return (
    <div className="container">
      <header>
        <h1>RevokeGuard</h1>
        <p>Your DeFi Approval Manager</p>
      </header>
      
      {/* ناحیه اتصال کیف پول */}
      <div className="wallet-area">
        {isConnected ? (
            // w3m-button کامپوننت دکمه اتصال/قطع Web3Modal است
            <w3m-button />
        ) : (
            // اتصال مستقیم تابع open() به onClick برای باز کردن مودال
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
