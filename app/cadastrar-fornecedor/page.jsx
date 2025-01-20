'use client'

import TitlePage from "../componentes/TitlePage";
import { useState } from "react";
// export const metadata = {
//     title: "StockOs - Cadastrar Fornecedor",
//     description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
// };

export default function page() {

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
    })

    const adicionaInfo = (e) => {
        setDadosFornecedor({ ...dadosFornecedor, [e.target.name]: e.target.value })
    }
    const cadastrarFornecedor = async (e) => {
        e.preventDefault();
        try {

            const resp = await fetch('/api/fornecedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(dadosFornecedor)
            })
            const data = await resp.json();
            if (resp.ok) {
                alert('Fornecedor cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar fornecedor: ' + data.error);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <TitlePage titulo='Cadastro de Fornecedor' />

            <div>
                CNPJ: <input type="text" name="cnpj" value={dadosFornecedor.cnpj} onChange={adicionaInfo} placeholder="00.000.000/0000-00" /> <button>Continuar</button>

               { Object.keys(dadosFornecedor).length}
               
                <form onSubmit={cadastrarFornecedor} >
                    <div>
                        Nome da Empresa: *<input type="text" name="nomeEmpresa" value={dadosFornecedor.nomeEmpresa} onChange={adicionaInfo} placeholder="Insira o nome da empresa" />
                    </div>
                    <div>
                        Logradouro: *<input type="text" name="logradouro" value={dadosFornecedor.logradouro} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                    </div>
                    <div>
                        Numero: * <input type="number" name="numero" value={dadosFornecedor.numero} onChange={adicionaInfo} placeholder="Insira o numero" />
                    </div>
                    <div>
                        Bairro: *<input type="text" name="numero" value={dadosFornecedor.numero} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                    </div>
                    <div>
                        CEP: *<input type="text" name="cep" value={dadosFornecedor.cep} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                    </div>
                    <div>
                        Cidade: *<input type="text" name="cidade" value={dadosFornecedor.cidade} onChange={adicionaInfo} placeholder="Insira a cidade" />
                    </div>
                    <div>
                        Telefone: *<input type="text" name="telefone" value={dadosFornecedor.telefone} onChange={adicionaInfo} placeholder="Insira o Telefone" />
                    </div>
                    <div>
                        E-mail: *<input type="email" name="email" value={dadosFornecedor.email} onChange={adicionaInfo} placeholder="exemplo@fornecedor.com" />
                    </div>
                    <div>
                        Contato Principal: *<input type="text" name="contato" value={dadosFornecedor.contato} onChange={adicionaInfo} placeholder="Nome do contato principal" />
                    </div>

                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                    {/* <div>
                        Produtos Vinculados: *<input type="text" name='produtosViculados' value={"0"}  readOnly placeholder="Insira o nome da empresa" />
                    </div> */}
                </form>

                {/* CNPJ: <input type="text" value={cnpj} placeholder="00.000.000/0000-00" /> <button>Continuar</button>

                
                
               
                <div>
                    <input type="submit" name="" id=""  />
                </div> */}
            </div>

        </div>
    )
};
