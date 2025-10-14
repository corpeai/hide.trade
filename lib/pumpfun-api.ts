import { storage } from "./storage"

export interface PumpFunToken {
  mint: string
  name: string
  symbol: string
  description: string
  image_uri: string
  metadata_uri: string
  twitter?: string
  telegram?: string
  bonding_curve: string
  associated_bonding_curve: string
  creator: string
  created_timestamp: number
  raydium_pool?: string
  complete: boolean
  virtual_sol_reserves: number
  virtual_token_reserves: number
  total_supply: number
  website?: string
  show_name: boolean
  king_of_the_hill_timestamp?: number
  market_cap: number
  reply_count: number
  last_reply: number
  nsfw: boolean
  market_id?: string
  inverted?: boolean
  is_currently_live?: boolean
  username?: string
  profile_image?: string
  usd_market_cap: number
}

const PUMPFUN_API = "https://frontend-api.pump.fun"
const CACHE_KEY = "pumpfun:tokens"
const CACHE_TTL = 60 // 1 minute

export async function fetchPumpFunTokens(
  limit = 50,
  offset = 0,
  sort: "created_timestamp" | "last_trade_timestamp" | "market_cap" = "last_trade_timestamp",
  order: "ASC" | "DESC" = "DESC",
): Promise<PumpFunToken[]> {
  try {
    const cacheKey = `${CACHE_KEY}:${sort}:${order}:${limit}:${offset}`
    const cached = await storage.get(cacheKey)

    if (cached) {
      return JSON.parse(cached as string)
    }

    // Fetch from pump.fun API
    const url = `${PUMPFUN_API}/coins?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.statusText}`)
    }

    const tokens: PumpFunToken[] = await response.json()

    // Cache the results (simple cache without TTL in memory storage)
    await storage.set(cacheKey, JSON.stringify(tokens))

    return tokens
  } catch (error) {
    console.error("Error fetching pump.fun tokens:", error)
    throw error
  }
}

export async function fetchPumpFunToken(mint: string): Promise<PumpFunToken | null> {
  try {
    const cacheKey = `pumpfun:token:${mint}`
    const cached = await storage.get(cacheKey)

    if (cached) {
      return JSON.parse(cached as string)
    }

    const url = `${PUMPFUN_API}/coins/${mint}`
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    })

    if (!response.ok) {
      return null
    }

    const token: PumpFunToken = await response.json()
    await storage.set(cacheKey, JSON.stringify(token))

    return token
  } catch (error) {
    console.error("Error fetching token:", error)
    return null
  }
}
