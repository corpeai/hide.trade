import { NextResponse } from "next/server"
import { fetchAllTokens, fetchPumpFunTokens, fetchBirdeyeTokens } from "@/lib/tokens"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source") // 'pumpfun', 'birdeye', or 'all'
    const filter = searchParams.get("filter") as "new" | "popular" | "migrated" | null

    let result

    if (source === "pumpfun") {
      const tokens = await fetchPumpFunTokens(filter || "popular")
      result = { tokens, total: tokens.length }
    } else if (source === "birdeye") {
      const tokens = await fetchBirdeyeTokens()
      result = { tokens, total: tokens.length }
    } else {
      result = await fetchAllTokens()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Token API error:", error)
    return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 })
  }
}
