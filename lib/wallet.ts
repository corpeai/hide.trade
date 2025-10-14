import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"

export function generateSolanaWallet() {
  const keypair = Keypair.generate()

  return {
    address: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
  }
}
