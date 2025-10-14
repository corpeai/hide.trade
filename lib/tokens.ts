// Token data interfaces
export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  price?: number
  priceChange24h?: number
  volume24h?: number
  marketCap?: number
  liquidity?: number
  source: "pumpfun" | "jupiter" | "birdeye"
  isPumpFun?: boolean
  isMigrated?: boolean
  createdAt?: number
}

export interface TokenListResponse {
  tokens: Token[]
  total: number
}

// Fetch pump.fun tokens from PumpPortal
export async function fetchPumpFunTokens(
  filter: "new" | "popular" | "migrated" = "popular",
  limit = 50,
): Promise<Token[]> {
  try {
    // PumpPortal API endpoint
    const response = await fetch(`https://api.pumpportal.fun/tokens?filter=${filter}&limit=${limit}`)

    const data = await response.json()

    return data.tokens.map((token: any) => ({
      address: token.mint,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals || 9,
      logoURI: token.image,
      price: token.price,
      priceChange24h: token.priceChange24h,
      volume24h: token.volume24h,
      marketCap: token.marketCap,
      liquidity: token.liquidity,
      source: "pumpfun" as const,
      isPumpFun: true,
      isMigrated: token.migrated || false,
      createdAt: token.createdAt,
    }))
  } catch (error) {
    console.error("[v0] PumpPortal fetch error:", error)
    return []
  }
}

// Fetch token data from Birdeye
export async function fetchBirdeyeTokens(sortBy: "volume" | "price_change" = "volume", limit = 50): Promise<Token[]> {
  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/tokenlist?sort_by=${sortBy}&sort_type=desc&offset=0&limit=${limit}`,
      {
        headers: {
          "X-API-KEY": process.env.BIRDEYE_API_KEY || "",
        },
      },
    )

    const data = await response.json()

    return data.data.tokens.map((token: any) => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI,
      price: token.price,
      priceChange24h: token.priceChange24h,
      volume24h: token.volume24h,
      marketCap: token.mc,
      liquidity: token.liquidity,
      source: "birdeye" as const,
      isPumpFun: false,
    }))
  } catch (error) {
    console.error("[v0] Birdeye fetch error:", error)
    return []
  }
}

// Fetch combined token list
export async function fetchAllTokens(): Promise<TokenListResponse> {
  try {
    // Fetch from multiple sources in parallel
    const [pumpNew, pumpPopular, pumpMigrated, birdeyeTokens] = await Promise.all([
      fetchPumpFunTokens("new", 20),
      fetchPumpFunTokens("popular", 30),
      fetchPumpFunTokens("migrated", 20),
      fetchBirdeyeTokens("volume", 30),
    ])

    // Combine and deduplicate
    const allTokens = [...pumpNew, ...pumpPopular, ...pumpMigrated, ...birdeyeTokens]
    const uniqueTokens = Array.from(new Map(allTokens.map((token) => [token.address, token])).values())

    return {
      tokens: uniqueTokens,
      total: uniqueTokens.length,
    }
  } catch (error) {
    console.error("[v0] Fetch all tokens error:", error)
    return { tokens: [], total: 0 }
  }
}

// Search tokens
export async function searchTokens(query: string): Promise<Token[]> {
  try {
    const { tokens } = await fetchAllTokens()
    const lowerQuery = query.toLowerCase()

    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(lowerQuery) ||
        token.name.toLowerCase().includes(lowerQuery) ||
        token.address.toLowerCase().includes(lowerQuery),
    )
  } catch (error) {
    console.error("[v0] Search tokens error:", error)
    return []
  }
}
