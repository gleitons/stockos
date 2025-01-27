'use client'

import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function ExcluirFornecedor({ fornec }) {
    const [mostrar, setMostrar] = useState(false)
    const deleteFornecedor = async (e) => {
        const mensagem = 'Deseja excluir a empresa selecionada?';

        if (confirm(mensagem) == true) {

            e.preventDefault();
            console.log({ id: fornec._id })
            try {
                const response = await fetch('/api/fornecedor', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: fornec._id })
                })
                if (response.ok) {
                    alert('Excluido Com Sucesso!')
                }
            } catch (error) {
                alert('Erro ao excluir')
            }
        } else {
            alert('Exclusão cancelada');
            setMostrar(false)
        }

    }
    const abreDeleted = () => {
        const verifica = mostrar == true ? false : true;
        setMostrar(verifica)
    }
    return (
        <>
            <li onClick={abreDeleted} className="bg-gray-400 p-2 my-2 mx-2 hover:bg-slate-300 select-none">
                {fornec.cnpj} - {fornec.nomeEmpresa}
            </li>
            {mostrar &&
                (<div className="bg-white p-2 absolute top-0 left-0 w-full h-screen ">
                    <div onClick={abreDeleted} className="text-3xl ">
                        <IoArrowBackCircleSharp />
                    </div>
                    <form onSubmit={deleteFornecedor}>
                        <div>
                            <div className="w-full">CNPJ: <input className="outline-none border-none" type="text " name="" value={fornec.cnpj} readOnly /></div>
                            <div className="w-full">NOME: <input className="w-1/2 outline-none border-none" type="text" value={fornec.nomeEmpresa} readOnly /></div>

                            <div className="flex gap-10">
                                <div><input type="submit" value="Excluir" /></div>
                                <div>
                                    <button onClick={abreDeleted}>Cancelar</button>
                                </div>
                            </div>


                        </div>

                    </form>

                </div>)
            }

        </>
    )
};
