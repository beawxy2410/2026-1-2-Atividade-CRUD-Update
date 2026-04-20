'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { atualizarProduto } from '@/services/api';
import api from '@/services/api';

export default function PaginaAtualizar(){
    const params = useParams(); 
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const prod = async () => {
            const resultado = await api.get(`/products/${params.id}/`); 
            
            const newTitle = resultado.data.title;
            setTitle(newTitle);
            const newDescription = resultado.data.description;
            setDescription(newDescription);
            const newPrice = resultado.data.price;
            setPrice(newPrice)

            if (newTitle != ''){
                setCarregando(false);
            }
        }
        prod();
    }, [params.id])

    const Salvar = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
      await atualizarProduto(Number(params.id), { title:title, price:price, description:description });
      alert("Atualizado!");
      router.push('/'); 
    } catch (err) {
      alert("Erro ao salvar");
    }
    }

    if (carregando) return <p className="px-6 py-10 text-slate-200">A carregar dados do produto...</p>;
    return (
        <div className="min-h-screen bg-background px-6 py-10 text-foreground">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-10 border-b border-slate-700 pb-6">
                    <h1 className="text-3xl font-bold text-slate-100">Atualizar Produto</h1>
                    <p className="text-slate-400 mt-2">Atualizando dados do produto #{params.id}</p>
                </div>

                <form onSubmit={Salvar} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-slate-200">
                            Nome do Produto
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 bg-slate-950 border border-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Ex: Teclado Mecânico"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-semibold text-slate-200">
                            Descrição do produto
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="p-3 bg-slate-950 border border-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                            placeholder="Detalhes do produto..."
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="price" className="text-sm font-semibold text-slate-200">
                            Preço (R$)
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="p-3 bg-slate-950 border border-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="0.00"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
}