import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import Link from "next/link"

export function Vision() {
  return (
    <section className="relative py-24 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="h-1 w-16 bg-primary" />
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Privacy is a
                  <br />
                  <span className="text-primary">Right</span>, Not a
                  <br />
                  Feature
                </h2>
              </div>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Hide Protocol makes privacy the default experience in DeFi. We're building a financial rail where
                liquidity meets confidentiality, where your trading activity stays yours.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-zinc-300">Non-custodial architecture</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-zinc-300">Open-source protocol</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-zinc-300">Community-driven development</span>
                </div>
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="space-y-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Ready to Trade?</h3>
                  <p className="text-zinc-400">
                    Start trading anonymously in seconds. No signup, no KYC, no compromises.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/app" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12">
                      LAUNCH APP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <Link href="https://github.com/HideTrade" target="_blank" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-zinc-700 hover:border-primary/50 hover:bg-primary/5 h-12 bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      VIEW ON GITHUB
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary font-mono mb-1">24/7</div>
                  <div className="text-xs text-zinc-500">Uptime</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary font-mono mb-1">Multi-Sig</div>
                  <div className="text-xs text-zinc-500">Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
