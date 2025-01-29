import TitlePage from "../componentes/TitlePage";
import ExcluirProduto from "../componentes/exclusao/ExcluirProduto";
export default async function page() {
    const buscaProdutos = async () => {
        try {
            const resp = await fetch(`${process.env.LINK_BD}/api/produto`, {cache: 'no-store'});
            const data = await resp.json();

            if (resp.ok) {
                return data
            } else {
                console.log('Erro ao solicitar Produtos');
            }
        } catch (error) {
            console.log('Erro, nao foi possivel fazer o fetch');
            return [];
        }

    }
    const produtos = await buscaProdutos();
    return (
        <div className="relative bg-gray-50 min-h-screen text-gray-800 p-6">
            <TitlePage titulo={'Excluir Produto'} />
            <div className="w-2/3 bg-white shadow-macos p-4 rounded-macos">
                <h2 className="text-xl font-semibold">SELECIONE O PRODUTO</h2>
                <div>
                    <ul className="relative">
                        {produtos.map((e) => (
                           <ExcluirProduto key={e._id} product={e} />
                        ))}
                    </ul>
                </div>
                
            </div>

        </div>
    )
};
