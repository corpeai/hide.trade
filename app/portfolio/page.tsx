"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, Wallet, RefreshCw } from "lucide-react"

interface TokenHolding {
  mint: string
  symbol: string
  name: string
  image: string
  balance: number
  price: number
  value: number
  priceChange24h: number
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<TokenHolding[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
      fetchPortfolio(storedUsername)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchPortfolio = async (user: string) => {
    try {
      setIsLoading(true)
      console.log("[v0] Fetching portfolio for:", user)

      const [balanceRes, tokensRes] = await Promise.all([
        fetch(`/api/balance?username=${encodeURIComponent(user)}`),
        fetch("/api/tokens/pumpfun"),
      ])

      const balanceData = await balanceRes.json()
      const tokensData = await tokensRes.json()

      console.log("[v0] Balance data:", balanceData)
      console.log("[v0] Tokens data:", tokensData)

      const portfolioHoldings: TokenHolding[] = tokensData.tokens.map((token: any) => {
        const balance = balanceData.tokens?.[token.mint] || 0
        const value = balance * token.price
        return {
          mint: token.mint,
          symbol: token.symbol,
          name: token.name,
          image: token.image,
          balance: balance,
          price: token.price,
          value: value,
          priceChange24h: token.priceChange24h || 0,
        }
      })

      setHoldings(portfolioHoldings)

      const total = portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0)
      setTotalValue(total)

      console.log("[v0] Portfolio holdings:", portfolioHoldings)
      console.log("[v0] Total value:", total)
    } catch (error) {
      console.error("[v0] Failed to fetch portfolio:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    if (username) {
      fetchPortfolio(username)
    }
  }

  if (!username) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary font-mono mb-4">Please log in to view your portfolio</p>
          <Link
            href="/app"
            className="px-6 py-3 bg-primary text-black font-mono font-bold rounded hover:bg-primary/80 transition-all inline-block"
          >
            Go to App
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,65,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,255,65,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10">
        <header className="border-b border-primary/30 backdrop-blur-xl bg-black/90">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/app"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-mono text-sm">BACK TO APP</span>
              </Link>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="font-mono text-lg font-bold">PORTFOLIO</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 border border-primary/50 rounded font-mono text-xs hover:bg-primary/20 hover:border-primary transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                REFRESH
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 p-8 border-2 border-primary/40 rounded-lg bg-gradient-to-br from-black via-black to-primary/5 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,65,0.2)]">
            <p className="text-xs text-primary/60 font-mono mb-2 uppercase tracking-widest">TOTAL PORTFOLIO VALUE</p>
            <p className="text-5xl font-mono font-bold text-primary mb-2">${totalValue.toFixed(2)}</p>
            <p className="text-sm font-mono text-primary/60">USD</p>
          </div>

          <div className="border border-primary/30 rounded-lg bg-black/80 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-primary/30 bg-primary/5">
              <h2 className="font-mono font-bold text-primary">TOKEN HOLDINGS</h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-primary/60 font-mono text-sm">Loading portfolio...</p>
              </div>
            ) : holdings.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-primary/60 font-mono">No tokens in portfolio</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="px-4 py-3 text-left text-xs font-mono text-primary/60 uppercase tracking-wider">
                        Token
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-mono text-primary/60 uppercase tracking-wider">
                        Balance
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-mono text-primary/60 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-mono text-primary/60 uppercase tracking-wider">
                        24h Change
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-mono text-primary/60 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => (
                      <tr
                        key={holding.mint}
                        className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={holding.image || "/placeholder.svg"}
                              alt={holding.symbol}
                              className="w-10 h-10 rounded-full border border-primary/30"
                            />
                            <div>
                              <p className="font-mono font-bold text-white">{holding.symbol}</p>
                              <p className="text-xs font-mono text-primary/60">{holding.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="font-mono text-white">
                            {holding.balance.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 6,
                            })}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="font-mono text-primary">
                            $
                            {holding.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 8,
                            })}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div
                            className={`flex items-center justify-end gap-1 ${
                              holding.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {holding.priceChange24h >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-mono text-sm">{holding.priceChange24h.toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="font-mono font-bold text-primary">
                            $
                            {holding.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
