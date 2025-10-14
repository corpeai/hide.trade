import { Shield, Twitter, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-mono">
                Hide<span className="text-primary"> Protocol</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The privacy layer for Solana traders. Trade anonymously, withdraw stealthily.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold font-mono text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/app" className="hover:text-primary transition-colors">
                  Launch App
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-bold font-mono text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/docs#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-bold font-mono text-sm uppercase tracking-wider">Community</h4>
            <div className="flex gap-4">
              <a
                href="https://x.com/HideProtocol"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/HideTrade"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                aria-label="View our GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-mono">© 2025 Hide. All rights reserved.</p>
          <div className="flex gap-6 font-mono">
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="/disclaimer" className="hover:text-primary transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
