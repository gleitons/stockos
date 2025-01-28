'use client';

import { useState } from "react";

export default function CadastrarCategoria() {
    const [newCategoryName, setNewCategoryName] = useState('');    

    const cadastroCategoria = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: newCategoryName }) 
            });

            const data = await response.json();

            if (response.ok) {
                alert('Categoria salva com sucesso');
                setNewCategoryName('')
                
            } else {
                alert('Categoria já existe')
            }
        } catch (error) {
            console.error('Erro de rede ao salvar categoria:', error);
        }
           
    };

    return (
        <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4 ">Cadastrar Nova Categoria</h2>

            <form onSubmit={cadastroCategoria} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium">
                        Nome da Categoria
                    </label>
                    <input
                        id="categoria"
                        type="text"
                        autoFocus
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Digite o nome da nova categoria"
                        required
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                <button
                    type="submit"
                    className={`px-4 py-2 text-white w-fit rounded ${'bg-blue-500 hover:bg-blue-600'}`}
                >
                   Cadastrar Categoria
                </button>

               
            </form>
        </div>
    );
}
