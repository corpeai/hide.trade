"use client"

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface ToastProps {
  id: string
  type: "success" | "error"
  title: string
  message: string
  txSignature?: string
  onClose: (id: string) => void
}

export function ToastNotification({ id, type, title, message, txSignature, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 8000) // Auto-close after 8 seconds

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className={`
        relative w-full max-w-md p-4 rounded-lg border-2 backdrop-blur-sm
        shadow-[0_0_40px_rgba(0,255,65,0.3)] animate-in slide-in-from-right
        ${
          type === "success"
            ? "bg-gradient-to-br from-black via-black to-primary/10 border-primary/60"
            : "bg-gradient-to-br from-black via-black to-red-500/10 border-red-500/60"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {type === "success" ? (
            <CheckCircle className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-mono font-bold text-sm mb-1 ${type === "success" ? "text-primary" : "text-red-500"}`}>
            {title}
          </h4>
          <p className="text-xs text-white/80 font-mono leading-relaxed whitespace-pre-line">{message}</p>

          {txSignature && (
            <a
              href={`https://solscan.io/tx/${txSignature}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded
                font-mono text-xs font-bold transition-all
                ${
                  type === "success"
                    ? "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40"
                    : "bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/40"
                }
              `}
            >
              <ExternalLink className="w-3 h-3" />
              VIEW ON SOLSCAN
            </a>
          )}
        </div>

        <button
          onClick={() => onClose(id)}
          className={`
            flex-shrink-0 p-1 rounded transition-all
            ${
              type === "success"
                ? "hover:bg-primary/20 text-primary/60 hover:text-primary"
                : "hover:bg-red-500/20 text-red-500/60 hover:text-red-500"
            }
          `}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
