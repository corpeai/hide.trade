import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Unique Deposit Address",
    description:
      "Each user receives a private deposit address. Funds are aggregated into the protocol vault, breaking the link between your wallet and trading activity.",
  },
  {
    number: "02",
    title: "Off-Chain Balance Tracking",
    description:
      "Your balance is tracked securely off-chain while trades execute through the main liquidity pool, ensuring complete privacy.",
  },
  {
    number: "03",
    title: "Anonymous Trade Execution",
    description:
      "All swaps are performed by the protocol vault, making it impossible for observers to link transactions to individual users.",
  },
  {
    number: "04",
    title: "Private Withdrawal",
    description:
      "Withdraw to any Solana address with optional routing delays to maximize privacy and break timing analysis.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-32 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-mono text-primary">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Privacy by Design
            </span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            A four-step process that ensures complete trading anonymity
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-zinc-900 border-2 border-primary/30 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-bold font-mono text-primary">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-primary/30 transition-all backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4 font-mono">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>

              {/* Connector arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center py-6">
                  <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
