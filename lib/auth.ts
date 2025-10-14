import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export interface Session {
  username: string
  createdAt: number
}

// In-memory session storage (for demo purposes)
// In production, use a proper database
const sessions = new Map<string, Session>()

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("hide_session")?.value

  if (!sessionId) return null

  const session = sessions.get(sessionId)
  return session || null
}

export async function createSession(username: string): Promise<string> {
  const sessionId = crypto.randomUUID()
  const session: Session = {
    username,
    createdAt: Date.now(),
  }

  sessions.set(sessionId, session)

  const cookieStore = await cookies()
  cookieStore.set("hide_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  })

  return sessionId
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("hide_session")?.value

  if (sessionId) {
    sessions.delete(sessionId)
  }

  cookieStore.delete("hide_session")
}

export async function verifySession(request: NextRequest): Promise<{ username: string } | null> {
  const sessionId = request.cookies.get("hide_session")?.value

  if (!sessionId) {
    return null
  }

  const session = sessions.get(sessionId)

  if (!session) {
    return null
  }

  return { username: session.username }
}
