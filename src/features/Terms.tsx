"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site-config"

const Terms = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/register">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {siteConfig.name}
            </h1>
            <p className="text-muted-foreground">{siteConfig.description}</p>
          </div>

          <h1 className="text-3xl font-bold">Termos de Serviço</h1>
          <p className="text-muted-foreground text-sm">
            Atualizado em: 04 de Abril de 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Introdução</h2>
            <p>
              Bem-vindo ao FastSmart. Estes Termos de Serviço{" "}
              <span className="font-bold">{`"Termos"`}</span> regem o seu acesso
              e uso do aplicativo FastSmart, incluindo qualquer conteúdo,
              funcionalidade e serviços oferecidos.
            </p>
            <p>
              Ao usar nosso serviço, você concorda com estes Termos. Por favor,
              leia-os cuidadosamente antes de começar a usar o FastSmart.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Uso do Serviço</h2>
            <p>
              O FastSmart é um aplicativo de jejum intermitente com IA que
              fornece orientações e acompanhamento para práticas de jejum
              intermitente. Nosso serviço não substitui aconselhamento médico
              profissional.
            </p>
            <p>Você concorda em:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Usar o serviço apenas para fins legais e de acordo com estes
                Termos
              </li>
              <li>
                Não usar o serviço de maneira que possa desabilitar,
                sobrecarregar ou prejudicar o funcionamento do servidor
              </li>
              <li>
                Não tentar acessar áreas do serviço às quais você não tem
                permissão
              </li>
              <li>
                Fornecer informações precisas durante o registro e uso do
                aplicativo
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Contas e Registro</h2>
            <p>
              Para acessar determinados recursos do nosso serviço, você pode
              precisar criar uma conta. Você é responsável por manter a
              confidencialidade de suas credenciais de conta e é totalmente
              responsável por todas as atividades realizadas em sua conta.
            </p>
            <p>
              Você concorda em notificar imediatamente o FastSmart sobre
              qualquer uso não autorizado da sua conta ou qualquer outra
              violação de segurança.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Conteúdo do Usuário</h2>
            <p>
              O FastSmart pode permitir que você envie, armazene ou compartilhe
              conteúdo. Você mantém seus direitos sobre qualquer conteúdo que
              enviar, mas concede ao FastSmart uma licença mundial, não
              exclusiva, sem royalties para usar, copiar, modificar, criar obras
              derivadas, distribuir e exibir esse conteúdo em conexão com o
              serviço.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              5. Isenção de Responsabilidade Médica
            </h2>
            <p>
              O FastSmart não é um substituto para aconselhamento médico
              profissional, diagnóstico ou tratamento. Sempre busque o conselho
              de seu médico ou outro profissional de saúde qualificado com
              qualquer dúvida que você possa ter sobre uma condição médica ou
              antes de iniciar qualquer programa de jejum intermitente.
            </p>
            <p>
              Não desconsidere o aconselhamento médico profissional ou demore em
              procurá-lo por causa de algo que você leu ou recebeu do FastSmart.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Alterações nos Termos</h2>
            <p>
              O FastSmart reserva-se o direito de modificar ou substituir estes
              Termos a qualquer momento. Se uma revisão for material, tentaremos
              fornecer um aviso de pelo menos 30 dias antes que quaisquer novos
              termos entrem em vigor.
            </p>
            <p>
              O uso continuado do serviço após a publicação das alterações
              constitui aceitação dessas alterações.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Cancelamento</h2>
            <p>
              Você pode encerrar sua conta a qualquer momento indo para as
              configurações da conta e seguindo os passos para cancelamento.
            </p>
            <p>
              O FastSmart pode encerrar ou suspender sua conta imediatamente,
              sem aviso prévio ou responsabilidade, por qualquer motivo,
              incluindo, sem limitação, se você violar estes Termos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              8. Limitação de Responsabilidade
            </h2>
            <p>
              Em nenhuma circunstância o FastSmart, seus diretores,
              funcionários, parceiros, agentes, fornecedores ou afiliados serão
              responsáveis por quaisquer danos indiretos, incidentais,
              especiais, consequenciais ou punitivos, incluindo, sem limitação,
              perda de lucros, dados, uso, boa vontade ou outras perdas
              intangíveis, resultantes do seu acesso ou uso ou incapacidade de
              acessar ou usar o serviço.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Lei Aplicável</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis
              do Brasil, sem considerar seus princípios de conflito de leis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato
              conosco pelo e-mail: contato@fastsmart.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
