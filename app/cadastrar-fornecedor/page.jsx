import TitlePage from "../componentes/TitlePage";
export const metadata = {
    title: "StockOs - Cadastrar Fornecedor",
    description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
};

export default function page() {
    return (
        <div>
            <TitlePage titulo='Cadastro de Fornecedor' />

            <div>
                CNPJ: <input type="text" name="" id="" placeholder="00.000.000/0000-00" /> <button>Continuar</button>

                <div>
                    Nome da Empresa: *<input type="text" name="" id="" placeholder="Insira o nome da empresa" />
                </div>
                <div>
                    Endereço: *<input type="text" name="" id="" placeholder="Insira o endereço completo da empresa" />
                </div>
                <div>
                    Telefone: *<input type="text" name="" id="" placeholder="Insira o endereço completo da empresa" />
                </div>
                <div>
                    E-mail: *<input type="text" name="" id="" placeholder="exemplo@fornecedor.com" />
                </div>
                <div>
                    Contato Principal: *<input type="text" name="" id="" placeholder="Nome do contato principal" />
                </div>
                <div>
                    <input type="submit" name="" id=""  />
                </div>
            </div>

        </div>
    )
};
