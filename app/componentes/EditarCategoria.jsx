'use client';

import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoSave } from 'react-icons/io5';

export default function Categoria({ obj }) {
    const [show, setShow] = useState(false); // Controla a exibição do input
    const [nomeCategoria, setNomeCategoria] = useState(obj.nome); // Gerencia o nome da categoria

    // Função para alternar a exibição do input
    const toggleInput = () => {
        setShow((prev) => !prev);
    };

    // Função para atualizar o estado do nome da categoria
    const carregaNome = (e) => {
        setNomeCategoria(e.target.value);
    };

    // Função para atualizar a categoria no servidor
    const atualizaCategoria = async () => {
        if (nomeCategoria.trim() === obj.nome.trim()) {
            alert('O nome da categoria não foi alterado.');
            return;
        }

        try {
            const resposta = await fetch('/api/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: obj._id, nome: nomeCategoria }),
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                alert('Categoria atualizada com sucesso!');
                setShow(false); // Fecha o input após sucesso
                
            } else {
                alert(dados.error || 'Erro ao atualizar categoria');
            }
        } catch (erro) {
            console.error('Erro ao atualizar categoria:', erro);
            alert('Erro no servidor');
        }
    };

    return (
        <>
            {/* Item da lista */}
            <li
                className="bg-slate-400 flex w-1/3 my-2 mx-2 gap-2 p-2 items-center hover:cursor-pointer hover:bg-slate-300 select-none"
                onClick={toggleInput} // Alterna a exibição do input ao clicar
            >
                <BsFillPencilFill aria-label="Editar Categoria" />
                {obj.nome}
            </li>

            {/* Input exibido com base no estado */}
            {show && (
                <div className="mt-2 flex gap-2 items-center">
                    <input
                        type="text"
                        value={nomeCategoria}
                        onChange={carregaNome}
                        className="border rounded p-1"
                        placeholder="Novo nome da categoria"
                        aria-label="Digite o novo nome da categoria"
                    />
                    <button
                        onClick={atualizaCategoria}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        aria-label="Salvar categoria"
                    >
                        <IoSave />
                    </button>
                </div>
            )}
        </>
    );
}
