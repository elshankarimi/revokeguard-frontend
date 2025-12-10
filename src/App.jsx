import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '[@web3modal](https://farcaster.xyz/web3modal)/wagmi/react';
import { useCheckApprovals, useRevokeApproval } from '.[/utils](https://farcaster.xyz/~/channel/utils)/wagmiHooks';

function App() {
  const { address, isConnected, chain } = useAccount();
  const { open } = useWeb3Modal();
  const { approvals, isLoading, scanForApprovals } = useCheckApprovals();
  const { revokeApproval, isRevoking } = useRevokeApproval();

  return (
    <div className="container">
      {/* لوگو */}
      <div className="logo-container">
        <img
          className="logo-img"
          src="https://neynar-internal-mcp.s3.us-east-1.amazonaws.com/temp/1765359918661-neynar-mcp.png"
          alt="RevokeGuard Shield Logo"
        />
      <[/div](https://farcaster.xyz/~/channel/div)>
      <header>
        <h1>RevokeGuard<[/h1](https://farcaster.xyz/~/channel/h1)>
        <p>Your DeFi Approval Manager<[/p](https://farcaster.xyz/~/channel/p)>
      <[/header](https://farcaster.xyz/~/channel/header)>
      {/* کیف پول */}
      <div className="wallet-area">
        {isConnected ? (
          <w3m-button />
        ) : (
          <button onClick={() => open()} className="connect-button">
            Connect Wallet
          <[/button](https://farcaster.xyz/~/channel/button)>
        )}
            <[/div](https://farcaster.xyz/~/channel/div)>

      {/* بخش اصلی هنگامی که متصل هست */}
      {isConnected && address && (
        <div className="app-content">
          <h2>Approvals Scanner<[/h2](https://farcaster.xyz/~/channel/h2)>
          <p>
            Connected: <strong>{address.slice(0, 6)}...{address.slice(-4)}<[/strong](https://farcaster.xyz/~/channel/strong)> on <strong>{chain?.name || "Unknown Network"}<[/strong](https://farcaster.xyz/~/channel/strong)>.
          <[/p](https://farcaster.xyz/~/channel/p)>

          <button
            className="scan-button"
            onClick={scanForApprovals}
            disabled={isLoading || isRevoking}
          >
            {isLoading ? 'Scanning...' : 'Scan Approvals'}
          <[/button](https://farcaster.xyz/~/channel/button)>

          <div className="result-area approvals-list">
            {/* نمایش نتایج اسکن */}
            {isLoading && <p>Scanning for approvals. Please wait...<[/p](https://farcaster.xyz/~/channel/p)>}

            {approvals.length > 0 ? (
              approvals.map((approval, index) => (
                <div key={index} className="approval-item">
                  <div>
                    <strong>Token:<[/strong](https://farcaster.xyz/~/channel/strong)> {approval.token} ({approval.amount.toString()})<br />
                    <strong>Spender:<[/strong](https://farcaster.xyz/~/channel/strong)> {approval.spender.slice(0, 6)}...{approval.spender.slice(-4)}
                  <[/div](https://farcaster.xyz/~/channel/div)>
                  <button
                    onClick={() => revokeApproval(approval)}
                    disabled={isRevoking}
                  >
                    {isRevoking ? 'Revoking...' : 'Revoke'}
                  <[/button](https://farcaster.xyz/~/channel/button)>
                <[/div](https://farcaster.xyz/~/channel/div)>
              ))
            ) : (
              !isLoading && <p>No high-risk approvals found.<[/p](https://farcaster.xyz/~/channel/p)>
            )}
          <[/div](https://farcaster.xyz/~/channel/div)>
        <[/div](https://farcaster.xyz/~/channel/div)>
      )}
    <[/div](https://farcaster.xyz/~/channel/div)>
  );
}

export default App;
