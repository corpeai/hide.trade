import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "WebSocket service is running",
      status: "connected",
    })
  } catch (error) {
    console.error("WebSocket status error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "WebSocket service error",
      },
      { status: 500 },
    )
  }
}
