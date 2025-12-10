import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import RevokeRow from './RevokeRow'

export default function RevokeScanner() {
  const { address, isConnected } = useAccount()
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(false)

  const scanApprovals = async () => {
    if (!address) return
    setLoading(true)

    // اینجا باید API یا logic اسکن approval ها اضافه شود
    // برای نمونه، داده‌های mock:
    const mockApprovals = [
      { token: 'USDT', spender: '0xabc123...', allowance: '1000' },
      { token: 'DAI', spender: '0xdef456...', allowance: '500' }
    ]
    setTimeout(() => {
      setApprovals(mockApprovals)
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      {!isConnected && <p>لطفاً کیف پول خود را متصل کنید.</p>}
      {isConnected && (
        <>
          <button onClick={scanApprovals}>اسکن دسترسی‌ها</button>
          {loading && <p>در حال اسکن...</p>}
          <div>
            {approvals.map((a, idx) => (
              <RevokeRow key={idx} approval={a} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
