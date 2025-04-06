import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("startDate")

  try {
    const data = await prisma.trabalho.findMany({
      where: {
        tipo: "trabalho",
        data_inicio: {
          gte: startDate ? new Date(startDate) : new Date(),
        },
      },
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar sessões" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Validar e extrair dados do corpo
    const body = await req.json()

    const newTrabalho = await prisma.trabalho.create({
      data: {
        usuario_email: session.user.email ?? "",
        tipo: body.tipo || "trabalho",
        duracao_minutos: body.duracao_minutos || 25,
        data_fim: new Date(body.data_fim || new Date()),
      },
    })

    return NextResponse.json(newTrabalho, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar trabalho:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
