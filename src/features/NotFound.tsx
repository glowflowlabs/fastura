import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const NotFound = () => {
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-fastsmart-purple/5 px-4">
      <div className="text-center card-neumorph p-8 max-w-md w-full">
        <h1 className="text-5xl font-bold mb-4 text-fastsmart-purple">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! Página não encontrada
        </p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button
          className="rounded-full px-8"
          onClick={() => console.log("implementar a navegação para o início")}
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  )
}

export default NotFound
