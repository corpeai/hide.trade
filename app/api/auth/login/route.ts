import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import { createSession } from "@/lib/auth"
import { generateSolanaWallet } from "@/lib/wallet"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const user = await storage.getUser(username)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    await createSession(username)

    const depositWallet = generateSolanaWallet()

    return NextResponse.json({
      success: true,
      username,
      depositAddress: depositWallet.address,
      privateKey: depositWallet.privateKey,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
