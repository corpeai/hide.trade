"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Shield, Terminal, Lock, User, Send, Eye, EyeOff, Zap, CheckCircle2 } from "lucide-react"

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [telegram, setTelegram] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register"
      const body = mode === "login" ? { username, password } : { username, password, telegram: telegram || undefined }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Authentication failed")
        return
      }

      localStorage.setItem("username", username)
      console.log("[v0] AuthScreen: Username saved to localStorage:", username)

      onAuthSuccess()
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div
        className={`w-full max-w-7xl grid lg:grid-cols-[360px_1fr] gap-6 relative z-10 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="hidden lg:flex flex-col justify-center p-6 border border-primary/20 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,65,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="mb-6">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h1 className="text-3xl font-mono font-bold tracking-tight">
                  <span className="text-primary animate-pulse">{">"}</span>{" "}
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Hide</span>
                </h1>
                <p className="text-lg font-mono font-bold text-primary/80">PROTOCOL</p>
              </div>

              <p className="text-gray-400 font-mono text-xs leading-relaxed">
                Secure privacy layer
                <br />
                <span className="text-primary/60">// Solana network</span>
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { icon: Terminal, title: "Anonymous", desc: "Zero-knowledge trading" },
                { icon: Lock, title: "Encrypted", desc: "Military-grade security" },
                { icon: Shield, title: "Private", desc: "Stealth withdrawals" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:translate-x-1 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover/item:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white font-bold">{feature.title}</p>
                    <p className="font-mono text-[10px] text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border border-primary/20 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">Status</p>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white font-bold">Solana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-primary font-bold">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 lg:p-10 border border-primary/20 rounded-2xl bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,65,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/40 rounded-br-2xl animate-pulse" />

            <div className="absolute top-10 right-10 w-2 h-2 bg-primary/40 rounded-full animate-ping" />
            <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-primary/30 rounded-full animate-ping delay-500" />

            <div className="relative z-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
                  <span className="text-primary font-mono text-xs">AUTHENTICATION_REQUIRED</span>
                </div>
                <h2 className="text-4xl font-mono font-bold text-white mb-2 tracking-tight">
                  {mode === "login" ? (
                    <>
                      <span className="text-primary">{">"}</span> Access
                    </>
                  ) : (
                    <>
                      <span className="text-primary">{">"}</span> Initialize
                    </>
                  )}
                </h2>
                <p className="text-sm font-mono text-gray-400">
                  {mode === "login" ? "Enter credentials to continue" : "Create your secure identity"}
                </p>
              </div>

              <div className="flex gap-2 mb-8 p-1 bg-black/60 border border-primary/20 rounded-xl backdrop-blur-sm">
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-3 px-6 font-mono text-sm font-bold rounded-lg transition-all duration-300 relative overflow-hidden ${
                    mode === "login"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {mode === "login" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  )}
                  <span className="relative">LOGIN</span>
                </button>
                <button
                  onClick={() => setMode("register")}
                  className={`flex-1 py-3 px-6 font-mono text-sm font-bold rounded-lg transition-all duration-300 relative overflow-hidden ${
                    mode === "register"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {mode === "register" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  )}
                  <span className="relative">REGISTER</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-3 uppercase tracking-wider">
                    <User className="w-4 h-4 text-primary" />
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-5 py-4 bg-black/60 border border-primary/20 rounded-xl font-mono text-sm text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all backdrop-blur-sm"
                      placeholder="Enter your username"
                      required
                      minLength={3}
                      maxLength={20}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-3 uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-primary" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-5 py-4 pr-12 bg-black/60 border border-primary/20 rounded-xl font-mono text-sm text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all backdrop-blur-sm"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Telegram (Register only) */}
                {mode === "register" && (
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-3 uppercase tracking-wider">
                      <Send className="w-4 h-4 text-primary" />
                      Telegram <span className="text-primary/60 text-[10px]">(optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        className="w-full px-5 py-4 bg-black/60 border border-primary/20 rounded-xl font-mono text-sm text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all backdrop-blur-sm"
                        placeholder="@username"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="p-4 border border-red-500/30 rounded-xl bg-red-500/10 backdrop-blur-sm animate-shake">
                    <p className="text-xs font-mono text-red-400 flex items-center gap-2">
                      <span className="text-red-500">✕</span> {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-black font-mono font-bold text-sm rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all shadow-[0_0_30px_rgba(0,255,65,0.3)] hover:shadow-[0_0_40px_rgba(0,255,65,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <span className="text-black/60">{">"}</span>
                        {mode === "login" ? "AUTHENTICATE" : "CREATE_ACCOUNT"}
                        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                {mode === "register" && (
                  <div className="p-4 border border-primary/20 rounded-xl bg-primary/5 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        A unique Solana wallet will be automatically generated for your deposits.
                        <br />
                        <span className="text-primary/80">// Keep your credentials safe</span>
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="lg:hidden mt-6 text-center">
            <p className="text-xs font-mono text-gray-500">
              <span className="text-primary">$</span> Powered by Solana • Privacy First
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
