"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TokenChartProps {
  mint: string
}

export function TokenChart({ mint }: TokenChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [interval, setInterval] = useState("5m")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
    const intervalId = setInterval(fetchChartData, 10000) // Update every 10s
    return () => clearInterval(intervalId)
  }, [mint, interval])

  const fetchChartData = async () => {
    try {
      const res = await fetch(`/api/tokens/${mint}/chart?interval=${interval}`)
      const data = await res.json()

      if (data.success) {
        setChartData(data.candles)
      }
    } catch (error) {
      console.error("[v0] Error fetching chart:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center border border-[#00ff41]/20 rounded-lg bg-black/40">
        <div className="text-[#00ff41] font-mono">Loading chart...</div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center border border-[#00ff41]/20 rounded-lg bg-black/40">
        <div className="text-gray-500 font-mono">No chart data available</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["1m", "5m", "15m", "1h", "4h", "1d"].map((int) => (
          <button
            key={int}
            onClick={() => setInterval(int)}
            className={`px-3 py-1 rounded font-mono text-sm transition-all ${
              interval === int
                ? "bg-[#00ff41] text-black"
                : "bg-black/40 text-[#00ff41] border border-[#00ff41]/20 hover:border-[#00ff41]/50"
            }`}
          >
            {int}
          </button>
        ))}
      </div>

      <div className="h-[400px] border border-[#00ff41]/20 rounded-lg bg-black/40 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              stroke="#00ff41"
              style={{ fontSize: "12px", fontFamily: "monospace" }}
            />
            <YAxis
              stroke="#00ff41"
              style={{ fontSize: "12px", fontFamily: "monospace" }}
              tickFormatter={(value) => `$${value.toFixed(6)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                border: "1px solid #00ff41",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
              labelFormatter={(time) => new Date(time).toLocaleString()}
              formatter={(value: any) => [`$${value.toFixed(8)}`, "Price"]}
            />
            <Line type="monotone" dataKey="close" stroke="#00ff41" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
