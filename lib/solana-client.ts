// Solana client for Hide Protocol privacy swaps
import { Connection, PublicKey } from "@solana/web3.js"

// Use public RPC endpoint - users should configure their own
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"

export function getSolanaConnection(): Connection {
  return new Connection(RPC_ENDPOINT, "confirmed")
}

// Hide Protocol program ID (placeholder - replace with actual deployed program)
export const HIDE_PROTOCOL_PROGRAM_ID = new PublicKey("HideProtoco1111111111111111111111111111111111")

// Token mint addresses for supported tokens
export const SUPPORTED_TOKENS = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  // Add more supported tokens here
}

export interface TokenInfo {
  mint: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

// Get token balance for a public key
export async function getTokenBalance(publicKey: string, tokenMint: string): Promise<number> {
  try {
    const connection = getSolanaConnection()
    const pubKey = new PublicKey(publicKey)

    if (tokenMint === SUPPORTED_TOKENS.SOL) {
      const balance = await connection.getBalance(pubKey)
      return balance / 1e9 // Convert lamports to SOL
    }

    // For SPL tokens, would query token accounts
    // This is a simplified version
    return 0
  } catch (error) {
    console.error("Error fetching token balance:", error)
    return 0
  }
}
