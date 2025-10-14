import { Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DisclaimerPage() {
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
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Disclaimer</span>
            </h1>
            <p className="text-zinc-500 font-mono">Last updated: January 2025</p>
          </div>

          {/* Warning Banner */}
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-6 mb-8 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-2">Important Notice</h3>
              <p className="text-zinc-300">
                Please read this disclaimer carefully before using Hide Protocol. By using the Protocol, you acknowledge
                and accept all risks outlined below.
              </p>
            </div>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="space-y-8 text-zinc-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. No Financial Advice</h2>
                <p>
                  Hide Protocol does not provide financial, investment, legal, or tax advice. All information provided
                  is for informational purposes only. You should consult with appropriate professionals before making
                  any financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Risk of Loss</h2>
                <p>
                  Trading cryptocurrencies involves substantial risk of loss. You may lose some or all of your invested
                  capital. Key risks include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Market volatility and price fluctuations</li>
                  <li>Smart contract vulnerabilities or bugs</li>
                  <li>Network congestion and failed transactions</li>
                  <li>Loss of private keys or wallet access</li>
                  <li>Regulatory changes affecting cryptocurrency use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. No Guarantees</h2>
                <p>Hide Protocol makes no guarantees regarding:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Availability or uptime of the Protocol</li>
                  <li>Transaction success or execution speed</li>
                  <li>Privacy or anonymity of transactions</li>
                  <li>Protection against all forms of analysis or tracking</li>
                  <li>Future value or performance of any cryptocurrency</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Experimental Technology</h2>
                <p>
                  Hide Protocol is built on experimental blockchain technology. Smart contracts, while audited, may
                  contain undiscovered vulnerabilities. The Protocol is provided "as is" without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Regulatory Uncertainty</h2>
                <p>
                  Cryptocurrency regulations vary by jurisdiction and are subject to change. It is your responsibility
                  to ensure compliance with all applicable laws in your location. Hide Protocol does not guarantee
                  compliance with any specific regulatory framework.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Privacy Limitations</h2>
                <p>
                  While Hide Protocol implements privacy-enhancing features, it cannot guarantee complete anonymity.
                  Sophisticated blockchain analysis, network monitoring, or other techniques may potentially compromise
                  privacy. Users should not rely solely on the Protocol for privacy-critical activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
                <p>
                  The Protocol may integrate with third-party services, wallets, or protocols. We are not responsible
                  for the functionality, security, or privacy practices of these third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. User Responsibility</h2>
                <p>You are solely responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Securing your wallet and private keys</li>
                  <li>Verifying transaction details before confirmation</li>
                  <li>Understanding the risks of cryptocurrency trading</li>
                  <li>Complying with applicable laws and regulations</li>
                  <li>Conducting your own research before trading</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. No Liability</h2>
                <p>
                  To the fullest extent permitted by law, Hide Protocol, its developers, and contributors shall not be
                  liable for any losses, damages, or claims arising from your use of the Protocol, including but not
                  limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Loss of funds due to user error or negligence</li>
                  <li>Smart contract failures or exploits</li>
                  <li>Network issues or transaction failures</li>
                  <li>Privacy breaches or data exposure</li>
                  <li>Regulatory actions or legal consequences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Acknowledgment</h2>
                <p>
                  By using Hide Protocol, you acknowledge that you have read, understood, and accepted this disclaimer
                  and all associated risks. You agree to use the Protocol at your own risk and hold harmless all parties
                  involved in its development and operation.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
