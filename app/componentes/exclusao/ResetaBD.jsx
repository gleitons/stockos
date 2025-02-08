'use client'
import { useState } from "react";
import { produtos } from "../associar/Produtos";
import { fornecedores } from "../associar/Fornecedores";
import { categorias } from "../associar/Categorias";
import { match } from "assert";
export default function ResetaBD() {
    const [contador, setContador] = useState(0);
    const [resposta, setResposta] = useState('');
    const [mensagem, setMensagem] = useState('Mensagem aqui');
    const [v1, serV1] = useState(() => Math.floor(Math.random() * 9))
    const [v2, serV2] = useState(() => Math.floor(Math.random() * 9))


    const adicionaProdutos = async () => {
        serV1(() => Math.floor(Math.random() * 9))
        serV2(() => Math.floor(Math.random() * 9))
        const dosProdutos = produtos;
        for (let i = 0; i < dosProdutos.length; i++) {
            try {
                const resp = await fetch('/api/produto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(produtos[i])
                });


                if (resp.ok) {
                    const porcentagem = (i * 1) / produtos.length

                    setContador(() => (porcentagem * 100).toFixed(2))
                   
                    if (porcentagem.toFixed((2)) == 0.93) {
                        setContador(100);
                        setTimeout(() => {
                            alert('PRODUTOS CARREGADOS COM SUCESSO')
                            setContador(0)
                        }, 1000);

                    }

                } else {
                    console.log('error')
                }


            } catch (error) {
                console.error('Erro ao cadastrar fornecedor:', error);
            }
        }

    }
    const adicionaFornecedor = async () => {
        serV1(() => Math.floor(Math.random() * 9))
        serV2(() => Math.floor(Math.random() * 9))
        const dosFornecedores = fornecedores;

        for (let i = 0; i < dosFornecedores.length; i++) {
            try {
                const oFornecedor = dosFornecedores[i];

                const resp = await fetch('/api/fornecedor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(oFornecedor)
                });
                const data = await resp.json();

                if (resp.ok) {
                    const porcentagem = (i * 1.25) / fornecedores.length

                    setContador(() => (porcentagem * 100).toFixed(2))
                    if (porcentagem.toFixed((2)) == 0.93) {
                        setContador(100);
                        setTimeout(() => {
                            alert('FORNECEDORES CARREGADOS COM SUCESSO')
                            setContador(0)
                        }, 1000);

                    }

                } else {
                    console.error('Erro ao cadastrar fornecedor: ' + data.error);
                }


            } catch (error) {
                console.error('Erro ao cadastrar fornecedor:', error);
            }
        }


    }
    const adicionaCategoria = async () => {
        serV1(() => Math.floor(Math.random() * 9))
        serV2(() => Math.floor(Math.random() * 9))
        const dosCategorias = categorias;

        for (let i = 0; i < dosCategorias.length; i++) {
            try {
                const resp = await fetch('/api/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(categorias[i])
                });
                const data = await resp.json();

                if (resp.ok) {
                    const porcentagem = (i * 1.2) / categorias.length

                    setContador(() => (porcentagem * 100).toFixed(2))
                
                    if (porcentagem.toFixed((2)) == 0.96) {
                        setContador(100);
                        setTimeout(() => {
                            alert('CATEGORIA CARREGADA COM SUCESSO')
                            setContador(0)
                        }, 500);

                    }

                } else {
                    console('Erro ao cadastrar Categoria: ');
                }


            } catch (error) {
                console.error('Erro ao cadastrar categoria:');
            }
        }


    }
    const deletaBDProdutos = async (nomeC) => {
        try {
            const resp = await fetch(`/api/deletarprodutos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomeColecao: nomeC }) 
            });

            if (resp.ok) {
                if (nomeC == 'produtos') {
                   adicionaProdutos();
                } else if (nomeC == 'fornecedors') {
                   adicionaFornecedor();
                } else {
                    adicionaCategoria();
                }

            }
        } catch {
            console.log('error');
        }
    }


    const verificarResposta = (opcao) => {
        const result = v1 + v2;
        const mensagem = `*ATENÇÃO - Isso Apagará todos os dados cadastrados de ${opcao}, Digite OK para confirmar!!! `


        if (parseInt(resposta) === result) {
            setMensagem('Acertou, mas cuidado viu, isso vai deletar o seu banco de dados!');

            if (confirm(mensagem) == true) {
                if (opcao == 'Produtos') {
                    deletaBDProdutos('produtos');
                } else if (opcao == 'fornecedors') {
                    deletaBDProdutos('fornecedors');
                    
                } else {
                    deletaBDProdutos('categories');
                }
            }


        } else {
            setMensagem('Incorreto. Tente novamente. ❌');
        }
    };

    return (
        <div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                Porcentagem: <span className="font-bold text-blue-600">{contador}</span>%
            </div>
            <div className="flex gap-3">
                <div className="bg-green-300 p-2">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2>Resetar todo o banco de dados das <strong>Fornecedor</strong></h2>
                        <div className="text-lg font-semibold text-gray-800 mb-4">
                            {v1} + {v2} = <input
                                type="text"
                                value={resposta}
                                onChange={(e) => setResposta(e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => verificarResposta('fornecedors')}
                                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Limpar Banco de Dados
                            </button>
                        </div>
                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700">
                            {mensagem}
                        </div>
                    </div>
                </div>
                <div className="bg-green-300 p-2">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2>Resetar todo o banco de dados das <strong>Produtos</strong></h2>
                        <div className="text-lg font-semibold text-gray-800 mb-4">
                            {v1} + {v2} = <input
                                type="text"
                                value={resposta}
                                onChange={(e) => setResposta(e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => verificarResposta('Produtos')}
                                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Limpar Banco de Dados
                            </button>
                        </div>
                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700">
                            {mensagem}
                        </div>
                    </div>
                </div>
                <div className="bg-green-300 p-2">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2>Resetar todo o banco de dados das <strong>Categorias</strong></h2>
                        <div className="text-lg font-semibold text-gray-800 mb-4">
                            {v1} + {v2} = <input
                                type="text"
                                value={resposta}
                                onChange={(e) => setResposta(e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => verificarResposta('categories')}
                                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Limpar Banco de Dados
                            </button>
                        </div>
                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700">
                            {mensagem}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
