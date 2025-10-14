import { type NextRequest, NextResponse } from "next/server"
import { getUserBalance, updateBalance } from "@/lib/balance"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tokenMint, tokenSymbol, amount, slippage, username } = body

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    if (!tokenMint) {
      return NextResponse.json({ error: "Token mint required" }, { status: 400 })
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Get user's off-chain balance
    const balance = await getUserBalance(username)

    // Check if user has sufficient token balance
    if (!balance.tokens[tokenMint] || balance.tokens[tokenMint] < amount) {
      return NextResponse.json(
        {
          error: `Insufficient ${tokenSymbol} balance. You have ${balance.tokens[tokenMint] || 0} but need ${amount}`,
        },
        { status: 400 },
      )
    }

    const estimatedSol = amount / 1000000 // Mock conversion rate

    // Deduct tokens from balance
    const updatedTokens = { ...balance.tokens }
    updatedTokens[tokenMint] = (updatedTokens[tokenMint] || 0) - amount

    // Add SOL received to balance
    const newSolBalance = balance.sol + estimatedSol

    // Save updated balance
    await updateBalance(username, newSolBalance, updatedTokens)

    // Record transaction
    const txRecord = {
      username: username,
      type: "sell",
      fromToken: tokenMint,
      toToken: "SOL",
      tokenSymbol: tokenSymbol || "UNKNOWN",
      fromAmount: amount,
      toAmount: estimatedSol,
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
      outputAmount: estimatedSol,
    })
  } catch (error) {
    console.error("Sell execution error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
