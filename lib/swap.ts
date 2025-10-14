// Swap provider types
export type SwapProvider = "pumpswap" | "jupiter"

export interface SwapQuote {
  inputMint: string
  outputMint: string
  inAmount: string
  outAmount: string
  priceImpact: number
  fee: number
  provider: SwapProvider
}

export interface SwapResult {
  signature: string
  provider: SwapProvider
}

// Check if token is from pump.fun
export function isPumpFunToken(mintAddress: string): boolean {
  // This would check against pump.fun token list or use PumpPortal API
  // For now, we'll use a simple check (you can enhance this)
  return mintAddress.startsWith("pump") // Placeholder logic
}

// Get swap quote from PumpSwap
export async function getPumpSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippage = 1,
): Promise<SwapQuote> {
  try {
    // PumpSwap API endpoint (replace with actual endpoint)
    const response = await fetch("https://api.pumpswap.io/v1/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputMint,
        outputMint,
        amount,
        slippage,
      }),
    })

    const data = await response.json()

    return {
      inputMint,
      outputMint,
      inAmount: amount.toString(),
      outAmount: data.outAmount,
      priceImpact: data.priceImpact,
      fee: data.fee,
      provider: "pumpswap",
    }
  } catch (error) {
    console.error("[v0] PumpSwap quote error:", error)
    throw new Error("Failed to get PumpSwap quote")
  }
}

// Get swap quote from Jupiter
export async function getJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippage = 1,
): Promise<SwapQuote> {
  try {
    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage * 100}`,
    )

    const data = await response.json()

    return {
      inputMint,
      outputMint,
      inAmount: data.inAmount,
      outAmount: data.outAmount,
      priceImpact: data.priceImpactPct,
      fee: data.platformFee?.amount || 0,
      provider: "jupiter",
    }
  } catch (error) {
    console.error("[v0] Jupiter quote error:", error)
    throw new Error("Failed to get Jupiter quote")
  }
}

// Get best swap quote (auto-routing)
export async function getBestSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippage = 1,
): Promise<SwapQuote> {
  // Check if either token is from pump.fun
  const isPumpInput = isPumpFunToken(inputMint)
  const isPumpOutput = isPumpFunToken(outputMint)

  // If either token is from pump.fun, use PumpSwap
  if (isPumpInput || isPumpOutput) {
    return getPumpSwapQuote(inputMint, outputMint, amount, slippage)
  }

  // Otherwise, use Jupiter
  return getJupiterQuote(inputMint, outputMint, amount, slippage)
}

// Execute PumpSwap transaction
export async function executePumpSwap(quote: SwapQuote, userPublicKey: string): Promise<SwapResult> {
  try {
    // Get swap transaction from PumpSwap
    const response = await fetch("https://api.pumpswap.io/v1/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote,
        userPublicKey,
      }),
    })

    const { transaction } = await response.json()

    // Return transaction for user to sign
    return {
      signature: transaction,
      provider: "pumpswap",
    }
  } catch (error) {
    console.error("[v0] PumpSwap execution error:", error)
    throw new Error("Failed to execute PumpSwap")
  }
}

// Execute Jupiter swap
export async function executeJupiterSwap(quote: SwapQuote, userPublicKey: string): Promise<SwapResult> {
  try {
    // Get swap transaction from Jupiter
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey,
        wrapAndUnwrapSol: true,
      }),
    })

    const { swapTransaction } = await response.json()

    return {
      signature: swapTransaction,
      provider: "jupiter",
    }
  } catch (error) {
    console.error("[v0] Jupiter execution error:", error)
    throw new Error("Failed to execute Jupiter swap")
  }
}

// Execute swap (auto-routing)
export async function executeSwap(quote: SwapQuote, userPublicKey: string): Promise<SwapResult> {
  if (quote.provider === "pumpswap") {
    return executePumpSwap(quote, userPublicKey)
  }
  return executeJupiterSwap(quote, userPublicKey)
}
