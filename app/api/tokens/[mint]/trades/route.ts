import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { mint: string } }) {
  try {
    const mint = params.mint

    const tradesData = await storage.lrange(`trades:${mint}`, 0, 49)
    const trades = tradesData.map((data) => JSON.parse(data))

    return NextResponse.json({
      success: true,
      trades,
    })
  } catch (error) {
    console.error("Error fetching trades:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch trades" }, { status: 500 })
  }
}
