'use client';

import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoSave } from 'react-icons/io5';
import { MdCancel } from "react-icons/md";

export default function Categoria({ obj, numero }) {
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
                className="bg-slate-200  w-1/4 my-2 mx-2  p-2  hover:cursor-pointer hover:bg-slate-300  rounded-md select-none"
                onClick={toggleInput} 
            >
                <div className='flex items-center gap-2'>
                    <p className='bg-gray-800 text-white  min-w-5 rounded-sm text-center'>{numero + 1}</p>
                    <BsFillPencilFill aria-label="Editar Categoria" />
                    {atualiaLabel}
                </div>               
            </li>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
                    <div className='bg-white p-2 min-h-[200px] w-[300px] rounded-md'>
                        <p className='text-xl text-center'>Edite o nome da categoria</p>
                        <p className='text-gray-400 text-center'>Nome Anterior: {obj.nome}</p>
                        <input
                            type="text"
                            value={nomeCategoria}
                            onChange={carregaNome}
                            className="border rounded p-1 w-full"
                            placeholder="Novo nome da categoria"
                            aria-label="Digite o novo nome da categoria"
                        />
                        <div className='flex justify-between mt-10'>
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
                    </div>
                </div>
            )}

           
        </>
    );
}
