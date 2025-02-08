'use client';

import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function ExcluirFornecedor({ fornec }) {
    const [mostrar, setMostrar] = useState(false);

    const deleteFornecedor = async (e) => {
        e.preventDefault();
        const mensagem = 'Deseja excluir a empresa selecionada?';

        if (confirm(mensagem)) {
            try {
                const response = await fetch('/api/fornecedor', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: fornec._id })
                });

                if (response.ok) {
                    alert('Excluído com sucesso!');
                    location.reload();
                } else {
                    alert('Erro ao excluir');
                }
            } catch (error) {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir');
            }
        } else {
            alert('Exclusão cancelada');
            setMostrar(false);
        }
    };

    const abreDeleted = () => {
        setMostrar(!mostrar);
    };

    return (
        <>
        
            <li
                onClick={abreDeleted}
                className="bg-gray-200 p-3 my-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors duration-200 select-none"
            >
                {fornec.cnpj} - {fornec.nomeEmpresa}
            </li>

       
            {mostrar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      
                        <div
                            onClick={abreDeleted}
                            className="text-3xl text-gray-600 hover:text-gray-800 cursor-pointer mb-4"
                        >
                            <IoArrowBackCircleSharp />
                        </div>

                   
                        <form onSubmit={deleteFornecedor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CNPJ:</label>
                                <input
                                    type="text"
                                    defaultValue={fornec.cnpj}
                                    readOnly
                                   
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nome:</label>
                                <input
                                    type="text"
                                    defaultValue={fornec.nomeEmpresa}
                                    readOnly
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                                >
                                    Excluir
                                </button>
                                <button
                                    type="button"
                                    onClick={abreDeleted}
                                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}