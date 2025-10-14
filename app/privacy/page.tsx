import { Shield } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
                Privacy Policy
              </span>
            </h1>
            <p className="text-zinc-500 font-mono">Last updated: January 2025</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="space-y-8 text-zinc-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  Hide Protocol ("we," "our," or "the Protocol") is committed to protecting user privacy. This Privacy
                  Policy explains how we handle information when you use our decentralized protocol.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-bold text-white mb-3">On-Chain Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wallet addresses that interact with the Protocol</li>
                  <li>Transaction hashes and timestamps</li>
                  <li>Token amounts and types traded</li>
                </ul>
                <h3 className="text-xl font-bold text-white mb-3 mt-4">Off-Chain Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP addresses (temporarily, for DDoS protection)</li>
                  <li>Browser type and device information</li>
                  <li>Usage analytics (anonymized)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain the Protocol's functionality</li>
                  <li>To detect and prevent fraud or abuse</li>
                  <li>To improve user experience and Protocol performance</li>
                  <li>To comply with legal obligations when required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Privacy Features</h2>
                <p>Hide Protocol implements several privacy-enhancing features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unique deposit addresses for each user</li>
                  <li>Aggregated liquidity vaults that obscure individual transactions</li>
                  <li>Off-chain balance tracking to minimize on-chain footprint</li>
                  <li>Optional withdrawal routing delays for enhanced privacy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing</h2>
                <p>We do not sell or share your personal information with third parties, except:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>When required by law or legal process</li>
                  <li>To protect the rights and safety of the Protocol and its users</li>
                  <li>With service providers who assist in Protocol operations (under strict confidentiality)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect user data, including encryption,
                  multi-signature wallets, and regular security audits. However, no system is completely secure, and we
                  cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Blockchain Transparency</h2>
                <p>
                  Please note that blockchain transactions are public and permanent. While Hide Protocol obscures the
                  link between users and transactions, determined adversaries with sufficient resources may be able to
                  analyze on-chain data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have rights to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Object to certain data processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify users of material changes through
                  the Protocol interface or other appropriate channels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                <p>
                  For privacy-related questions or concerns, please contact us through our official communication
                  channels listed on hide.trade.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
