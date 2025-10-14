"use client"

import {
  Shield,
  Lock,
  Zap,
  DollarSign,
  Eye,
  Gauge,
  ShieldCheck,
  Scale,
  Code,
  Terminal,
  Key,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 backdrop-blur-sm bg-black/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-mono">
                Hide<span className="text-primary"> Protocol</span>
              </span>
            </Link>
            <Link href="/app">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-mono font-bold">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-mono text-primary">🦉 DOCUMENTATION</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Trade Wisely.
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
              Stay Unseen.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Hide Protocol is a privacy-first trading layer built on Solana — where every swap disappears into the dark,
            and every withdrawal leaves no trace.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-16 p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
          <p className="text-lg text-zinc-300 leading-relaxed mb-4">
            It's a sanctuary for traders who move in silence. Powered by cutting-edge routing, private vaults, and an
            off-chain balance engine, Hide turns Solana's raw speed into stealth-grade anonymity.
          </p>
          <p className="text-zinc-400 italic">"The owl watches — but never reveals."</p>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <Gauge className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-mono">How It Works</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-mono font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Private Deposit Channel</h3>
                  <p className="text-zinc-400 leading-relaxed mb-2">
                    Each user receives a private deposit channel, a personal gateway into the protocol.
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Your unique deposit address is generated using advanced cryptographic techniques, ensuring that
                    deposits cannot be linked to your trading activity. The protocol monitors this address 24/7 and
                    automatically credits your off-chain balance within seconds of confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-mono font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Vault-Based Liquidity</h3>
                  <p className="text-zinc-400 leading-relaxed mb-2">
                    Funds are merged into vault-based liquidity pools, masking all wallet activity.
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Once deposited, your funds join a shared liquidity vault managed by the protocol. This pooling
                    mechanism makes it cryptographically impossible to trace individual user balances or trading
                    patterns on-chain. All balance tracking happens off-chain in our secure database, providing complete
                    privacy while maintaining instant access to your funds.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-mono font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Instant Execution</h3>
                  <p className="text-zinc-400 leading-relaxed mb-2">
                    Swaps are executed instantly through aggregate execution, and balances update off-chain — fast,
                    accurate, invisible.
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    When you initiate a swap, the protocol executes it through our main vault wallet using optimal
                    routing via Hide Protocol's smart routing engine. Your off-chain balance is updated immediately,
                    while the on-chain transaction appears as a single vault operation with no connection to your
                    identity. This approach combines Solana's speed with complete anonymity.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-mono font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Stealth Settlement</h3>
                  <p className="text-zinc-400 leading-relaxed mb-2">
                    Withdrawals occur through randomized, stealth settlement nodes, making it impossible to link sender
                    and receiver.
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    When you request a withdrawal, the protocol processes it through the main vault with randomized
                    timing and batching. Your funds arrive at your specified address with no on-chain connection to your
                    deposit or trading history. The entire flow is designed to break any possible link between your
                    identity and your trading activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-mono">Fee Structure</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-mono">0.01%</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider font-mono mb-2">Swap Fee</div>
              <p className="text-xs text-zinc-500">Per transaction</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-mono">0.5%</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider font-mono mb-2">Withdraw Fee</div>
              <p className="text-xs text-zinc-500">Per withdrawal</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/30 rounded-xl backdrop-blur-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2 font-mono">0%</div>
              <div className="text-sm text-primary uppercase tracking-wider font-mono mb-2">$HIDE Holders</div>
              <p className="text-xs text-primary/80">Complete privacy at zero cost</p>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-4">Fee Details</h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                <span className="text-primary font-mono">Swap Fee (0.01%):</span> Applied to every token swap. This
                minimal fee helps maintain the protocol infrastructure and liquidity pools.
              </p>
              <p>
                <span className="text-primary font-mono">Withdrawal Fee (0.5%):</span> Applied when withdrawing funds
                from the protocol to your external wallet. This fee covers the gas costs and stealth settlement
                processing.
              </p>
              <p>
                <span className="text-primary font-mono">$HIDE Holder Benefits:</span> Users holding $HIDE tokens enjoy
                zero fees on all operations. The more $HIDE you hold, the more you save. This creates a sustainable
                ecosystem where active traders are rewarded for their participation.
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-mono">Core Principles</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Anonymity</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed">On-chain silence, off-chain precision.</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Speed</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed">Solana-grade performance with sub-second execution.</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Security</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed">Multisig vaults, encrypted routing, audit-ready code.</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Fairness</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed">Ultra-low fees and rewards for $HIDE holders.</p>
            </div>
          </div>
        </section>

        {/* Developer API */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-mono">Developer API</h2>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono text-amber-500">
              COMING SOON
            </span>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm mb-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              The Hide Protocol API enables developers to integrate privacy-first trading directly into their
              applications. Execute anonymous swaps, manage user balances, and process withdrawals programmatically.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Terminal className="w-4 h-4" />
              <span className="font-mono">api.hide.trade</span>
            </div>
          </div>

          {/* Authentication */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Authentication
            </h3>
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <p className="text-zinc-400 mb-4">
                All API requests require authentication using an API key passed in the request headers:
              </p>
              <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-primary">
                  {`curl -X GET https://api.hide.trade/v1/tokens \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                API keys can be generated from your account dashboard. Keep your API key secure and never share it
                publicly.
              </p>
            </div>
          </div>

          {/* Endpoints */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">API Endpoints</h3>

            {/* Get Tokens */}
            <div className="mb-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-mono text-blue-400">
                  GET
                </span>
                <span className="font-mono text-sm text-zinc-300">/v1/tokens</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Retrieve list of available tokens for trading.</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Request</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-primary">
                      {`curl https://api.hide.trade/v1/tokens \\
  -H "X-API-Key: your_api_key_here"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Response</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400">
                      {`{
  "success": true,
  "tokens": [
    {
      "mint": "EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj",
      "symbol": "HIDE",
      "name": "Hide Protocol",
      "price": 0.0234,
      "volume24h": 1250000,
      "marketCap": 23400000,
      "change24h": 12.5
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Quote */}
            <div className="mb-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-400">
                  POST
                </span>
                <span className="font-mono text-sm text-zinc-300">/v1/swap/quote</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Get a swap quote for a token pair.</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Request</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-primary">
                      {`curl -X POST https://api.hide.trade/v1/swap/quote \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj",
    "amount": 1.0,
    "slippage": 0.5
  }'`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Response</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400">
                      {`{
  "success": true,
  "quote": {
    "inputAmount": 1.0,
    "outputAmount": 42.735,
    "priceImpact": 0.12,
    "fee": 0.0001,
    "route": "Hide Protocol"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Execute Swap */}
            <div className="mb-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-400">
                  POST
                </span>
                <span className="font-mono text-sm text-zinc-300">/v1/swap/execute</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Execute a swap transaction.</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Request</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-primary">
                      {`curl -X POST https://api.hide.trade/v1/swap/execute \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "user123",
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj",
    "amount": 1.0,
    "slippage": 0.5
  }'`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Response</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400">
                      {`{
  "success": true,
  "transaction": {
    "signature": "5j7s...",
    "inputAmount": 1.0,
    "outputAmount": 42.735,
    "timestamp": 1704067200
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Balance */}
            <div className="mb-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-mono text-blue-400">
                  GET
                </span>
                <span className="font-mono text-sm text-zinc-300">/v1/balance/:username</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Get user's off-chain balance.</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Request</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-primary">
                      {`curl https://api.hide.trade/v1/balance/user123 \\
  -H "X-API-Key: your_api_key_here"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Response</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400">
                      {`{
  "success": true,
  "balance": {
    "sol": 5.234,
    "tokens": {
      "EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj": 1250.5
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Withdrawal */}
            <div className="mb-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-400">
                  POST
                </span>
                <span className="font-mono text-sm text-zinc-300">/v1/withdraw</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Request a withdrawal to an external wallet.</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Request</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-primary">
                      {`curl -X POST https://api.hide.trade/v1/withdraw \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "user123",
    "amount": 5.0,
    "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Example Response</div>
                  <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400">
                      {`{
  "success": true,
  "withdrawal": {
    "id": "wd_abc123",
    "amount": 5.0,
    "fee": 0.025,
    "total": 4.975,
    "status": "processing",
    "estimatedArrival": "< 10 minutes"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Limits & Error Handling */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                Rate Limits
              </h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>
                  <span className="text-primary font-mono">Standard:</span> 100 requests/minute
                </p>
                <p>
                  <span className="text-primary font-mono">Premium:</span> 1000 requests/minute
                </p>
                <p className="text-xs text-zinc-500 mt-3">
                  Rate limits are enforced per API key. Upgrade to premium for higher limits.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Error Codes
              </h4>
              <div className="space-y-2 text-sm font-mono">
                <p>
                  <span className="text-red-400">400</span> <span className="text-zinc-500">Bad Request</span>
                </p>
                <p>
                  <span className="text-red-400">401</span> <span className="text-zinc-500">Unauthorized</span>
                </p>
                <p>
                  <span className="text-red-400">429</span> <span className="text-zinc-500">Rate Limit Exceeded</span>
                </p>
                <p>
                  <span className="text-red-400">500</span> <span className="text-zinc-500">Internal Server Error</span>
                </p>
              </div>
            </div>
          </div>

          {/* SDK Example */}
          <div className="p-6 bg-gradient-to-br from-primary/5 to-emerald-500/5 border border-primary/20 rounded-xl backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-3">JavaScript SDK Example</h4>
            <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-zinc-300">
                {`import { HideClient } from '@hide-protocol/sdk'

const client = new HideClient({
  apiKey: 'your_api_key_here'
})

// Get available tokens
const tokens = await client.getTokens()

// Execute a swap
const swap = await client.swap({
  username: 'user123',
  inputMint: 'So11111111111111111111111111111111111111112',
  outputMint: 'EiGmw1g6fJ22j9iEjEWY76EPLWg3Bffg3gJM6gMMQvAj',
  amount: 1.0,
  slippage: 0.5
})

console.log('Swap executed:', swap.transaction.signature)`}
              </pre>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <div className="p-8 bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold font-mono mb-6 text-center">The Philosophy</h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p className="text-center text-lg italic text-primary">"The owl watches — but never reveals."</p>
              <p>
                Hide stands for the wisdom of moving unseen — a protocol that protects traders, not just their assets.
              </p>
              <p>
                In a world where data is exposure, Hide returns privacy to finance — without sacrificing speed, access,
                or freedom.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Setup */}
        <section className="mb-16">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold font-mono mb-6">Brand Identity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-mono mb-2">Domain</div>
                <div className="text-lg font-mono text-primary">hide.trade</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-mono mb-2">Token</div>
                <div className="text-lg font-mono text-primary">$HIDE</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-mono mb-2">Identity</div>
                <div className="text-lg">🦉 The silent guardian of Solana</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-mono mb-2">Tagline</div>
                <div className="text-lg italic text-zinc-300">Trade wisely. Stay unseen.</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/app">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-black font-mono font-bold"
            >
              Start Trading Anonymously
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 backdrop-blur-sm bg-black/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-zinc-500 font-mono">
          © 2025 Hide Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
