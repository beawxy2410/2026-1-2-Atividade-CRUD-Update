'use client';

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

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
          <li key={p.id}>
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

function CardProduto({ produto }: CardProdutoProp) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 h-full flex flex-col justify-between">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={produto.thumbnail}
        alt="Foto Produto"
        className="relative z-20 aspect-video w-full object-cover"
      />

      <CardHeader>
        <CardAction>
          <Badge className="bg-green-400" variant="secondary">
            Disponível
          </Badge>
        </CardAction>

        <CardTitle>{produto.title}</CardTitle>

        <CardDescription className="line-clamp-2">
        {produto.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-around">
        <Button>${produto.price}</Button>
      </CardFooter>
    </Card>
  );
}
