import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const approvedMintsData = await storage.get("approved:tokens")
    const approvedMints = approvedMintsData ? JSON.parse(approvedMintsData) : []

    if (approvedMints.length === 0) {
      return NextResponse.json({
        success: true,
        tokens: [],
        source: "approved",
      })
    }

    const tokens = approvedMints.map((mint: string) => ({
      mint,
      name: "Token",
      symbol: "TKN",
      image: `https://ui-avatars.com/api/?name=TKN&background=random`,
      price: 0,
      marketCap: 0,
      volume24h: 0,
      priceChange24h: 0,
      liquidity: 0,
      holder: 0,
      createdAt: Date.now(),
      migrated: false,
    }))

    return NextResponse.json({
      success: true,
      tokens,
      source: "approved",
    })
  } catch (error) {
    console.error("Error fetching approved tokens:", error)
    return NextResponse.json({
      success: true,
      tokens: [],
      source: "error",
    })
  }
}
