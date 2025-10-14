import { type NextRequest, NextResponse } from "next/server"
import { getUserBalance, updateBalance } from "@/lib/balance"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromToken, toToken, amount, slippage, username, tokenSymbol } = body

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    if (!toToken) {
      return NextResponse.json({ error: "Token mint required" }, { status: 400 })
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Get user's off-chain balance
    const balance = await getUserBalance(username)

    // Check if user has sufficient balance
    if (balance.sol < amount) {
      return NextResponse.json(
        {
          error: `Insufficient balance. You have ${balance.sol} SOL but need ${amount} SOL`,
        },
        { status: 400 },
      )
    }

    const estimatedTokens = amount * 1000000 // Mock conversion rate

    // Deduct SOL from user's balance
    const newSolBalance = balance.sol - amount

    // Update token balance
    const updatedTokens = { ...balance.tokens }
    if (!updatedTokens[toToken]) {
      updatedTokens[toToken] = 0
    }
    updatedTokens[toToken] = (updatedTokens[toToken] || 0) + estimatedTokens

    // Save updated balance
    await updateBalance(username, newSolBalance, updatedTokens)

    // Record transaction
    const txRecord = {
      username: username,
      type: "buy",
      fromToken,
      toToken,
      tokenSymbol: tokenSymbol || "UNKNOWN",
      fromAmount: amount,
      toAmount: estimatedTokens,
      signature: `mock_${Date.now()}`,
      timestamp: Date.now(),
    }
    await storage.addTransaction(username, txRecord)

    // Fetch updated balance to return
    const newBalance = await getUserBalance(username)

    return NextResponse.json({
      success: true,
      signature: txRecord.signature,
      newBalance: newBalance,
      outputAmount: estimatedTokens,
    })
  } catch (error) {
    console.error("Trade execution error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
