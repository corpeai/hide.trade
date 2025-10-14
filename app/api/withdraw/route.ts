import { type NextRequest, NextResponse } from "next/server"
import { getUserBalance, updateSolBalance } from "@/lib/balance"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const { username, amount, recipient, platformFee, totalAmount } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    const user = await storage.getUser(username)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate recipient address
    if (!recipient || recipient.length < 32 || recipient.length > 44) {
      return NextResponse.json({ error: "Invalid recipient address" }, { status: 400 })
    }

    // Get user balance
    const balance = await getUserBalance(username)

    if (balance.sol < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    const requestId = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const withdrawalRequest = {
      requestId,
      username,
      amount,
      platformFee,
      totalAmount,
      recipient,
      status: "processing",
      createdAt: Date.now(),
      estimatedArrival: "Less than 10 minutes",
    }

    await storage.lpush("withdrawal_requests", JSON.stringify(withdrawalRequest))

    await updateSolBalance(username, -amount)

    const txRecord = {
      username,
      type: "withdraw",
      amount,
      platformFee,
      totalAmount,
      recipient,
      requestId,
      status: "processing",
      timestamp: Date.now(),
    }
    await storage.addTransaction(username, txRecord)

    return NextResponse.json({
      success: true,
      requestId,
      status: "processing",
      message: "Withdrawal request submitted successfully",
    })
  } catch (error) {
    console.error("Withdrawal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
