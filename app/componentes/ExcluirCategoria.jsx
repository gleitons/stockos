'use client'

import { MdDelete } from "react-icons/md";
export default function ExcluirCategoria({ obj }) {
    const excluir = async (e) => {
        const texto = `Deseja Excluir a categoria " ${obj.nome} " Permanentemente?`;
        if (confirm(texto) == true) {
            try {
                const excluirCategory = await fetch('/api/categories', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(e)
                });
                if (excluirCategory.ok) {
                    alert('CATEGORIA EXCLUIDA COM SUCESSO!');
                    location.reload();
                }
            } catch (error) {
                console.log('Erro ao apagar Categoria')
            }
        }
    }

    return (
        <>
            <li className="bg-slate-400 flex w-1/3 my-2 mx-2 gap-10 p-1 items-center hover:cursor-default hover:bg-slate-300 select-none" onClick={() => excluir(obj._id)}><MdDelete />{obj.nome}</li>

        </>
    )
};
