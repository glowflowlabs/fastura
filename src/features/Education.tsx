import AppLayout from "@/components/layout/AppLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Education = () => {
  return (
    <AppLayout>
      <div className="space-y-6 pb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Aprenda sobre Jejum
          </h1>
          <p className="text-muted-foreground">
            Conheça os benefícios e melhores práticas do jejum intermitente.
          </p>
        </div>

        <Tabs defaultValue="basics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basics">Conceitos Básicos</TabsTrigger>
            <TabsTrigger value="science">Ciência</TabsTrigger>
            <TabsTrigger value="tips">Dicas Práticas</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>O que é Jejum Intermitente?</CardTitle>
                <CardDescription>
                  Uma introdução ao conceito e principais protocolos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O jejum intermitente não é uma dieta, mas um padrão alimentar
                  que alterna entre períodos de jejum e alimentação. Diferente
                  das dietas tradicionais, não especifica quais alimentos você
                  deve comer, mas quando você deve comê-los.
                </p>
                <h3 className="text-lg font-semibold">Protocolos populares:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">16/8:</span> Jejuar por 16
                    horas e alimentar-se em uma janela de 8 horas
                  </li>
                  <li>
                    <span className="font-medium">5:2:</span> Comer normalmente
                    por 5 dias e restringir calorias em 2 dias não consecutivos
                  </li>
                  <li>
                    <span className="font-medium">OMAD:</span> Uma refeição por
                    dia, geralmente em uma janela de 1 hora
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefícios Comprovados</CardTitle>
                <CardDescription>
                  Resultados observados em estudos científicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Perda de peso e gordura corporal</li>
                  <li>Melhora da sensibilidade à insulina</li>
                  <li>Redução da inflamação</li>
                  <li>Aumento da autofagia (limpeza celular)</li>
                  <li>Melhora na concentração e clareza mental</li>
                  <li>Potencial aumento da longevidade</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="science" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mecanismos Biológicos</CardTitle>
                <CardDescription>
                  Como o jejum afeta o corpo humano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Alterações Hormonais</h3>
                <p>
                  Durante o jejum, seus níveis de insulina diminuem
                  significativamente, facilitando a queima de gordura. Níveis
                  mais altos do hormônio do crescimento (GH) também ocorrem, o
                  que beneficia a queima de gordura e o ganho muscular.
                </p>

                <h3 className="text-lg font-semibold">Autofagia</h3>
                <p>
                  A autofagia é um processo de limpeza celular no qual o corpo
                  remove componentes celulares disfuncionais. Este processo é
                  intensificado durante o jejum e pode ter efeitos positivos
                  contra o envelhecimento e doenças crônicas.
                </p>

                <h3 className="text-lg font-semibold">
                  Alteração do Metabolismo
                </h3>
                <p>
                  Após horas sem ingestão de alimentos, o corpo esgota o
                  glicogênio (reserva de carboidratos) e começa a usar a gordura
                  como fonte primária de energia, produzindo cetonas - um
                  combustível eficiente para o cérebro.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estudos Recentes</CardTitle>
                <CardDescription>
                  Descobertas científicas atuais sobre jejum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Estudos recentes têm demonstrado que o jejum intermitente pode
                  ter benefícios além da perda de peso, incluindo potenciais
                  efeitos protetores contra doenças neurodegenerativas como
                  Alzheimer e Parkinson.
                </p>
                <p>
                  Pesquisas em 2022 também sugerem que o jejum pode reprogramar
                  positivamente o metabolismo, melhorando a eficiência
                  energética das células mesmo nos períodos de alimentação.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Começando com Segurança</CardTitle>
                <CardDescription>
                  Dicas para iniciantes no jejum intermitente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Comece gradualmente (ex: jejum de 12h antes de tentar 16h)
                  </li>
                  <li>Beba muita água durante o período de jejum</li>
                  <li>
                    Consuma eletrólitos (sódio, potássio, magnésio) se
                    necessário
                  </li>
                  <li>
                    Evite exercícios de alta intensidade nos primeiros dias
                  </li>
                  <li>Quebre o jejum com uma refeição leve e balanceada</li>
                  <li>
                    Monitore como você se sente e ajuste conforme necessário
                  </li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                  <h4 className="text-amber-700 dark:text-amber-500 font-medium">
                    Atenção
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-400">
                    O jejum intermitente não é recomendado para gestantes,
                    pessoas com histórico de transtornos alimentares, diabéticos
                    tipo 1, ou pessoas com certas condições médicas. Consulte um
                    profissional de saúde antes de começar.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Superando Desafios Comuns</CardTitle>
                <CardDescription>
                  Soluções para obstáculos frequentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Fome Matinal</h3>
                    <p className="text-sm text-muted-foreground">
                      A fome costuma diminuir após as primeiras semanas.
                      Enquanto isso, beba chá ou café preto e mantenha-se
                      ocupado com atividades.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Fadiga e Falta de Concentração
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pode ser sinal de desidratação ou desequilíbrio
                      eletrolítico. Adicione uma pitada de sal à água e
                      certifique-se de estar consumindo nutrientes suficientes
                      nas refeições.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Eventos Sociais</h3>
                    <p className="text-sm text-muted-foreground">
                      Seja flexível. Ocasionalmente, ajuste sua janela de
                      alimentação para eventos especiais, e então retorne ao seu
                      cronograma habitual.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Platôs</h3>
                    <p className="text-sm text-muted-foreground">
                      Experimente variar o protocolo (ex: alternar entre 16/8 e
                      18/6) ou combine com exercícios de resistência para
                      continuar progredindo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

export default Education
