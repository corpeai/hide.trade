"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

interface WithdrawTabProps {
  balance: string
  onWithdraw: (newBalance: string) => void
  showToast?: (message: string, type: "success" | "error" | "info", txId?: string) => void
}

export function WithdrawTab({ balance, onWithdraw, showToast }: WithdrawTabProps) {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [realBalance, setRealBalance] = useState<any>(null)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      const username = localStorage.getItem("username")
      if (!username) {
        console.error("[v0] No username found in localStorage")
        return
      }

      const response = await fetch(`/api/balance?username=${username}`)
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Withdraw: Balance fetched:", data)
        setRealBalance(data)
      } else {
        console.error("[v0] Failed to fetch balance:", response.status)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch balance:", error)
    }
  }

  const availableBalance = realBalance ? realBalance.sol : 0

  const platformFee = amount ? Number.parseFloat(amount) * 0.005 : 0
  const networkFee = 0.000005
  const totalFees = platformFee + networkFee
  const amountAfterFees = amount ? Number.parseFloat(amount) - totalFees : 0

  const handleWithdraw = async () => {
    if (!amount || !recipient) return

    if (recipient.length < 32 || recipient.length > 44) {
      showToast?.("Please enter a valid Solana wallet address", "error")
      return
    }

    const username = localStorage.getItem("username")
    if (!username) {
      showToast?.("Please log in to withdraw funds", "error")
      return
    }

    setIsWithdrawing(true)
    try {
      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          amount: Number.parseFloat(amount),
          recipient: recipient.trim(),
          platformFee,
          totalAmount: amountAfterFees,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        showToast?.(
          `Withdrawal request submitted! Processing - Estimated arrival time: Less than 10 minutes. Request ID: ${data.requestId}`,
          "success",
        )
        setAmount("")
        setRecipient("")
        fetchBalance()
      } else {
        const error = await response.json()
        showToast?.(`Withdrawal failed: ${error.error}`, "error")
      }
    } catch (error) {
      console.error("[v0] Withdrawal failed:", error)
      showToast?.("Withdrawal failed. Please try again.", "error")
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-primary/20 rounded-lg bg-black/50 backdrop-blur-sm p-8">
        <h3 className="text-2xl font-mono font-bold mb-6">Withdraw Funds</h3>

        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300 font-mono">
              <p className="mb-2">Withdraw your SOL to any Solana wallet address.</p>
              <p>Processing time: Less than 10 minutes</p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-black/50 border border-primary/20 rounded">
          <p className="text-sm text-gray-400 font-mono mb-1">Available Balance</p>
          <p className="text-3xl font-mono font-bold text-primary">{availableBalance.toFixed(6)} SOL</p>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400 font-mono mb-2 block">Withdrawal Amount (SOL)</label>
          <div className="p-4 border border-primary/20 rounded bg-black/50">
            <input
              type="text"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-3xl font-mono font-bold outline-none w-full"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setAmount((availableBalance * 0.25).toFixed(6))}
                className="px-3 py-1 bg-primary/10 text-primary rounded font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                25%
              </button>
              <button
                onClick={() => setAmount((availableBalance * 0.5).toFixed(6))}
                className="px-3 py-1 bg-primary/10 text-primary rounded font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                50%
              </button>
              <button
                onClick={() => setAmount((availableBalance * 0.75).toFixed(6))}
                className="px-3 py-1 bg-primary/10 text-primary rounded font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                75%
              </button>
              <button
                onClick={() => setAmount(availableBalance.toFixed(6))}
                className="px-3 py-1 bg-primary/10 text-primary rounded font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400 font-mono mb-2 block">Recipient Wallet Address</label>
          <input
            type="text"
            placeholder="Enter Solana wallet address..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-4 border border-primary/20 rounded bg-black/50 font-mono text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mb-6 p-4 bg-black/50 border border-primary/20 rounded space-y-2">
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Withdrawal Amount</span>
            <span>{amount || "0.00"} SOL</span>
          </div>
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Platform Fee (0.5%)</span>
            <span>{platformFee.toFixed(6)} SOL</span>
          </div>
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Network Fee</span>
            <span>{networkFee.toFixed(6)} SOL</span>
          </div>
          <div className="border-t border-primary/20 pt-2 flex justify-between font-mono font-bold">
            <span>Total Amount</span>
            <span className="text-primary">{amountAfterFees.toFixed(6)} SOL</span>
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!amount || !recipient || isWithdrawing || Number.parseFloat(amount) <= 0}
          className="w-full px-6 py-4 bg-primary text-black font-mono font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWithdrawing ? "PROCESSING..." : "Submit Withdrawal Request"}
        </button>

        <div className="mt-6 p-4 bg-black/50 border border-primary/20 rounded">
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">⏱️</span>
            <div className="text-xs text-gray-400 font-mono">
              <p className="mb-2 font-bold text-white">Processing Time</p>
              <p>Your withdrawal will be processed and sent to your wallet address.</p>
              <p className="mt-1 text-primary">Estimated arrival time: Less than 10 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
