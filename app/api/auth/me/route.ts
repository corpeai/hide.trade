import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { storage } from "@/lib/storage"
import { generateSolanaWallet } from "@/lib/wallet"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    const user = await storage.getUser(session.username)

    if (!user) {
      return NextResponse.json({ authenticated: false })
    }

    const depositWallet = generateSolanaWallet()

    return NextResponse.json({
      authenticated: true,
      username: user.username,
      depositAddress: depositWallet.address,
      telegram: user.telegram,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false })
  }
}
