import { storage } from "./storage"

// Off-chain balance management
export interface UserBalance {
  username: string
  sol: number
  tokens: Record<string, number>
  lastUpdated: number
}

export async function getUserBalance(username: string): Promise<UserBalance> {
  const balance = await storage.getBalance(username)

  if (!balance) {
    // Initialize new balance
    const newBalance: UserBalance = {
      username,
      sol: 0,
      tokens: {},
      lastUpdated: Date.now(),
    }
    await storage.setBalance(username, newBalance)
    return newBalance
  }

  return balance
}

export async function updateSolBalance(username: string, amount: number): Promise<void> {
  const balance = await getUserBalance(username)
  balance.sol += amount
  balance.lastUpdated = Date.now()
  await storage.setBalance(username, balance)
}

export async function updateTokenBalance(username: string, tokenMint: string, amount: number): Promise<void> {
  const balance = await getUserBalance(username)
  if (!balance.tokens[tokenMint]) {
    balance.tokens[tokenMint] = 0
  }
  balance.tokens[tokenMint] += amount
  balance.lastUpdated = Date.now()
  await storage.setBalance(username, balance)
}

export async function updateBalance(
  username: string,
  solBalance: number,
  tokenBalances: Record<string, number>,
): Promise<void> {
  const balance = await getUserBalance(username)
  balance.sol = solBalance
  balance.tokens = tokenBalances
  balance.lastUpdated = Date.now()
  await storage.setBalance(username, balance)
}

export async function executeOffChainSwap(
  username: string,
  fromToken: string,
  toToken: string,
  fromAmount: number,
  toAmount: number,
): Promise<boolean> {
  const balance = await getUserBalance(username)

  // Check if user has sufficient balance
  if (fromToken === "SOL") {
    if (balance.sol < fromAmount) {
      return false
    }
  } else {
    if (!balance.tokens[fromToken] || balance.tokens[fromToken] < fromAmount) {
      return false
    }
  }

  // Deduct from token
  if (fromToken === "SOL") {
    balance.sol -= fromAmount
  } else {
    balance.tokens[fromToken] -= fromAmount
  }

  // Add to token
  if (toToken === "SOL") {
    balance.sol += toAmount
  } else {
    if (!balance.tokens[toToken]) balance.tokens[toToken] = 0
    balance.tokens[toToken] += toAmount
  }

  balance.lastUpdated = Date.now()
  await storage.setBalance(username, balance)

  return true
}

export async function setUserBalance(username: string, balance: UserBalance): Promise<void> {
  balance.lastUpdated = Date.now()
  await storage.setBalance(username, balance)
}
