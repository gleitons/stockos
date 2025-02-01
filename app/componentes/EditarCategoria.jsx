'use client';

import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoSave } from 'react-icons/io5';
import { MdCancel } from "react-icons/md";

export default function Categoria({ obj }) {
    const [show, setShow] = useState(false); 
    const [nomeCategoria, setNomeCategoria] = useState(obj.nome); 
    const [atualiaLabel, setAtualizaLabel] = useState(obj.nome)
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
                setAtualizaLabel(nomeCategoria)
                
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
           
            <li
                className="bg-slate-200 flex w-1/3 my-2 mx-2 gap-2 p-2 items-center hover:cursor-pointer hover:bg-slate-300  rounded-md select-none"
                onClick={toggleInput} 
            >
                <BsFillPencilFill aria-label="Editar Categoria" />
                {atualiaLabel}
            </li>

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
                    <abbr title="Atualizar">
                        <button
                            onClick={atualizaCategoria}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            aria-label="Salvar categoria"
                        >
                            <IoSave />
                        </button>
                    </abbr>
                    <abbr title="Cancelar">
                        <button
                            onClick={toggleInput}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            aria-label="Salvar categoria"
                        >
                            <MdCancel />
                        </button>
                    </abbr>
                </div>
            )}
        </>
    );
}
