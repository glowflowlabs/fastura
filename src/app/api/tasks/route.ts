import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const data = await prisma.tarefas.findMany()

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
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

    // 1. Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    await prisma.tarefas.create({
      data: {
        titulo: body.title ?? "",
        usuario_email: body.email ?? "",
        completa: false,
      },
    })

    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Validar e extrair dados do corpo
    const body = await req.json()

    await prisma.tarefas.update({
      where: {
        id: body.id,
      },
      data: {
        titulo: body.title,
        completa: body.completed,
        updated_at: new Date().toISOString(),
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
