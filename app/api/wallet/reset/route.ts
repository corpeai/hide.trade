import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { storage } from "@/lib/storage"
import { generateSolanaWallet } from "@/lib/wallet"

export async function POST() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await storage.getUser(session.username)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Old addresses are automatically invalidated through Hide Protocol
    const newWallet = generateSolanaWallet()

    return NextResponse.json({
      success: true,
      depositAddress: newWallet.address,
      privateKey: newWallet.privateKey,
      warning:
        "New deposit address generated. Funds sent here will be processed through Hide Protocol smart contracts.",
    })
  } catch (error) {
    console.error("Wallet reset error:", error)
    return NextResponse.json({ error: "Wallet reset failed" }, { status: 500 })
  }
}
