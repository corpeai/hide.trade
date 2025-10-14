import { Shield } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-mono">
                Hide<span className="text-primary"> Protocol</span>
              </span>
            </Link>
            <Link
              href="/app"
              className="px-6 py-2 bg-primary text-black font-mono font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-sm font-mono text-primary">LEGAL</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-zinc-500 font-mono">Last updated: January 2025</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="space-y-8 text-zinc-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Hide Protocol ("the Protocol"), you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, do not use the Protocol.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p>
                  Hide Protocol is a decentralized privacy layer built on Solana that enables anonymous token swaps and
                  withdrawals. The Protocol operates through smart contracts and does not custody user funds directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for maintaining the security of your wallet and private keys</li>
                  <li>You must comply with all applicable laws and regulations in your jurisdiction</li>
                  <li>You acknowledge that cryptocurrency transactions are irreversible</li>
                  <li>You understand the risks associated with decentralized finance (DeFi) protocols</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Activities</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Protocol for any illegal activities or money laundering</li>
                  <li>Attempt to manipulate or exploit the Protocol's smart contracts</li>
                  <li>Interfere with the operation of the Protocol or other users' access</li>
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Fees</h2>
                <p>
                  The Protocol charges fees for swaps (0.01%) and withdrawals (0.5%). $HIDE token holders may be
                  eligible for fee discounts. Fees are subject to change with notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Risks and Disclaimers</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cryptocurrency trading involves substantial risk of loss</li>
                  <li>Smart contracts may contain bugs or vulnerabilities</li>
                  <li>The Protocol does not guarantee privacy or anonymity</li>
                  <li>Network congestion may affect transaction speed and costs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Hide Protocol and its contributors shall not be liable for any
                  direct, indirect, incidental, special, or consequential damages arising from your use of the Protocol.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Modifications</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Continued use of the Protocol after changes
                  constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable international laws
                  regarding decentralized protocols.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
                <p>
                  For questions about these Terms, please contact us through our official communication channels listed
                  on hide.trade.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
