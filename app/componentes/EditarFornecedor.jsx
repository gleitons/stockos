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
            // console.error('Erro ao atualizar fornecedor:', error);
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
            <li onClick={() => preencheEmpresa(empresa)}>{empresa.nomeEmpresa}</li>
            {preenche && (
                <div className="absolute left-0 top-0 bg-white p-3">
                    <div className="text-3xl">
                        <FaArrowAltCircleLeft onClick={fechaAtualizador} />
                    </div>

                    <form onSubmit={atualizarFornecedor}>
                        <div>
                            ID: <input type="text" name="cnpj" value={dadosFornecedor._id} onChange={adicionaInfo} placeholder="00.000.000/0000-00" />
                        </div>
                        <div>
                            CNPJ: <input type="text" name="cnpj" value={dadosFornecedor.cnpj} onChange={adicionaInfo} placeholder="00.000.000/0000-00" />
                        </div>
                        <div>
                            Nome da Empresa: *<input type="text" name="nomeEmpresa" value={dadosFornecedor.nomeEmpresa} onChange={adicionaInfo} placeholder="Insira o nome da empresa" />
                        </div>
                        <div>
                            Logradouro: *<input type="text" name="logradouro" value={dadosFornecedor.logradouro} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                        </div>
                        <div>
                            Numero: * <input type="number" name="numero" value={dadosFornecedor.numero} onChange={adicionaInfo} placeholder="Insira o número" />
                        </div>
                        <div>
                            Bairro: *<input type="text" name="bairro" value={dadosFornecedor.bairro} onChange={adicionaInfo} placeholder="Insira o bairro da empresa" />
                        </div>
                        <div>
                            CEP: *<input type="text" name="cep" value={dadosFornecedor.cep} onChange={adicionaInfo} placeholder="Insira o CEP" />
                        </div>
                        <div>
                            Cidade: *<input type="text" name="cidade" value={dadosFornecedor.cidade} onChange={adicionaInfo} placeholder="Insira a cidade" />
                        </div>
                        <div>
                            Telefone: *<input type="text" name="telefone" value={dadosFornecedor.telefone} onChange={adicionaInfo} placeholder="Insira o telefone" />
                        </div>
                        <div>
                            E-mail: *<input type="email" name="email" value={dadosFornecedor.email} onChange={adicionaInfo} placeholder="exemplo@fornecedor.com" />
                        </div>
                        <div>
                            Contato Principal: *<input type="text" name="contato" value={dadosFornecedor.contato} onChange={adicionaInfo} placeholder="Nome do contato principal" />
                        </div>

                        <div>
                            <button type="submit">Atualizar</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
