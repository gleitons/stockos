'use client';
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";



export default function EditarFornecedor({ empresa }) {

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

    const [preenche, setPreenche] = useState(false);

    const preencheEmpresa = (aEmpresa) => {
        setPreenche(true);
        setDadosFornecedor({
            _id: aEmpresa._id,
            cnpj: aEmpresa.cnpj,
            nomeEmpresa: aEmpresa.nomeEmpresa,
            logradouro: aEmpresa.logradouro,
            numero: aEmpresa.numero,
            bairro: aEmpresa.bairro,
            cidade: aEmpresa.cidade,
            cep: aEmpresa.cep,
            telefone: aEmpresa.telefone,
            email: aEmpresa.email,
            contato: aEmpresa.contato,
            produtosViculados: [],
        });
    };

    const fechaAtualizador = () => {
        setPreenche(false);
    };

    const atualizarFornecedor = async (e) => {
        e.preventDefault();
        try {
            const atualizaFornecedorOn = await fetch('/api/fornecedor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosFornecedor),
            });
            const data = await atualizaFornecedorOn.json();
            if (atualizaFornecedorOn.ok) {
                alert('Fornecedor atualizado com sucesso!');
                window.location.reload();

            } else {
                alert('Erro ao atualizar fornecedor: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error);
        }
    };

    const adicionaInfo = (e) => {
        const { name, value } = e.target;
        setDadosFornecedor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <li onClick={() => preencheEmpresa(empresa)} className="bg-gray-100 p-3 rounded-sm hover:bg-slate-200 hover:cursor-pointer">{empresa.nomeEmpresa}</li>
            {preenche && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Editar Fornecedor</h2>
                        <button onClick={fechaAtualizador} className="text-gray-500 hover:text-gray-700">
                            <FaArrowAltCircleLeft className="text-2xl" />
                        </button>
                    </div>
                   
                    <form onSubmit={atualizarFornecedor} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="hidden">
                                <label className="block text-sm font-medium text-gray-700">ID</label>
                                <input type="text" name="cnpj" value={dadosFornecedor._id} onChange={adicionaInfo} placeholder="ID" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CNPJ</label>
                                <input readOnly type="text" name="cnpj" defaultValue={dadosFornecedor.cnpj} onChange={adicionaInfo} className="mt-1 bg-slate-100 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nome da Empresa *</label>
                                <input type="text" name="nomeEmpresa" value={dadosFornecedor.nomeEmpresa} onChange={adicionaInfo} placeholder="Insira o nome da empresa" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Logradouro *</label>
                                <input type="text" name="logradouro" value={dadosFornecedor.logradouro} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número *</label>
                                <input type="number" name="numero" value={dadosFornecedor.numero} onChange={adicionaInfo} placeholder="Insira o número" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bairro *</label>
                                <input type="text" name="bairro" value={dadosFornecedor.bairro} onChange={adicionaInfo} placeholder="Insira o bairro da empresa" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CEP *</label>
                                <input type="text" name="cep" value={dadosFornecedor.cep} onChange={adicionaInfo} placeholder="Insira o CEP" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cidade *</label>
                                <input type="text" name="cidade" value={dadosFornecedor.cidade} onChange={adicionaInfo} placeholder="Insira a cidade" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Telefone *</label>
                                <input type="text" name="telefone" value={dadosFornecedor.telefone} onChange={adicionaInfo} placeholder="Insira o telefone" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">E-mail *</label>
                                <input type="email" name="email" value={dadosFornecedor.email} onChange={adicionaInfo} placeholder="exemplo@fornecedor.com" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contato Principal *</label>
                                <input type="text" name="contato" value={dadosFornecedor.contato} onChange={adicionaInfo} placeholder="Nome do contato principal" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Atualizar
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            )}
        </>
    );
}
