import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import type { User } from "@/lib/storage"
import { generateSolanaWallet } from "@/lib/wallet"
import { createSession } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password, telegram } = await request.json()

    // Validation
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({ error: "Username must be between 3 and 20 characters" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await storage.getUser(username)
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    const depositWallet = generateSolanaWallet()

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    const user: User = {
      username,
      passwordHash,
      telegram: telegram || undefined,
      createdAt: Date.now(),
    }

    await storage.setUser(username, user)

    // Create session
    await createSession(username)

    // Funds sent here will be automatically processed through Hide Protocol
    return NextResponse.json({
      success: true,
      username,
      depositAddress: depositWallet.address,
      privateKey: depositWallet.privateKey,
      warning:
        "This is your one-time deposit address. Funds will be automatically processed through Hide Protocol smart contracts. Save your private key securely - it cannot be recovered.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
