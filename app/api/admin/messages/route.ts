import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
const messages = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Web Development Project",
    message: "Hi Jeff, I would like to discuss a potential web development project...",
    timestamp: new Date().toISOString(),
    status: "unread",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@techcorp.com",
    subject: "Security Consultation",
    message: "We need a security audit for our application...",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: "read",
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    email: "lisa@startup.io",
    subject: "Full-stack Development",
    message: "Looking for a full-stack developer for our startup...",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: "replied",
  },
]

export async function GET() {
  return NextResponse.json({ messages })
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    const messageIndex = messages.findIndex((msg) => msg.id === id)
    if (messageIndex === -1) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }

    messages[messageIndex].status = status

    return NextResponse.json({
      success: true,
      message: "Message status updated",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
