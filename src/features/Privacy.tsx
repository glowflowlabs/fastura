"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site-config"

const Privacy = () => {
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

          <h1 className="text-3xl font-bold">Política de Privacidade</h1>
          <p className="text-muted-foreground text-sm">
            Atualizada em: 04 de Abril de 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Introdução</h2>
            <p>
              Bem-vindo à Política de Privacidade do FastSmart. Esta política
              descreve como coletamos, usamos, processamos e protegemos suas
              informações pessoais quando você usa nosso aplicativo de jejum
              intermitente com IA.
            </p>
            <p>
              Ao usar o FastSmart, você concorda com a coleta e uso de
              informações de acordo com esta política. Valorizamos sua
              privacidade e nos comprometemos a proteger suas informações
              pessoais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              2. Informações que Coletamos
            </h2>
            <p>Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Informações da Conta:</strong> Nome, endereço de e-mail
                e senha quando você se registra
              </li>
              <li>
                <strong>Informações de Perfil:</strong> Idade, gênero, altura,
                peso e objetivos de saúde
              </li>
              <li>
                <strong>Dados de Jejum:</strong> Horários de início e término do
                jejum, duração e frequência
              </li>
              <li>
                <strong>Dados de Uso:</strong> Como você interage com o
                aplicativo, quais recursos você usa e quanto tempo passa no
                aplicativo
              </li>
              <li>
                <strong>Informações do Dispositivo:</strong> Tipo de
                dispositivo, sistema operacional e versão do aplicativo
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              3. Como Usamos Suas Informações
            </h2>
            <p>Usamos as informações coletadas para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer, manter e melhorar o FastSmart</li>
              <li>
                Personalizar sua experiência e oferecer recomendações de jejum
                adaptadas às suas necessidades
              </li>
              <li>Enviar notificações relacionadas ao seu programa de jejum</li>
              <li>
                Analisar tendências e padrões de uso para melhorar nossos
                serviços
              </li>
              <li>
                Comunicar-se com você sobre atualizações, novos recursos ou
                informações relacionadas ao jejum intermitente
              </li>
              <li>
                Detectar, investigar e prevenir atividades fraudulentas ou não
                autorizadas
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              4. Compartilhamento de Informações
            </h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar suas
              informações nas seguintes circunstâncias:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Provedores de Serviço:</strong> Trabalhamos com
                terceiros que nos ajudam a fornecer e melhorar nosso serviço
              </li>
              <li>
                <strong>Conformidade Legal:</strong> Quando exigido por lei,
                regulamento ou processo legal
              </li>
              <li>
                <strong>Segurança:</strong> Para proteger os direitos,
                propriedade ou segurança do FastSmart, nossos usuários ou outros
              </li>
              <li>
                <strong>Com Seu Consentimento:</strong> Quando você nos autoriza
                a compartilhar suas informações
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para
              proteger suas informações contra acesso não autorizado, alteração,
              divulgação ou destruição. No entanto, nenhum método de transmissão
              pela Internet ou armazenamento eletrônico é 100% seguro, e não
              podemos garantir sua segurança absoluta.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Retenção de Dados</h2>
            <p>
              Retemos suas informações pessoais pelo tempo necessário para
              fornecer os serviços que você solicitou e cumprir nossas
              obrigações legais. Se você desejar excluir sua conta, suas
              informações pessoais serão removidas de nossos sistemas, exceto
              quando a retenção for necessária para cumprir obrigações legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Seus Direitos</h2>
            <p>
              Dependendo da sua localização, você pode ter direitos relacionados
              às suas informações pessoais, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acesso às suas informações pessoais</li>
              <li>Correção de informações imprecisas ou incompletas</li>
              <li>Exclusão de suas informações pessoais</li>
              <li>Restrição ou objeção ao processamento de suas informações</li>
              <li>Portabilidade de dados</li>
              <li>Retirada do consentimento a qualquer momento</li>
            </ul>
            <p>
              Para exercer esses direitos, entre em contato conosco usando as
              informações fornecidas no final desta política.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Crianças</h2>
            <p>
              O FastSmart não se destina a menores de 18 anos. Não coletamos
              intencionalmente informações pessoais de crianças. Se descobrirmos
              que coletamos informações pessoais de uma criança, tomaremos
              medidas para excluir essas informações de nossos servidores.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              9. Alterações a Esta Política
            </h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente.
              Notificaremos você sobre quaisquer alterações publicando a nova
              Política de Privacidade nesta página e, se as alterações forem
              significativas, forneceremos um aviso mais proeminente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre esta Política de
              Privacidade ou nossas práticas de privacidade, entre em contato
              conosco pelo e-mail: privacidade@fastsmart.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
