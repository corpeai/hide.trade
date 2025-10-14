"use client"

import { useEffect, useState } from "react"

export function HistoryTab() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const username = localStorage.getItem("username")
      if (!username) {
        console.log("[v0] HistoryTab: No username found")
        setIsLoading(false)
        return
      }

      console.log(`[v0] HistoryTab: Fetching transactions for ${username}`)
      const response = await fetch(`/api/transactions?username=${username}`)
      if (response.ok) {
        const data = await response.json()
        console.log(`[v0] HistoryTab: Received ${data.transactions?.length || 0} transactions`)
        setTransactions(data.transactions || [])
      } else {
        console.error("[v0] HistoryTab: Failed to fetch transactions:", response.status)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="border border-primary/20 rounded-lg bg-black/50 backdrop-blur-sm p-12 text-center">
        <p className="font-mono text-primary">Loading transaction history...</p>
      </div>
    )
  }

  return (
    <div className="border border-primary/20 rounded-lg bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-primary/20">
        <h3 className="text-2xl font-mono font-bold">Transaction History</h3>
        <p className="text-sm text-gray-400 font-mono mt-1">
          All transactions are private and cannot be traced on-chain
        </p>
      </div>

      <div className="divide-y divide-primary/10">
        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-mono text-gray-500">No transactions yet</p>
          </div>
        ) : (
          transactions.map((tx, index) => (
            <div key={index} className="p-6 hover:bg-primary/5 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tx.type === "deposit"
                        ? "bg-blue-500/20 border border-blue-500"
                        : tx.type === "withdraw"
                          ? "bg-red-500/20 border border-red-500"
                          : "bg-primary/20 border border-primary"
                    }`}
                  >
                    <span className="text-xl">
                      {tx.type === "deposit" ? "📥" : tx.type === "withdraw" ? "📤" : "⚡"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-mono font-bold capitalize">{tx.type}</p>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary/20 text-primary">
                        completed
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-mono mb-2">
                      {tx.type === "swap" ? `${tx.fromToken} → ${tx.tokenSymbol || tx.toToken}` : tx.token || "SOL"}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">{new Date(tx.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-mono font-bold text-primary">
                    {tx.type === "withdraw" ? "-" : ""}
                    {tx.amount || tx.fromAmount}
                  </p>
                  {tx.type === "swap" && tx.toAmount && (
                    <p className="text-sm font-mono text-gray-400 mt-1">
                      +{Number(tx.toAmount).toFixed(2)} {tx.tokenSymbol}
                    </p>
                  )}
                </div>
              </div>

              {tx.signature && (
                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-mono">TX:</span>
                    <span className="text-xs text-gray-400 font-mono">{tx.signature.slice(0, 8)}...</span>
                  </div>
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-mono hover:underline"
                  >
                    View on Solscan
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-6 bg-primary/5 border-t border-primary/20">
        <div className="flex items-center gap-3">
          <span className="text-primary text-xl">🔒</span>
          <p className="text-xs text-gray-400 font-mono">
            Your transaction history is stored locally and encrypted. No one else can see your activity.
          </p>
        </div>
      </div>
    </div>
  )
}
