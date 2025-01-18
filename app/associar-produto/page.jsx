'use client'
import { useState } from "react";
import TitlePage from "../componentes/TitlePage";
import { empresas } from '../componentes/Empresas';
import { produtos } from "../componentes/Produtos";


export default function Page() {
    const [empresa, setEmpresa] = useState("Selecione a Empresa");
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    
    // Função para selecionar a empresa
    const selecionaEmpresa = (nomeEmpresa) => {
        setEmpresa(nomeEmpresa);
    };

    // Função para selecionar os produtos
    const selecionaProduto = (produto) => {
        setProdutosSelecionados((prev) => {
            if (prev.includes(produto)) {
                return prev.filter((item) => item !== produto);
            } else {
                return [...prev, produto];
            }
        });
    };

    const handleSubmit = () => {
        // Aqui você pode adicionar a lógica para salvar os dados no banco
        console.log("Empresa:", empresa);
        console.log("Produtos:", produtosSelecionados);
        // Exemplo de envio de dados para a API
        // fetch('/api/salvar', {
        //     method: 'POST',
        //     body: JSON.stringify({ empresa, produtosSelecionados }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
    };

    return (
        <div>
            <TitlePage titulo='Associar Produto a Empresa' />
            <div className="flex w-full">
                <div className="w-1/3">
                    <div>
                        <p>Buscar</p>
                        <input type="text" placeholder="Pesquisar Empresa" />
                    </div>
                    <div className="h-screen overflow-auto relative mt-2">
                        {empresas.map((e, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <button onClick={() => selecionaEmpresa(`Empresa - ${e + 1}`)}>
                                    <input type="radio" name="empresasOptions" />
                                    <label>Empresa - {e + 1}</label>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/3">
                    <div>
                        <p>Buscar</p>
                        <input type="text" placeholder="Nome do Produto" />
                    </div>
                    <div className="h-screen overflow-auto relative mt-2">
                        {produtos.map((e, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="checkbox" onChange={() => selecionaProduto(`${e + 1} - Produto`)} />
                                <label>{e + 1} - Produto</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-screen overflow-auto relative mt-11 w-1/3">
                    <div>
                        <p>Nome da Empresa</p>
                        <input type="text" value={empresa} readOnly />
                    </div>
                    <div>
                        <p>Produtos Associados</p>
                        <textarea value={produtosSelecionados.join(', ')} readOnly />
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Associar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
