import { Shield, ChevronDown } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "What is Hide Protocol?",
    answer:
      "Hide Protocol is a privacy-first trading layer built on Solana. It allows users to swap tokens and withdraw funds anonymously through aggregated liquidity vaults and private balance channels.",
  },
  {
    question: "How does Hide ensure privacy?",
    answer:
      "Every user interacts through a unique private deposit address. Funds are merged into a shared liquidity vault, making it impossible to trace who traded or withdrew. On-chain activity reveals only the vault — never the user.",
  },
  {
    question: "Is Hide Protocol custodial?",
    answer:
      "Hide operates as a hybrid system — custody is managed through secure, multi-sig vaults while user balances are tracked off-chain for instant execution. Withdrawals remain 100% under user control.",
  },
  {
    question: "What are the trading fees?",
    answer: "Swaps: 0.01% • Withdrawals: 0.5% • $HIDE holders: Pay 0% fees on all actions within the protocol.",
  },
  {
    question: "What is the $HIDE token used for?",
    answer:
      "$HIDE is the governance and utility token of Hide Protocol. Holders enjoy zero trading fees, priority access to vaults, governance rights, and a share of protocol-level incentives.",
  },
  {
    question: "Can anyone trace my transactions on Solana Explorer?",
    answer:
      "No — external observers only see aggregated vault interactions. The routing, timing, and user-level flow are hidden by design. On-chain, all swaps appear as movements between protocol-controlled addresses.",
  },
  {
    question: "Is Hide safe to use?",
    answer:
      "Yes. The protocol employs multi-sig vaults, audited smart contracts, and risk monitoring systems to secure user assets. Transparency reports and audits will be publicly available at launch.",
  },
  {
    question: "How fast are swaps and withdrawals?",
    answer:
      "Hide leverages Solana's high throughput — swaps execute instantly, and withdrawals settle in seconds. For stealth mode withdrawals, optional delay routing can be enabled for extra privacy.",
  },
  {
    question: "What makes Hide different from normal DEXs?",
    answer:
      "DEXs reveal every transaction publicly. Hide focuses on execution without exposure — keeping trades private while maintaining liquidity and speed. Think of it as a CEX experience, but fully decentralized and invisible.",
  },
  {
    question: "How can I get started?",
    answer:
      "Visit hide.trade, deposit your wallet, and your private vault balance updates instantly — from there, you can swap, withdraw, and trade in complete privacy.",
  },
]

export default function FAQPage() {
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

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-sm font-mono text-primary">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">Everything you need to know about Hide Protocol</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-12 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-primary/30 transition-all"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-bold font-mono pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-zinc-400 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h3>
              <p className="text-zinc-400 mb-6 text-lg">Check out our documentation or reach out to the community</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs"
                  className="px-8 py-3 bg-primary text-black font-mono font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Read Documentation
                </Link>
                <Link
                  href="https://x.com/HideProtocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-zinc-800 border border-zinc-700 font-mono font-bold rounded-lg hover:border-primary/50 transition-colors"
                >
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
