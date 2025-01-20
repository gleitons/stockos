'use client'
import { useEffect, useState } from "react";
import TitlePage from "../componentes/TitlePage";
import { empresas } from '../base/Empresas';
import { produtos } from "../base/Produtos";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";

export default function Page() {

    const [empresa, setEmpresa] = useState("Selecione a Empresa");
    const [detalhes, setDetalhes] = useState('...')
    const [visualizador, setVisualizador] = useState(false)
    const [produtosViculados, setProdutosViculados] = useState([]);
    const [mostraEmpresas, setMostraEmpresas] = useState([])

    // Função para selecionar a empresa
    const selecionaEmpresa = (nomeEmpresa, productViculados) => {

        if (confirm('Isso Limpara as informações não salvas') == true) {
            const produtosFiltrados = produtos
                .filter((produto) => productViculados.includes(produto.codBarras))
                .map((produto) => produto.codBarras);

            setEmpresa(nomeEmpresa);
            setProdutosViculados(produtosFiltrados);
        }


    };

    // Função para selecionar ou desmarcar um produto
    const selecionaProduto = (produto) => {
        setProdutosViculados((prev) => {
            if (prev.includes(produto)) {
                return prev.filter((item) => item !== produto);
            } else {
                return [...prev, produto];
            }
        });
    };

    const abrirVisualizador = (e) => {
        setDetalhes(
            <div>
                <p>{e.codBarras}</p>
                <p>{e.nomeProduto}</p>
                <div className="w-full">
                    <Image className="m-auto" src={e.imagemProduto} width={300} height={200} alt={e.nomeProduto} />
                </div>
                <p>Estoque: {e.estoque}</p>
                <p>Validade: {e.validade}</p>
                <p>{e.descricao}</p>
            </div>
        )
        setVisualizador(true)
    }

    const handleSubmit = () => {
        console.log("Empresa:", empresa);
        console.log("Produtos:", produtosViculados);
    };

    const verificaSeTemProduto = () => {

    }
    const fecharBanner = () => {
        setVisualizador(false)
    }
    const empresasCadastradas = async () => {
        try {
            const resp = await fetch('/api/fornecedor');
            const data = await resp.json();
            if(resp.ok) {
                setMostraEmpresas(data)
            } else {
                console.log('mostra erro')
            }
        } catch (error) {

        }


        setMostraEmpresas(data)
    }
    useEffect(() => {
        empresasCadastradas()
    }, [])
    return (
        <div>
            <TitlePage titulo='Associar Produto a Empresa' />
            <div className="flex w-full">
                {/* Seção de Empresas */}
                <div className="w-1/3">
                    <div>
                        <p>Buscar</p>
                        <input type="text" placeholder="Pesquisar Empresa" />
                    </div>
                    <div className="h-screen overflow-auto relative mt-2">
                        {mostraEmpresas.map((e, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="empresasOptions"
                                    checked={empresa === `${e.cnpj} - ${e.nomeEmpresa}`}
                                    onChange={() => selecionaEmpresa(`${e.cnpj} - ${e.nomeEmpresa}`, e.produtosViculados)}
                                />
                                <label onClick={() => selecionaEmpresa(`${e.cnpj} - ${e.nomeEmpresa}`, e.produtosViculados)}>
                                    {e.cnpj} - {e.nomeEmpresa}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seção de Produtos */}
                <div className="w-1/3">
                    <div>
                        <p>Buscar</p>
                        <input type="text" placeholder="Nome do Produto" />
                    </div>
                    <div className="h-screen overflow-auto relative mt-2">
                        <div className="flex w-full text-center gap-10">
                            <div className="bg-gray-300 px-1">
                                <p className="text-center text-sm">M</p>
                            </div>
                            <div className="text-center">
                                <p>Visualizar</p>
                            </div>
                        </div>

                        {produtos.map((e, index) => (
                            <div key={index}>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-300 px-1">
                                        <input
                                            type="checkbox"
                                            onChange={() => selecionaProduto(e.codBarras)}
                                            checked={produtosViculados.includes(e.codBarras)}
                                        />
                                    </div>
                                    <label onClick={() => abrirVisualizador(e)} className="flex items-center gap-2 hover:cursor-pointer">
                                        {e.codBarras} - {e.nomeProduto} <FaEye />
                                    </label>
                                </div>
                            </div>
                        ))}

                        {visualizador && (
                            <div className="p-2 text-center bg-gray-300 w-full absolute top-0 left-0">
                                <div className="text-right flex items-center text-2xl justify-between">
                                    <div onClick={fecharBanner} className="text-red-600 text-3xl hover:cursor-pointer">
                                        <IoMdCloseCircle />
                                    </div>
                                </div>
                                {detalhes}
                            </div>
                        )}
                    </div>
                </div>

                {/* Resumo e Botão de Submissão */}
                <div className="h-screen overflow-auto relative mt-11 w-1/3">
                    <div>
                        <p>Nome da Empresa</p>
                        <input type="text" value={empresa} readOnly />
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Associar</button>
                    </div>
                    <div>
                        <p>Produtos Associados</p>
                        <textarea rows={7} cols={40} value={produtosViculados.join(', ')} readOnly />
                    </div>

                </div>
            </div>
        </div>
    );
};
