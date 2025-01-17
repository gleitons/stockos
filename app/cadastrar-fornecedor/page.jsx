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
                    Nome da Empresa: <input type="text" name="" id="" placeholder="Insira o nome da empresa" />
                </div>
                <div>
                Endereço (obrigatório): <input type="text" name="" id="" placeholder="Insira o endereço completo da empresa" />
                </div>
            </div>

        </div>
    )
};
