"use client"

import { useState } from "react"
import { Copy, Check, Shield } from "lucide-react"

interface DepositTabProps {
  walletAddress: string
  username: string
}

export function DepositTab({ walletAddress, username }: DepositTabProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-primary/20 rounded-lg bg-black/50 backdrop-blur-sm p-8">
        <h3 className="text-2xl font-mono font-bold mb-6 text-primary">
          <span className="text-white">{">"}</span> DEPOSIT_SOL
        </h3>

        {/* Deposit Address */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 font-mono mb-2 block uppercase tracking-wider flex items-center justify-between">
            {">"} Your One-Time Deposit Address
            <span className="text-xs text-primary/60 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Hide Protocol
            </span>
          </label>
          <div className="flex gap-2">
            <div className="flex-1 p-4 border border-primary/20 rounded bg-black/50 font-mono text-sm break-all text-primary">
              {walletAddress}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-primary/10 border border-primary text-primary rounded hover:bg-primary/20 transition-colors font-mono text-sm font-bold flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/20 border border-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              <span className="text-primary font-mono text-sm font-bold">1</span>
            </div>
            <div>
              <p className="font-mono font-bold mb-1 text-white">Send SOL to Address</p>
              <p className="text-sm text-gray-400 font-mono">Transfer SOL from any wallet to the address above</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/20 border border-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              <span className="text-primary font-mono text-sm font-bold">2</span>
            </div>
            <div>
              <p className="font-mono font-bold mb-1 text-white">Privacy Swap Initiated</p>
              <p className="text-sm text-gray-400 font-mono">
                Hide Protocol smart contracts automatically process your deposit
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/20 border border-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              <span className="text-primary font-mono text-sm font-bold">3</span>
            </div>
            <div>
              <p className="font-mono font-bold mb-1 text-white">Balance Credited</p>
              <p className="text-sm text-gray-400 font-mono">
                Funds appear in your balance after smart contract confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-black/50 border border-primary/20 rounded">
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">🔒</span>
            <div className="text-xs text-gray-400 font-mono leading-relaxed">
              <p className="mb-2 font-bold text-white">Hide Protocol Privacy</p>
              <p className="mb-1">
                Deposits are processed through Hide Protocol smart contracts on Solana for maximum privacy.
              </p>
              <p>
                Your funds are mixed and transferred automatically - no wallet addresses are stored or tracked on-chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
