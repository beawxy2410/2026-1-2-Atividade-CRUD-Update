import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Página Inicial</h1>
      
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-lg">
          Atividade de POS - Update
        </p>
        
        {}
        <Link href="/produtos" passHref>
          <Button size="lg" className="cursor-pointer gap-2">
            Ver Listagem de Produtos
          </Button>
        </Link>
      </div>
    </div>
  );
}

