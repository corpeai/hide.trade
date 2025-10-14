import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    const transactions = await storage.getTransactions(username, 50)

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Transaction history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
