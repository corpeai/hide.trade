"use client"

interface WalletConnectProps {
  isConnected: boolean
  onConnect: () => void
  balance: string
}

export function WalletConnect({ isConnected, onConnect, balance }: WalletConnectProps) {
  if (!isConnected) {
    return (
      <button
        onClick={onConnect}
        className="px-6 py-2 bg-primary text-black font-mono font-bold rounded hover:bg-primary/90 transition-colors"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xs text-gray-400 font-mono">Balance</p>
        <p className="text-sm font-mono font-bold text-primary">{balance} SOL</p>
      </div>
      <div className="px-4 py-2 bg-primary/10 border border-primary rounded font-mono text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>7x8k...9mPq</span>
        </div>
      </div>
    </div>
  )
}
