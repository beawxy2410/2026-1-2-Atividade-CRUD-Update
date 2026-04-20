'use client';

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";
import { useRouter } from 'next/navigation';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProdutoType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const resultado = await getProdutosTodos();
      setProdutos(resultado.data.products);
    };

    carregar();
  }, []);

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-4 mt-6 text-center">
        Listagem de Produtos
      </h1>

      {}
      <ol className="flex flex-wrap gap-8 mt-6 items-stretch">
        {produtos.map((p) => (
          <li key={p.id} className="h-full">
            <CardProduto produto={p} />
          </li>
        ))}
      </ol>
    </div>
  );
}

interface CardProdutoProp {
  produto: ProdutoType;
}

function CardProduto({produto}:CardProdutoProp) {
  const router = useRouter();

  const irParaAtualizar = () => {
    router.push(`/atualizar/${produto.id}`);
  };

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 h-full flex flex-col justify-between">
      <div className="px-6" />
      <img
        src={produto.thumbnail}
        alt="Foto Produto"
        className="relative z-20 aspect-video w-full object-cover"
      />

      <CardHeader className="flex flex-col gap-3 flex-1">
        <CardAction>
          <Badge className="bg-green-400" variant="secondary">
            Disponível
          </Badge>
        </CardAction>

        <CardTitle>{produto.title}</CardTitle>

        <CardDescription className="line-clamp-3">
          {produto.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex items-center justify-between gap-3">
        <Button size="sm" className="min-w-[7rem]">
          ${produto.price}
        </Button>
        <Button
          variant="secondary"
          size="lg" 
          className="min-w-[7rem] cursor-pointer"
          onClick={irParaAtualizar}
        >
          Atualizar
        </Button>
      </CardFooter>
    </Card>
  );
}
