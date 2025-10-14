export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[v0] Fetching SOL price from CoinGecko...")

    // Fetch SOL price from CoinGecko (free, no API key needed)
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd", {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    const solPrice = data.solana?.usd

    if (!solPrice) {
      throw new Error("SOL price not found in response")
    }

    console.log("[v0] SOL price fetched:", solPrice)

    return Response.json({
      success: true,
      price: solPrice,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("[v0] Failed to fetch SOL price:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch SOL price",
        // Fallback price in case of error
        price: 200,
      },
      { status: 500 },
    )
  }
}
