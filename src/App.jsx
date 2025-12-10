import React from 'react'
import Header from './components/Header'
import WalletConnect from './components/WalletConnect'
import RevokeScanner from './features/revoke/RevokeScanner'

export default function App() {
  return (
    <div className="app" dir="rtl">
      <Header />
      <main className="container">
        <WalletConnect />
        <section className="card">
          <h2>اسکن دسترسی‌ها</h2>
          <p>برای شروع ولت را متصل کن و سپس روی «اسکن» بزن.</p>
          <RevokeScanner />
        </section>
      </main>
    </div>
  )
}
