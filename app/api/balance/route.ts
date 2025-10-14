import { type NextRequest, NextResponse } from "next/server"
import { getUserBalance } from "@/lib/balance"
import { storage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    const user = await storage.getUser(username)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const balance = await getUserBalance(username)

    return NextResponse.json(balance)
  } catch (error) {
    console.error("Balance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
