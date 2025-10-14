"use client"

import { Button } from "@/components/ui/button"
import { Terminal, ArrowRight, Code2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "$ hide protocol --mode=stealth --chain=solana"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,65,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]" />

      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded font-mono text-xs">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary">MAINNET</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3 text-zinc-500">
                  <Terminal className="w-4 h-4" />
                  <span>terminal@hide:~</span>
                </div>
                <div className="text-primary">
                  {displayText}
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-none">
                  <span className="text-white">Trade</span>
                  <br />
                  <span className="text-primary">Without</span>
                  <br />
                  <span className="text-white">Traces</span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-cyan-500" />
              </div>

              <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                Anonymous swaps on Solana. No KYC. No tracking. No compromises.
                <span className="text-primary"> Your trades, your business.</span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/app">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-black font-bold px-8 h-12 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                  >
                    START TRADING
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="border border-zinc-700 hover:border-primary/50 hover:bg-primary/5 h-12 px-8"
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    READ DOCS
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-primary font-mono">0.5%</div>
                  <div className="text-zinc-500">Platform Fee</div>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div>
                  <div className="text-2xl font-bold text-primary font-mono">&lt;1s</div>
                  <div className="text-zinc-500">Settlement</div>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div>
                  <div className="text-2xl font-bold text-primary font-mono">100%</div>
                  <div className="text-zinc-500">Private</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                  <span className="text-zinc-500">example.ts</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
                <pre className="text-xs leading-relaxed">
                  <code>
                    <span className="text-purple-400">import</span> <span className="text-cyan-400">{"{ Hide }"}</span>{" "}
                    <span className="text-purple-400">from</span> <span className="text-amber-400">'@hide/sdk'</span>
                    {"\n\n"}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">hide</span> ={" "}
                    <span className="text-purple-400">new</span> <span className="text-cyan-400">Hide</span>()
                    {"\n\n"}
                    <span className="text-zinc-500">// Anonymous swap</span>
                    {"\n"}
                    <span className="text-purple-400">await</span> hide.<span className="text-cyan-400">swap</span>(
                    {"{"}
                    {"\n  "}from: <span className="text-amber-400">'SOL'</span>,{"\n  "}to:{" "}
                    <span className="text-amber-400">'USDC'</span>,{"\n  "}amount:{" "}
                    <span className="text-amber-400">1.5</span>,{"\n  "}privacy:{" "}
                    <span className="text-amber-400">'maximum'</span>
                    {"\n})"}
                    {"\n\n"}
                    <span className="text-zinc-500">// ✓ Trade executed</span>
                    {"\n"}
                    <span className="text-zinc-500">// ✓ Identity protected</span>
                    {"\n"}
                    <span className="text-zinc-500">// ✓ No traces left</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
