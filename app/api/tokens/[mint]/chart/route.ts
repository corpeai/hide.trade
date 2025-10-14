import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { mint: string } }) {
  try {
    const mint = params.mint
    const { searchParams } = new URL(request.url)
    const interval = searchParams.get("interval") || "5m"

    const tradesData = await storage.lrange(`trades:${mint}`, 0, 999)

    if (tradesData.length === 0) {
      return NextResponse.json({
        success: true,
        candles: [],
        source: "empty",
      })
    }

    const trades = tradesData.map((data) => JSON.parse(data))

    // Group trades into candles based on interval
    const intervalMs =
      {
        "1m": 60000,
        "5m": 300000,
        "15m": 900000,
        "1h": 3600000,
        "4h": 14400000,
        "1d": 86400000,
      }[interval] || 300000

    const candleMap = new Map()

    trades.forEach((trade) => {
      const candleTime = Math.floor(trade.timestamp / intervalMs) * intervalMs

      if (!candleMap.has(candleTime)) {
        candleMap.set(candleTime, {
          time: candleTime,
          open: trade.price,
          high: trade.price,
          low: trade.price,
          close: trade.price,
          volume: 0,
        })
      }

      const candle = candleMap.get(candleTime)
      candle.high = Math.max(candle.high, trade.price)
      candle.low = Math.min(candle.low, trade.price)
      candle.close = trade.price
      candle.volume += trade.sol_amount
    })

    const sortedCandles = Array.from(candleMap.values()).sort((a, b) => a.time - b.time)

    return NextResponse.json({
      success: true,
      candles: sortedCandles,
      source: "local",
    })
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch chart data" }, { status: 500 })
  }
}
