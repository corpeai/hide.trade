// Server-side storage utilities
// In production, replace with proper database (PostgreSQL, MongoDB, etc.)

export interface User {
  username: string
  passwordHash: string
  telegram?: string
  createdAt: number
}

export interface UserBalance {
  username: string
  sol: number
  tokens: Record<string, number>
  lastUpdated: number
}

export interface Transaction {
  username: string
  type: string
  amount: number
  address?: string
  timestamp: number
  [key: string]: any
}

// In-memory storage (replace with database in production)
const users = new Map<string, User>()
const balances = new Map<string, UserBalance>()
const transactions = new Map<string, Transaction[]>()
const cache = new Map<string, any>()

// User operations
export const storage = {
  // User management
  async getUser(username: string): Promise<User | null> {
    return users.get(`user:${username}`) || null
  },

  async setUser(username: string, user: User): Promise<void> {
    users.set(`user:${username}`, user)
  },

  async deleteUser(username: string): Promise<void> {
    users.delete(`user:${username}`)
  },

  // Balance management
  async getBalance(username: string): Promise<UserBalance | null> {
    return balances.get(`balance:${username}`) || null
  },

  async setBalance(username: string, balance: UserBalance): Promise<void> {
    balances.set(`balance:${username}`, balance)
  },

  // Transaction management
  async addTransaction(username: string, transaction: Transaction): Promise<void> {
    const key = `transactions:${username}`
    const userTxs = transactions.get(key) || []
    userTxs.unshift(transaction)
    // Keep last 1000 transactions
    if (userTxs.length > 1000) {
      userTxs.length = 1000
    }
    transactions.set(key, userTxs)
  },

  async getTransactions(username: string, limit = 50): Promise<Transaction[]> {
    const key = `transactions:${username}`
    const userTxs = transactions.get(key) || []
    return userTxs.slice(0, limit)
  },

  // Generic cache operations
  async get(key: string): Promise<any> {
    return cache.get(key) || null
  },

  async set(key: string, value: any): Promise<void> {
    cache.set(key, value)
  },

  async delete(key: string): Promise<void> {
    cache.delete(key)
  },

  // List operations (for backwards compatibility)
  async lpush(key: string, value: string): Promise<void> {
    const list = cache.get(key) || []
    list.unshift(value)
    cache.set(key, list)
  },

  async lrange(key: string, start: number, end: number): Promise<string[]> {
    const list = cache.get(key) || []
    if (end === -1) {
      return list.slice(start)
    }
    return list.slice(start, end + 1)
  },
}
