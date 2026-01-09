import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body
    const serverPassword = process.env.PASSWORD

    if (!serverPassword) {
      return NextResponse.json({ valid: true })
    }

    if (password === serverPassword) {
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({ valid: false }, { status: 401 })
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
