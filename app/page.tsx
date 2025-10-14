import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Vision } from "@/components/vision"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Vision />
      <Footer />
    </main>
  )
}
