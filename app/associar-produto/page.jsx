'use client'
import { useEffect, useState } from "react";
import TitlePage from "../componentes/TitlePage";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";

export default function Page() {
    const [empresa, setEmpresa] = useState("Selecione a Empresa");
    const [detalhes, setDetalhes] = useState('...');
    const [visualizador, setVisualizador] = useState(false);
    const [produtosViculados, setProdutosViculados] = useState([]);
    const [mostraEmpresas, setMostraEmpresas] = useState([]);
    const [mostraProdutos, setMostraProdutos] = useState([]);
    const [pesquisaProdutos, setPesquisaProdutos] = useState([]);
    const [pesquisaEmpresa, setPesquisaEmpresa] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [pesquisandoEmpresa, setPesquisandoEmpresa] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelection = (e) => {
        setSelectedEmpresa(e.nomeEmpresa);
        selecionaEmpresa(e);

    };

    const selecionaEmpresa = (empresaSelecionada) => {
        if (confirm('Isso limpará as informações não salvas')) {
            setEmpresa(empresaSelecionada);
            setProdutosViculados(empresaSelecionada.produtosViculados || []);
        }
    };

    const selecionaProduto = (produto) => {
        if (!selectedEmpresa) {
            alert('*ATENÇÃO - Selecione uma empresa antes de selecionar um produto');
            return
        }
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
            <div className="p-4 m-4">
                <p className="text-lg font-bold">{e.nomeDoProduto}</p>
                <p className="text-sm text-gray-600">{e.codigoDeBarras}</p>
                <div className="w-full my-4">
                    <Image className="m-auto" src={e.imagem} width={200} height={150} alt={e.nomeDoProduto} />
                </div>
                <p className="text-sm">Estoque: {e.estoque}</p>
                <p className="text-sm">Validade: {e.validade}</p>
                <p className="text-sm h-[50px] overflow-auto text-gray-700">{e.descricao}</p>
            </div>
        );
        setVisualizador(true);
    };

    const viculaProdutos = async () => {
        if (!selectedEmpresa) {
            alert('*ATENÇÃO - Selecione uma empresa antes de Associar um produto');
            return
        }

        try {
            const pVinculados = {
                "_id": empresa._id,
                "cnpj": empresa.cnpj,
                "produtosViculados": produtosViculados,
                "nomeEmpresa": empresa.nomeEmpresa,
                "logradouro": empresa.logradouro,
                "numero": empresa.numero,
                "bairro": empresa.bairro,
                "cidade": empresa.cidade,
                "cep": empresa.cep,
                "telefone": empresa.telefone,
                "email": empresa.email,
                "contato": empresa.contato,
            };

            const response = await fetch('/api/fornecedor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pVinculados),
            });

            if (response.ok) {
                alert('Produtos associados com sucesso!');
                empresasCadastradas();
            } else {
                const error = await response.json();
                alert(`Erro ao associar produtos: ${error.message}`);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao associar os produtos. Tente novamente.");
        }
    };

    const fecharBanner = () => {
        setVisualizador(false);
    };

    const empresasCadastradas = async () => {
        try {
            const resp = await fetch('/api/fornecedor');
            const data = await resp.json();
            if (resp.ok) {
                setMostraEmpresas(data);
                setPesquisaEmpresa(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const produtosCadastrados = async () => {
        try {
            const resp = await fetch('/api/produto');
            const produt = await resp.json();
            if (resp.ok) {
                setMostraProdutos(produt);
                setPesquisaProdutos(produt)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        empresasCadastradas();
        produtosCadastrados();
    }, []);

    const filtroProduto = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = mostraProdutos.filter(produto =>
            produto.nomeDoProduto.toLowerCase().includes(value)
        );
        setMostraProdutos(filtered);

    };

    const buscaProdutoRapido = (e) => {
      
        if (e.key === 'Backspace') {
            setMostraProdutos(pesquisaProdutos);
        }
    };

    const searchEmpresaInput = (e) => {
        const value = e.target.value.toLowerCase();

        setPesquisandoEmpresa(value);
        const filtered = mostraEmpresas.filter(empresa => empresa.nomeEmpresa.toLowerCase().includes(value));

        setMostraEmpresas(filtered);

    };

    const buscaFornec = (e) => {

        if (e.key === 'Backspace') {
            setMostraEmpresas(pesquisaEmpresa);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <TitlePage titulo='Associar Produto a Empresa' />
            <div className="flex w-full gap-1">
                <div className="w-1/2 bg-white p-2 rounded-lg shadow">
                    <div className="mb-4">
                        <p className="font-semibold mb-2">Buscar Empresa</p>
                        <input
                            type="text"
                            value={pesquisandoEmpresa}
                            onChange={searchEmpresaInput}
                            onKeyUp={buscaFornec}
                            placeholder="Pesquisar Empresa"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="h-[200px] overflow-auto">
                        {mostraEmpresas.map((e, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded ${selectedEmpresa === e.nomeEmpresa ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            >
                                <input
                                    type="radio"
                                    name="empresasOptions"
                                    checked={selectedEmpresa === e.nomeEmpresa}
                                    onChange={() => handleSelection(e)}
                                    onKeyUp={() => buscaFornec(e)}
                                    className="cursor-pointer"
                                />
                                <label onClick={() => handleSelection(e)} className="cursor-pointer flex-1">
                                    {e.nomeEmpresa}
                                </label>
                                <abbr title={`${e.cnpj} - ${e.nomeEmpresa}`}>
                                    <FaEye className="cursor-pointer text-gray-600 hover:text-gray-800" />
                                </abbr>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold mb-2">Nome da Empresa</p>
                        <input
                            type="text"
                            required
                            defaultValue={empresa.nomeEmpresa}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={viculaProdutos}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Associar
                        </button>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Produtos Associados</p>
                        <p className="text-sm text-gray-600">Quantidade: {produtosViculados.length}</p>
                        <div className="hidden">
                            <textarea  rows={1}
                            cols={1}
                            defaultValue={produtosViculados.join(', ')}
                            
                            className=" w-full p-2 border border-gray-300 rounded bg-gray-100 mt-2">
                            
                            </textarea>
                        </div>
                      
                    </div>
                </div>
                <div className="w-1/2 bg-white p-4 rounded-lg shadow">

                    <div className="mb-4">
                        <p className="font-semibold mb-2">Buscar Produto</p>
                        <input
                            type="text"
                            placeholder="Nome do Produto"
                            value={searchTerm}
                            onChange={filtroProduto}
                            onKeyUp={buscaProdutoRapido}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="h-[80vh] overflow-auto">
                        <div className="flex bg-gray-300 w-full text-center gap-10 mb-2">
                            <div className="bg-gray-300 px-1 rounded">
                                <p className="text-center text-sm">M</p>
                            </div>
                            <div className="text-center">
                                <p>Visualizar</p>
                            </div>
                        </div>
                        <div className="max-h-[400px] overflow-auto">
                            {mostraProdutos.map((e, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 my-2 rounded-md border-b-gray-500 bg-gray-100 hover:bg-gray-200 ">
                                    <div className="bg-gray-300 px-1 rounded">
                                        <input
                                            type="checkbox"
                                            onChange={() => selecionaProduto(e._id)}
                                            checked={produtosViculados.includes(e._id)}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <label onClick={() => abrirVisualizador(e)} className="flex items-center gap-2 cursor-pointer flex-1">
                                        {e.codigoDeBarras} - {e.nomeDoProduto} <FaEye className="text-gray-600 hover:text-gray-800" />
                                    </label>
                                </div>
                            ))}
                        </div>

                        {visualizador && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-4 rounded-lg  w-1/3">
                                    <div className="flex justify-between  items-center mb-4">
                                        <h2 className="text-xl font-bold">Detalhes do Produto</h2>
                                        <IoMdCloseCircle
                                            onClick={fecharBanner}
                                            className="text-red-600 text-3xl cursor-pointer"
                                        />
                                    </div>
                                    {detalhes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
}