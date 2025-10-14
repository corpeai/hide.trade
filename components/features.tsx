import { Shield, Zap, Eye, Lock, Database, DollarSign } from "lucide-react"

const features = [
  {
    icon: Lock,
    title: "Zero-Knowledge Swaps",
    description: "Trade without revealing your wallet identity to the blockchain",
    metric: "100%",
    label: "Anonymous",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Sub-second execution on Solana's high-performance network",
    metric: "<1s",
    label: "Speed",
  },
  {
    icon: Shield,
    title: "Stealth Withdrawals",
    description: "Randomized routing breaks on-chain analysis patterns",
    metric: "Multi-hop",
    label: "Privacy",
  },
  {
    icon: Database,
    title: "Off-Chain Ledger",
    description: "Secure balance tracking with instant updates",
    metric: "Real-time",
    label: "Updates",
  },
  {
    icon: Eye,
    title: "No KYC Required",
    description: "Start trading immediately without identity verification",
    metric: "0",
    label: "Documents",
  },
  {
    icon: DollarSign,
    title: "Low Fees",
    description: "Competitive 0.5% platform fee with transparent pricing",
    metric: "0.5%",
    label: "Fee",
  },
]

export function Features() {
  return (
    <section className="relative py-24 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-mono text-primary">PROTOCOL FEATURES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="text-primary">Privacy</span>
          </h2>
          <p className="text-lg text-zinc-400">Enterprise-grade infrastructure designed for anonymous trading</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-zinc-950 border border-zinc-800 hover:border-primary/30 transition-all duration-300 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/50 transition-colors" />

              <div className={`p-6 ${index === 0 ? "lg:p-8" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center ${
                      index === 0 ? "w-16 h-16" : "w-12 h-12"
                    }`}
                  >
                    <feature.icon className={`text-primary ${index === 0 ? "w-8 h-8" : "w-6 h-6"}`} />
                  </div>

                  <div className="text-right">
                    <div className={`font-mono font-bold text-primary ${index === 0 ? "text-2xl" : "text-lg"}`}>
                      {feature.metric}
                    </div>
                    <div className="text-xs text-zinc-500">{feature.label}</div>
                  </div>
                </div>

                <h3 className={`font-bold mb-2 ${index === 0 ? "text-2xl" : "text-lg"}`}>{feature.title}</h3>

                <p className={`text-zinc-400 leading-relaxed ${index === 0 ? "text-base" : "text-sm"}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
