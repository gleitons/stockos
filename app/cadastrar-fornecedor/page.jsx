'use client';

import TitlePage from "../componentes/TitlePage";
import { useState } from "react";

export default function Page() {
    const [dadosFornecedor, setDadosFornecedor] = useState({
        cnpj: '',
        nomeEmpresa: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: '',
        telefone: '',
        email: '',
        contato: '',
        produtosViculados: [],
    });
    const [encontra, setEncontra] = useState('hidden');
    const [fechaCampo, setFechaCampo] = useState(false)

    const adicionaInfo = (e) => {
        setDadosFornecedor({ ...dadosFornecedor, [e.target.name]: e.target.value });
    };

    const cadastrarFornecedor = async (e) => {
        e.preventDefault();

        const camposObrigatorios = [
            'cnpj', 'nomeEmpresa', 'logradouro', 'numero', 'bairro', 'cidade', 'cep', 'telefone', 'email', 'contato'
        ];
        const camposFaltantes = camposObrigatorios.filter(campo => !dadosFornecedor[campo]);

        if (camposFaltantes.length > 0) {
            alert(`Por favor, preencha os seguintes campos: ${camposFaltantes.join(', ')}`);
            return;
        }

        try {
            const resp = await fetch('/api/fornecedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosFornecedor)
            });
            const data = await resp.json();

            if (resp.ok) {
                alert('Fornecedor cadastrado com sucesso');

                setDadosFornecedor({
                    cnpj: '',
                    nomeEmpresa: '',
                    logradouro: '',
                    numero: '',
                    bairro: '',
                    cidade: '',
                    cep: '',
                    telefone: '',
                    email: '',
                    contato: '',
                    produtosViculados: [],
                });
                setEncontra('hidden')
            } else {
                alert('Erro ao cadastrar fornecedor: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
        }
    };

    const verificaFornecedor = async (e) => {
        e.preventDefault();
        const oCnpj = dadosFornecedor.cnpj
        if (oCnpj == '') {
            alert(`Por favor, informe o CNPJ`);
            return;
        }
        if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(oCnpj)) {
            alert('Por favor, insira um valor válido -  Digite no formato 00.000.000/0000-00');
            return;
        }

        if (oCnpj.toString().length < 18) {
            alert(`Por favor, Digite no formato 00.000.000/0000-00`);
            return;
        }
        try {
            const resp = await fetch('/api/fornecedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosFornecedor)
            });

            const data = await resp.json();

            if (resp.status == 409) {
                setEncontra('')
                setFechaCampo(true)
            } else {
                alert('Erro ao cadastrar Produto: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    };

    return (
        <div className=" bg-gray-100 min-h-screen">
            <TitlePage titulo='Cadastro de Fornecedor' />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={verificaFornecedor}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">CNPJ: *</label>
                        <input
                            type="text"
                            name="cnpj"
                            value={dadosFornecedor?.cnpj}
                            maxLength={18}
                            readOnly={fechaCampo}
                            onChange={adicionaInfo}
                            placeholder="00.000.000/0000-00"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button className="w-fit mt-5 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verifica</button>
                    </div>
                </form>
                <form onSubmit={cadastrarFornecedor} className={encontra}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome da Empresa: *</label>
                        <input
                            type="text"
                            name="nomeEmpresa"
                            maxLength={62}
                            value={dadosFornecedor?.nomeEmpresa}
                            onChange={adicionaInfo}
                            placeholder="Insira o nome da empresa - Max: 32 Caracteres"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Logradouro: *</label>
                        <input
                            type="text"
                            name="logradouro"
                            value={dadosFornecedor?.logradouro}
                            onChange={adicionaInfo}
                            placeholder="Insira o endereço completo da empresa"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Número: *</label>
                        <input
                            type="number"
                            name="numero"
                            value={dadosFornecedor?.numero}
                            onChange={adicionaInfo}
                            placeholder="Insira o número"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Bairro: *</label>
                        <input
                            type="text"
                            name="bairro"
                            value={dadosFornecedor?.bairro}
                            onChange={adicionaInfo}
                            placeholder="Insira o bairro da empresa"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">CEP: *</label>
                        <input
                            type="text"
                            name="cep"
                            value={dadosFornecedor?.cep}
                            onChange={adicionaInfo}
                            placeholder="Insira o CEP"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Cidade: *</label>
                        <input
                            type="text"
                            name="cidade"
                            value={dadosFornecedor?.cidade}
                            onChange={adicionaInfo}
                            placeholder="Insira a cidade"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Telefone: *</label>
                        <input
                            type="text"
                            name="telefone"
                            value={dadosFornecedor?.telefone}
                            onChange={adicionaInfo}
                            placeholder="Insira o telefone"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">E-mail: *</label>
                        <input
                            type="email"
                            name="email"
                            value={dadosFornecedor?.email}
                            onChange={adicionaInfo}
                            placeholder="exemplo@fornecedor.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Contato Principal: *</label>
                        <input
                            type="text"
                            name="contato"
                            value={dadosFornecedor?.contato}
                            onChange={adicionaInfo}
                            placeholder="Nome do contato principal"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}