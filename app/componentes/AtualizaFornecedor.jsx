'use client'
import { useState } from "react"
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function AtualizaFornecedor({daEmpresa}) {
   
    const [dadosFornecedor, setDadosFornecedor] = useState({
        cnpj: 123,
        nomeEmpresa: "daEmpresa",
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
    const atualizarFornecedor = () => {
        alert('Auditor Fiscal');
    }
    const adicionaInfo = (e) => {
        const info = e.target.value;
        setDadosFornecedor(info)
      
    }

    return (
        <div>
            <div className="text-3xl">
            <FaArrowAltCircleLeft />
            </div>
           
            <form onSubmit={atualizarFornecedor} >
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
                    Bairro: *<input type="text" name="bairro" value={dadosFornecedor.bairro} onChange={adicionaInfo} placeholder="Insira o bairro da empresa" />
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
                    <button type="submit">Atualizar</button>
                </div>

            </form>
        </div>
    )
};
