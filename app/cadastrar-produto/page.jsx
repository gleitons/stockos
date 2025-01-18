import TitlePage from "../componentes/TitlePage";
export const metadata = {
    title: "StockOs - Cadastrar Produto",
    description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
};

export default function page() {
    return (
        <div>
            <TitlePage titulo='Cadastro de Produtos' />

            <div>
                Código de Barras: <input type="number" name="" id="" placeholder="789123" /> <button>Continuar</button>

                <div>
                    Nome do Produto: *<input type="text" name="" id="" placeholder="Insira o nome do produto" />
                </div>
                <div>
                    Descrição: *<input type="text" name="" id="" placeholder="Descreva brevemente o produto" />
                </div>
                <div>
                    Quantidade em Estoque: *<input type="number" name="" id="" placeholder="Quantidade disponível" />
                </div>
                <div>
                    Categoria: * <select name="" id="">
                        <option value="">Selecione</option>
                        <option value="">Eletrônicos</option>
                        <option value="">Alimentos</option>
                        <option value="">Vestuário</option>
                    </select> <button>Nova Categoria</button>
                </div>
                <div>
                    Data de Validade: <input type="date" name="" id="" placeholder="Nome do contato principal" />
                </div>
                <div>
                    Imagem do Produto: <input type="file" name="" id="" placeholder="Nome do contato principal" />
                </div>
                <div>
                    <input type="submit" name="Cadastrar" id="" />
                </div>
            </div>

        </div>
    )
};
