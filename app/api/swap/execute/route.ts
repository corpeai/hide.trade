import { NextResponse } from "next/server"
import { executeSwap } from "@/lib/swap"

export async function POST(request: Request) {
  try {
    const { quote, userPublicKey } = await request.json()

    if (!quote || !userPublicKey) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const result = await executeSwap(quote, userPublicKey)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Swap execute API error:", error)
    return NextResponse.json({ error: "Failed to execute swap" }, { status: 500 })
  }
}
