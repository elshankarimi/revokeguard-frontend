import React from 'react'
import { revokeApproval } from './revokeScanner'

export default function RevokeRow({ approval, signer }) {
  const handleRevoke = async () => {
    if (!signer) {
      alert('ابتدا کیف پول را متصل کنید')
      return
    }

    try {
      // آدرس توکن واقعی باید اضافه شود، فعلاً mock
      const tokenAddress = '0xYourTokenAddressHere'
      const txHash = await revokeApproval(tokenAddress, approval.spender, signer)
      alert(`دسترسی ${approval.token} لغو شد. Tx: ${txHash}`)
    } catch (err) {
      console.error(err)
      alert('خطا در لغو دسترسی')
    }
  }

  return (
    <div className="card" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
      <p>توکن: {approval.token}</p>
      <p>Spender: {approval.spender}</p>
      <p>Allowance: {approval.allowance}</p>
      <button onClick={handleRevoke}>لغو دسترسی</button>
    </div>
  )
}
