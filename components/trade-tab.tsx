"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  ArrowDownUp,
  Flame,
  Rocket,
  Search,
  RefreshCw,
  ChevronDown,
} from "lucide-react"
import { useToast } from "./toast-container"

export function TradeTab() {
  const [filter, setFilter] = useState<"all" | "new" | "popular" | "migrated">("new")
  const [tokens, setTokens] = useState<any[]>([])
  const [selectedToken, setSelectedToken] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [slippage, setSlippage] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [balance, setBalance] = useState<any>(null)
  const [outputAmount, setOutputAmount] = useState("0.00")
  const [isSwapping, setIsSwapping] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string>("")
  const [currentQuote, setCurrentQuote] = useState<any>(null)
  const [solPrice, setSolPrice] = useState<number>(200) // Default fallback
  const [tokenHoldings, setTokenHoldings] = useState<
    Array<{ mint: string; symbol: string; amount: number; value: number }>
  >([])
  const [isBuying, setIsBuying] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showHoldings, setShowHoldings] = useState(true)

  const { showToast } = useToast()

  useEffect(() => {
    console.log("[v0] TradeTab: Component mounted")
    const storedUsername = localStorage.getItem("username")
    console.log("[v0] TradeTab: Username from localStorage:", storedUsername)
    if (storedUsername) {
      setUsername(storedUsername)
      console.log("[v0] TradeTab: Username set to:", storedUsername)
    } else {
      console.log("[v0] TradeTab: WARNING - No username in localStorage!")
    }

    fetchBalance()
    fetchTokens()
    fetchSolPrice()

    const interval = setInterval(() => {
      refreshPrices()
    }, 10000) // 10 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.log("[v0] TradeTab: Filter changed to:", filter)
    fetchTokens()
  }, [filter])

  useEffect(() => {
    if (!amount || !selectedToken || Number.parseFloat(amount) <= 0) {
      setOutputAmount("0.00")
      setCurrentQuote(null)
      return
    }

    const amountNum = Number.parseFloat(amount)

    if (isBuying) {
      // Buying tokens with SOL
      const solValueInUSD = amountNum * solPrice
      const estimatedTokens = selectedToken.price > 0 ? solValueInUSD / selectedToken.price : 0

      console.log(
        `[v0] TradeTab: Calculating BUY ESTIMATE - Amount: ${amountNum} SOL ($${solValueInUSD.toFixed(2)}), Token price: $${selectedToken.price}, Estimated output: ${estimatedTokens}`,
      )

      setOutputAmount(estimatedTokens.toFixed(2))

      setCurrentQuote({
        meta: {
          currentMarketCapInSol: selectedToken.marketCap / solPrice,
          isCompleted: selectedToken.migrated || false,
          pricePerToken: selectedToken.price,
          estimatedOutput: estimatedTokens,
          solPrice: solPrice,
          solValueInUSD: solValueInUSD,
        },
      })
    } else {
      // Selling tokens for SOL
      const tokenValueInUSD = amountNum * selectedToken.price
      const estimatedSol = tokenValueInUSD / solPrice

      console.log(
        `[v0] TradeTab: Calculating SELL ESTIMATE - Amount: ${amountNum} ${selectedToken.symbol} ($${tokenValueInUSD.toFixed(2)}), SOL price: $${solPrice}, Estimated output: ${estimatedSol} SOL`,
      )

      setOutputAmount(estimatedSol.toFixed(6))

      setCurrentQuote({
        meta: {
          currentMarketCapInSol: selectedToken.marketCap / solPrice,
          isCompleted: selectedToken.migrated || false,
          pricePerToken: selectedToken.price,
          estimatedOutput: estimatedSol,
          solPrice: solPrice,
          tokenValueInUSD: tokenValueInUSD,
        },
      })
    }
  }, [amount, selectedToken, solPrice, isBuying])

  const fetchTokens = async () => {
    try {
      const response = await fetch(`/api/tokens/pumpfun?filter=${filter}&limit=50`)
      const data = await response.json()

      if (data.success && data.tokens.length > 0) {
        setTokens(data.tokens)
        if (!selectedToken) {
          setSelectedToken(data.tokens[0])
          console.log("[v0] TradeTab: Selected first token:", data.tokens[0].symbol)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch tokens:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBalance = async () => {
    try {
      const storedUsername = localStorage.getItem("username")
      if (!storedUsername) {
        console.log("[v0] TradeTab: Cannot fetch balance - no username")
        return
      }

      const response = await fetch(`/api/balance?username=${storedUsername}`)
      if (response.ok) {
        const data = await response.json()
        setBalance(data)
        console.log("[v0] Balance fetched:", data)

        if (data.tokens && Object.keys(data.tokens).length > 0) {
          const holdings = []
          for (const [mint, amount] of Object.entries(data.tokens)) {
            const token = tokens.find((t) => t.mint === mint)
            if (token && amount > 0) {
              holdings.push({
                mint,
                symbol: token.symbol,
                amount: amount as number,
                value: (amount as number) * token.price,
              })
            }
          }
          setTokenHoldings(holdings)
          console.log("[v0] Token holdings calculated:", holdings)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch balance:", error)
    }
  }

  const fetchSolPrice = async () => {
    try {
      const response = await fetch("/api/sol-price")
      const data = await response.json()
      if (data.success && data.price) {
        setSolPrice(data.price)
        console.log("[v0] SOL price updated:", data.price)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch SOL price:", error)
    }
  }

  const executeSwap = async () => {
    console.log("[v0] CLIENT: ========== SWAP BUTTON CLICKED ==========")
    console.log("[v0] CLIENT: executeSwap called")
    console.log("[v0] CLIENT: isBuying =", isBuying)
    console.log("[v0] CLIENT: amount =", amount)
    console.log("[v0] CLIENT: selectedToken =", selectedToken)
    console.log("[v0] CLIENT: username =", username)
    console.log("[v0] CLIENT: balance =", balance)

    if (!amount || Number.parseFloat(amount) <= 0) {
      console.log("[v0] CLIENT: Invalid amount")
      showToast({
        type: "error",
        title: "Invalid Amount",
        message: "Please enter a valid amount greater than 0",
      })
      return
    }

    if (!username) {
      console.log("[v0] CLIENT: No username")
      showToast({
        type: "error",
        title: "Authentication Required",
        message: "Please log in to trade",
      })
      return
    }

    if (!selectedToken) {
      console.log("[v0] CLIENT: No token selected")
      showToast({
        type: "error",
        title: "No Token Selected",
        message: "Please select a token to trade",
      })
      return
    }

    const amountNum = Number.parseFloat(amount)

    if (isBuying) {
      // Buying tokens with SOL
      if (!balance || balance.sol < amountNum) {
        console.log(`[v0] CLIENT: Insufficient SOL balance. Has: ${balance?.sol || 0}, Needs: ${amountNum}`)
        showToast({
          type: "error",
          title: "Insufficient Balance",
          message: `You have ${balance?.sol || 0} SOL but need ${amountNum} SOL`,
        })
        return
      }
    } else {
      // Selling tokens for SOL
      const tokenBalance = balance?.tokens?.[selectedToken.mint] || 0
      if (tokenBalance < amountNum) {
        console.log(
          `[v0] CLIENT: Insufficient token balance. Has: ${tokenBalance}, Needs: ${amountNum} ${selectedToken.symbol}`,
        )
        showToast({
          type: "error",
          title: "Insufficient Balance",
          message: `You have ${tokenBalance} ${selectedToken.symbol} but need ${amountNum} ${selectedToken.symbol}`,
        })
        return
      }
    }

    setIsSwapping(true)
    console.log("[v0] CLIENT: Starting swap execution...")
    console.log("[v0] CLIENT: Token mint:", selectedToken.mint)
    console.log("[v0] CLIENT: Token symbol:", selectedToken.symbol)
    console.log("[v0] CLIENT: Token price:", selectedToken.price)

    try {
      const endpoint = isBuying ? "/api/swap/execute-trade" : "/api/swap/sell"
      const swapPayload = isBuying
        ? {
            fromToken: "SOL",
            toToken: selectedToken.mint,
            tokenSymbol: selectedToken.symbol,
            amount: amountNum,
            slippage: Number.parseFloat(slippage),
            username: username,
          }
        : {
            tokenMint: selectedToken.mint,
            tokenSymbol: selectedToken.symbol,
            amount: amountNum,
            slippage: Number.parseFloat(slippage),
            username: username,
          }

      console.log("[v0] CLIENT: Swap payload:", JSON.stringify(swapPayload, null, 2))

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(swapPayload),
      })

      console.log("[v0] CLIENT: Response status:", response.status)

      const data = await response.json()
      console.log("[v0] CLIENT: Response data:", data)

      if (response.ok && data.success) {
        console.log("[v0] CLIENT: ✅ Swap successful!")
        console.log("[v0] CLIENT: Signature:", data.signature)
        console.log("[v0] CLIENT: New balance:", data.newBalance)
        console.log("[v0] CLIENT: Output amount:", data.outputAmount)

        setBalance(data.newBalance)
        await fetchBalance() // Re-fetch balance to ensure holdings are updated

        const estimatedOutput = data.outputAmount || outputAmount || "0.00"

        setAmount("")
        setOutputAmount("0.00")
        setCurrentQuote(null)

        if (isBuying) {
          showToast({
            type: "success",
            title: "Swap Successful!",
            message: `Bought ~${Number(estimatedOutput).toFixed(2)} ${selectedToken.symbol}`,
            txSignature: data.signature,
          })
        } else {
          showToast({
            type: "success",
            title: "Swap Successful!",
            message: `Sold ${amountNum} ${selectedToken.symbol}\nReceived ~${Number(estimatedOutput).toFixed(6)} SOL`,
            txSignature: data.signature,
          })
        }
      } else {
        console.error("[v0] CLIENT: ❌ Swap failed:", data.error)
        showToast({
          type: "error",
          title: "Swap Failed",
          message: data.error || "Unknown error occurred",
        })
      }
    } catch (error) {
      console.error("[v0] CLIENT: ❌ Swap execution error:", error)
      showToast({
        type: "error",
        title: "Swap Failed",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsSwapping(false)
      console.log("[v0] CLIENT: Swap execution finished")
    }
  }

  const refreshPrices = async () => {
    setIsRefreshing(true)
    await Promise.all([fetchBalance(), fetchTokens(), fetchSolPrice()])
    setTimeout(() => setIsRefreshing(false), 500) // Show refresh indicator for 500ms
  }

  const isButtonDisabled =
    isSwapping ||
    !amount ||
    Number.parseFloat(amount) <= 0 ||
    !selectedToken ||
    !username ||
    (isBuying ? !balance || balance.sol < Number.parseFloat(amount) : false) ||
    (!isBuying
      ? !balance?.tokens?.[selectedToken?.mint] || balance.tokens[selectedToken.mint] < Number.parseFloat(amount)
      : false)

  useEffect(() => {
    if (isButtonDisabled) {
      console.log("[v0] TradeTab: Swap button is DISABLED because:")
      if (isSwapping) console.log("  - Swap in progress")
      if (!amount) console.log("  - No amount entered")
      if (amount && Number.parseFloat(amount) <= 0) console.log("  - Amount is <= 0")
      if (!selectedToken) console.log("  - No token selected")
      if (!username) console.log("  - No username (not logged in)")
      if (isBuying && balance && balance.sol < Number.parseFloat(amount)) console.log("  - Insufficient SOL balance")
      if (
        !isBuying &&
        selectedToken &&
        balance?.tokens?.[selectedToken.mint] &&
        balance.tokens[selectedToken.mint] < Number.parseFloat(amount)
      )
        console.log("  - Insufficient token balance")
    } else {
      console.log("[v0] TradeTab: Swap button is ENABLED and ready")
    }
  }, [isButtonDisabled, isSwapping, amount, selectedToken, username, balance, isBuying])

  useEffect(() => {
    if (balance?.tokens && tokens.length > 0) {
      const holdings = []
      for (const [mint, amount] of Object.entries(balance.tokens)) {
        const token = tokens.find((t) => t.mint === mint)
        if (token && (amount as number) > 0) {
          holdings.push({
            mint,
            symbol: token.symbol,
            amount: amount as number,
            value: (amount as number) * token.price,
          })
        }
      }
      setTokenHoldings(holdings)
      console.log("[v0] Token holdings updated:", holdings)
    }
  }, [balance, tokens])

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      searchQuery === "" ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-primary font-mono text-lg animate-pulse">Loading tokens...</div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6">
        <div className="border-2 border-primary/40 rounded-lg bg-gradient-to-br from-black via-black to-primary/5 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.2)]">
          <div className="p-4 border-b-2 border-primary/30 bg-black/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RefreshCw
                  className={`w-4 h-4 text-primary/60 ${isRefreshing ? "animate-spin" : ""}`}
                  title="Prices update every 10 seconds"
                />
                <span className="text-[10px] text-primary/60 font-mono">
                  {isRefreshing ? "UPDATING..." : "LIVE PRICES"}
                </span>
              </div>
              <button
                onClick={refreshPrices}
                disabled={isRefreshing}
                className="px-3 py-1 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded text-[10px] font-mono text-primary transition-all disabled:opacity-50"
              >
                REFRESH NOW
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              {(["new", "popular", "migrated"] as const).map((f) => {
                const icons = {
                  new: Rocket,
                  popular: Flame,
                  migrated: TrendingUp,
                }
                const Icon = icons[f]
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 px-4 py-2.5 rounded font-mono text-xs font-bold transition-all uppercase tracking-wider flex items-center justify-center gap-2 ${
                      filter === f
                        ? "bg-primary text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                        : "bg-primary/10 text-primary/60 hover:text-primary hover:bg-primary/20 border border-primary/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {f === "new" ? "NEW" : f === "popular" ? "HOT" : "PUMP"}
                  </button>
                )
              })}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-primary/30 rounded font-mono text-sm text-white placeholder:text-primary/40 outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
              />
            </div>
          </div>

          <div className="divide-y divide-primary/10 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredTokens.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-mono">No tokens found. Try a different filter.</div>
            ) : (
              filteredTokens.map((token, index) => (
                <button
                  key={token.mint}
                  onClick={() => {
                    setSelectedToken(token)
                    console.log("[v0] TradeTab: Token selected:", token.symbol, token.mint)
                  }}
                  className={`w-full p-4 hover:bg-primary/10 transition-all text-left relative group ${
                    selectedToken?.mint === token.mint
                      ? "bg-gradient-to-r from-primary/20 to-transparent shadow-[inset_4px_0_0_0_rgba(0,255,65,1)]"
                      : ""
                  }`}
                >
                  <div className="absolute left-2 top-2 text-[10px] font-mono text-primary/40 font-bold">
                    #{index + 1}
                  </div>

                  <div className="flex items-center justify-between pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {token.image ? (
                          <img
                            src={token.image || "/placeholder.svg"}
                            alt={token.symbol}
                            className="w-12 h-12 rounded-lg border-2 border-primary shadow-[0_0_15px_rgba(0,255,65,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] transition-all"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,65,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] transition-all">
                            <span className="font-mono font-bold text-lg text-primary">{token.symbol[0]}</span>
                          </div>
                        )}
                        {token.migrated && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.8)]">
                            <Rocket className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono font-bold text-white text-lg">{token.symbol}</p>
                          {token.migrated && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[9px] font-mono rounded border border-primary/40 font-bold">
                              PUMP.FUN
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 font-mono truncate max-w-[200px]">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-white text-lg mb-1">
                        ${token.price.toFixed(token.price < 0.01 ? 8 : 4)}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        {token.priceChange24h > 0 ? (
                          <TrendingUp className="w-4 h-4 text-primary" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <p
                          className={`text-sm font-mono font-bold ${token.priceChange24h > 0 ? "text-primary" : "text-red-500"}`}
                        >
                          {token.priceChange24h > 0 ? "+" : ""}
                          {token.priceChange24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pl-6 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="text-primary/60">VOL:</span> ${(token.volume24h / 1000).toFixed(1)}K
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-primary/60">MCAP:</span> ${(token.marketCap / 1000).toFixed(1)}K
                    </span>
                    <span className="text-primary/60">24H</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        {tokenHoldings.length > 0 && (
          <div className="mb-4 border-2 border-primary/40 rounded-lg bg-gradient-to-br from-black via-black to-primary/5 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.2)]">
            <button
              onClick={() => setShowHoldings(!showHoldings)}
              className="w-full p-3 flex items-center justify-between hover:bg-primary/5 transition-all"
            >
              <h3 className="text-sm font-mono font-bold text-primary flex items-center gap-2">
                <span className="text-primary/60">{">"}</span> YOUR HOLDINGS ({tokenHoldings.length})
              </h3>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${showHoldings ? "rotate-180" : ""}`}
              />
            </button>
            {showHoldings && (
              <div className="p-3 pt-0 space-y-2">
                {tokenHoldings.map((holding) => {
                  const token = tokens.find((t) => t.mint === holding.mint)
                  return (
                    <div
                      key={holding.mint}
                      className="flex items-center justify-between p-2 bg-black/50 border border-primary/20 rounded hover:border-primary/40 transition-all cursor-pointer"
                      onClick={() => {
                        if (token) {
                          setSelectedToken(token)
                          setIsBuying(false) // Switch to sell mode when clicking a holding
                          console.log("[v0] Selected token from holdings:", token.symbol)
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {token?.image ? (
                          <img
                            src={token.image || "/placeholder.svg"}
                            alt={holding.symbol}
                            className="w-6 h-6 rounded-full border border-primary shadow-[0_0_8px_rgba(0,255,65,0.4)]"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-mono font-bold text-primary">{holding.symbol[0]}</span>
                          </div>
                        )}
                        <span className="font-mono text-sm font-bold text-white">{holding.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-white">{holding.amount.toFixed(2)}</div>
                        <div className="font-mono text-[10px] text-primary/60">${holding.value.toFixed(4)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        <div className="border-2 border-primary/40 rounded-lg bg-gradient-to-br from-black via-black to-primary/5 backdrop-blur-sm p-4 sticky top-4 shadow-[0_0_30px_rgba(0,255,65,0.2)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/30">
            <h3 className="text-xl font-mono font-bold text-primary flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
              SWAP
            </h3>
          </div>

          <div className="mb-3">
            <label className="text-[10px] text-primary/60 font-mono mb-1.5 block uppercase tracking-widest">FROM</label>
            <div className="p-4 border-2 border-primary/30 rounded-lg bg-black/80 shadow-[inset_0_0_15px_rgba(0,255,65,0.05)] hover:border-primary/50 transition-all">
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  console.log("[v0] TradeTab: Amount changed to:", e.target.value)
                }}
                className="bg-transparent text-2xl font-mono font-bold outline-none w-full text-white placeholder:text-gray-700 mb-3"
              />
              <div className="flex items-center justify-between">
                {isBuying ? (
                  <>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/solana-logo.png"
                        alt="Solana"
                        className="w-6 h-6 rounded-full border-2 border-primary shadow-[0_0_8px_rgba(0,255,65,0.4)]"
                      />
                      <span className="font-mono font-bold text-base">SOL</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      BAL: {balance ? balance.sol.toFixed(4) : "0.0000"}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      {selectedToken?.image ? (
                        <img
                          src={selectedToken.image || "/placeholder.svg"}
                          alt={selectedToken.symbol}
                          className="w-6 h-6 rounded-full border-2 border-primary"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                          <span className="text-xs font-mono font-bold text-primary">
                            {selectedToken?.symbol[0] || "?"}
                          </span>
                        </div>
                      )}
                      <span className="font-mono font-bold text-base">{selectedToken?.symbol || "TOKEN"}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      BAL:{" "}
                      {balance?.tokens?.[selectedToken?.mint]
                        ? balance.tokens[selectedToken.mint].toFixed(4)
                        : "0.0000"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-3">
            <button
              onClick={() => {
                setIsBuying(!isBuying)
                setAmount("")
                setOutputAmount("0.00")
                setCurrentQuote(null)
                console.log("[v0] Swap direction toggled. isBuying:", !isBuying)
              }}
              className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:rotate-180 hover:shadow-[0_0_30px_rgba(0,255,65,0.7)] transition-all duration-500 cursor-pointer group"
            >
              <ArrowDownUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="mb-4">
            <label className="text-[10px] text-primary/60 font-mono mb-1.5 block uppercase tracking-widest">TO</label>
            <div className="p-4 border-2 border-primary/30 rounded-lg bg-black/80 shadow-[inset_0_0_15px_rgba(0,255,65,0.05)]">
              <span className="text-2xl font-mono font-bold text-white block mb-3">{outputAmount}</span>
              {selectedToken && (
                <div className="flex items-center justify-between">
                  {isBuying ? (
                    <>
                      <div className="flex items-center gap-2">
                        {selectedToken.image ? (
                          <img
                            src={selectedToken.image || "/placeholder.svg"}
                            alt={selectedToken.symbol}
                            className="w-6 h-6 rounded-full border border-primary"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                            <span className="text-xs font-mono font-bold text-primary">{selectedToken.symbol[0]}</span>
                          </div>
                        )}
                        <span className="font-mono font-bold text-base">{selectedToken.symbol}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        BAL:{" "}
                        {balance?.tokens?.[selectedToken.mint]
                          ? balance.tokens[selectedToken.mint].toFixed(4)
                          : "0.0000"}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/solana-logo.png"
                          alt="Solana"
                          className="w-6 h-6 rounded-full border-2 border-primary shadow-[0_0_8px_rgba(0,255,65,0.4)]"
                        />
                        <span className="font-mono font-bold text-base">SOL</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        BAL: {balance ? balance.sol.toFixed(4) : "0.0000"}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[10px] text-primary/60 font-mono mb-1.5 block uppercase tracking-widest">
              SLIPPAGE
            </label>
            <div className="flex gap-2">
              {["0.5", "1", "2"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`flex-1 px-3 py-2 rounded font-mono text-sm font-bold transition-all ${
                    slippage === s
                      ? "bg-primary text-black shadow-[0_0_12px_rgba(0,255,65,0.4)]"
                      : "bg-primary/10 text-primary/60 hover:text-primary hover:bg-primary/20 border border-primary/20"
                  }`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              console.log("[v0] CLIENT: ========== SWAP BUTTON CLICKED ==========")
              executeSwap()
            }}
            disabled={isButtonDisabled}
            className="w-full px-4 py-3 bg-primary text-black font-mono font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(0,255,65,0.5)] hover:shadow-[0_0_40px_rgba(0,255,65,0.7)] uppercase tracking-widest text-base relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{isSwapping ? "EXECUTING..." : isBuying ? "BUY NOW" : "SELL NOW"}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>

          {isButtonDisabled && !isSwapping && (
            <div className="mt-2 text-[10px] text-red-500/80 font-mono text-center">
              {!username && "Please log in to trade"}
              {username && !amount && "Enter amount to swap"}
              {username && amount && Number.parseFloat(amount) <= 0 && "Amount must be greater than 0"}
              {username && amount && Number.parseFloat(amount) > 0 && !selectedToken && "Select a token"}
              {username &&
                amount &&
                Number.parseFloat(amount) > 0 &&
                selectedToken &&
                isBuying &&
                balance &&
                balance.sol < Number.parseFloat(amount) &&
                "Insufficient SOL balance"}
              {username &&
                amount &&
                Number.parseFloat(amount) > 0 &&
                selectedToken &&
                !isBuying &&
                balance?.tokens?.[selectedToken.mint] &&
                balance.tokens[selectedToken.mint] < Number.parseFloat(amount) &&
                `Insufficient ${selectedToken.symbol} balance`}
            </div>
          )}

          <div className="mt-3 p-3 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg shadow-[inset_0_0_15px_rgba(0,255,65,0.05)]">
            <div className="flex items-start gap-2 text-xs text-gray-400 font-mono">
              <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]" />
              <div>
                <p className="text-primary font-bold mb-1 text-xs">PRIVACY ENABLED</p>
                <p className="text-[10px] leading-relaxed text-primary/60">
                  Your swap is completely private and untraceable on-chain. Zero-knowledge proofs protect your identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
