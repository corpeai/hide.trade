"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Terminal, Activity, TrendingUp, Shield, LogOut, Wallet, Zap, Eye, EyeOff, Copy, Check } from "lucide-react"
import { TradeTab } from "@/components/trade-tab"
import { DepositTab } from "@/components/deposit-tab"
import { WithdrawTab } from "@/components/withdraw-tab"
import { HistoryTab } from "@/components/history-tab"
import { AuthScreen } from "@/components/auth-screen"
import { ToastProvider, useToast } from "@/components/toast-container"

function AppContent() {
  const [activeTab, setActiveTab] = useState<"trade" | "deposit" | "withdraw" | "history">("trade")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string; depositAddress: string; telegram?: string } | null>(null)
  const [balance, setBalance] = useState("0.00")
  const [isLoading, setIsLoading] = useState(true)
  const [solPrice, setSolPrice] = useState(0)
  const [usdValue, setUsdValue] = useState("0.00")
  const [showAddress, setShowAddress] = useState(false)
  const [copied, setCopied] = useState(false)
  const { addToast } = useToast()

  const checkDeposit = useCallback(async () => {
    if (!user?.username || !user?.depositAddress) return

    try {
      const url = `/api/deposit/monitor?address=${encodeURIComponent(user.depositAddress)}`
      const response = await fetch(url, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()

        if (data.deposited && data.amount > 0) {
          await fetchBalance()

          addToast({
            type: "success",
            title: "Deposit Processed!",
            message: `${data.amount.toFixed(4)} SOL processed through Hide Protocol`,
          })
        }
      }
    } catch (error) {
      console.error("Deposit monitoring failed:", error)
    }
  }, [user?.username, user?.depositAddress, addToast])

  useEffect(() => {
    if (isAuthenticated && user?.username) {
      console.log("[v0] CLIENT: Starting continuous deposit monitoring")
      checkDeposit()
      const interval = setInterval(checkDeposit, 30000)
      return () => {
        console.log("[v0] CLIENT: Stopping deposit monitoring")
        clearInterval(interval)
      }
    }
  }, [isAuthenticated, user?.username, checkDeposit])

  useEffect(() => {
    checkAuth()
    fetchSolPrice()
  }, [])

  const fetchSolPrice = async () => {
    try {
      const res = await fetch("/api/sol-price")
      const data = await res.json()
      if (data.price) {
        setSolPrice(data.price)
        console.log("[v0] SOL price fetched:", data.price)
      }
    } catch (error) {
      console.error("[v0] SOL price fetch failed:", error)
    }
  }

  useEffect(() => {
    if (solPrice > 0 && balance) {
      const balanceNum = Number.parseFloat(balance)
      const usd = balanceNum * solPrice
      setUsdValue(usd.toFixed(2))
      console.log("[v0] USD value calculated:", usd.toFixed(2))
    }
  }, [balance, solPrice])

  const fetchBalance = async () => {
    if (!user?.username) return

    try {
      const res = await fetch(`/api/balance?username=${encodeURIComponent(user.username)}`)
      const data = await res.json()
      if (data.sol !== undefined) {
        setBalance(data.sol.toFixed(2))
        console.log("[v0] Balance updated:", data.sol)
      }
    } catch (error) {
      console.error("[v0] Balance fetch failed:", error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance()
      const interval = setInterval(fetchBalance, 5000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, user?.username])

  useEffect(() => {
    const interval = setInterval(fetchSolPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      })
      const data = await res.json()

      if (data.authenticated) {
        setIsAuthenticated(true)
        setUser({
          username: data.username,
          depositAddress: data.depositAddress,
          telegram: data.telegram,
        })
        localStorage.setItem("username", data.username)
        await fetchBalance()
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setIsAuthenticated(false)
      setUser(null)
      setBalance("0.00")
      localStorage.removeItem("username")
      console.log("[v0] Username removed from localStorage")
    } catch (error) {
      console.error("[v0] Logout failed:", error)
    }
  }

  const handleResetWallet = async () => {
    if (
      !confirm("Are you sure you want to generate a new deposit address? Your current address will be invalidated.")
    ) {
      return
    }

    try {
      const res = await fetch("/api/wallet/reset", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()

      if (data.success) {
        setUser((prev) => (prev ? { ...prev, depositAddress: data.depositAddress } : null))
        alert(
          `New deposit address generated!\n\nAddress: ${data.depositAddress}\n\nPrivate Key: ${data.privateKey}\n\nSave your private key securely!`,
        )
      }
    } catch (error) {
      console.error("Wallet reset failed:", error)
      alert("Failed to reset deposit address")
    }
  }

  const copyAddress = async () => {
    if (user?.depositAddress) {
      await navigator.clipboard.writeText(user.depositAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const tabs = [
    { id: "trade" as const, label: "Trade", icon: TrendingUp },
    { id: "deposit" as const, label: "Deposit", icon: Terminal },
    { id: "withdraw" as const, label: "Withdraw", icon: Shield },
    { id: "history" as const, label: "History", icon: Activity },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="text-primary/60 font-mono text-sm">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,65,0.05),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative z-10">
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                <div className="w-9 h-9 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-lg flex items-center justify-center group-hover:border-primary/50 transition-all">
                  <span className="text-primary font-mono text-lg font-bold">H</span>
                </div>
                <span className="font-mono text-lg font-semibold tracking-tight">
                  Hide<span className="text-primary">.</span>
                </span>
              </Link>

              {isAuthenticated && user && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    href="/portfolio"
                    className="px-3 sm:px-4 py-2 border border-white/10 rounded-lg font-mono text-xs sm:text-sm hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline">Portfolio</span>
                  </Link>
                  <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="font-mono text-xs text-primary/80">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2 border border-white/10 rounded-lg font-mono text-xs sm:text-sm hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {!isAuthenticated ? (
            <AuthScreen onAuthSuccess={checkAuth} />
          ) : (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Balance Card */}
                <div className="lg:col-span-2">
                  <div className="p-6 sm:p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm text-zinc-400 font-mono">Available Balance</p>
                        </div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <p className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
                            {balance}
                          </p>
                          <p className="text-xl sm:text-2xl font-mono text-zinc-500">SOL</p>
                        </div>
                        <p className="text-lg sm:text-xl font-mono text-primary/70">≈ ${usdValue}</p>
                      </div>
                      <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                          <span className="text-xs font-mono text-primary">LIVE</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-primary/50 to-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Deposit Address Card */}
                <div className="p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl shadow-2xl flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-zinc-400 font-mono">Deposit Address</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="relative">
                      <div className="p-4 bg-black/50 border border-white/10 rounded-lg font-mono text-xs break-all">
                        {showAddress ? (
                          <span className="text-primary/90">{user?.depositAddress}</span>
                        ) : (
                          <span className="text-zinc-600">{"•".repeat(44)}</span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setShowAddress(!showAddress)}
                          className="p-2 bg-zinc-900/90 border border-white/10 rounded hover:bg-zinc-800 transition-all"
                        >
                          {showAddress ? (
                            <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          )}
                        </button>
                        {showAddress && (
                          <button
                            onClick={copyAddress}
                            className="p-2 bg-zinc-900/90 border border-white/10 rounded hover:bg-zinc-800 transition-all"
                          >
                            {copied ? (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 p-1.5 border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2.5 font-mono text-sm font-medium transition-all rounded-lg flex items-center justify-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-primary text-black shadow-lg"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="min-h-[600px]">
                {activeTab === "trade" && <TradeTab />}
                {activeTab === "deposit" && (
                  <DepositTab walletAddress={user?.depositAddress || ""} username={user?.username || ""} />
                )}
                {activeTab === "withdraw" && (
                  <WithdrawTab
                    balance={balance}
                    onWithdraw={(newBalance) => setBalance(newBalance)}
                    showToast={(message, type, txId) =>
                      addToast({ type, title: type === "success" ? "Success" : "Error", message, txId })
                    }
                  />
                )}
                {activeTab === "history" && <HistoryTab />}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function AppPage() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
