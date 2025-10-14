import { type NextRequest, NextResponse } from "next/server"
import { monitorDeposit } from "@/lib/deposit-monitor"
import { getUserBalance } from "@/lib/balance"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    const username = searchParams.get("username")

    if (!address) {
      return NextResponse.json({ error: "Deposit address required" }, { status: 400 })
    }

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    // Check for deposits to the one-time address
    const result = await monitorDeposit(address, username)

    // Get updated balance
    const balance = await getUserBalance(username)

    return NextResponse.json({
      success: true,
      deposited: result.deposited,
      amount: result.amount,
      balance: balance,
    })
  } catch (error) {
    console.error("Deposit monitor API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
