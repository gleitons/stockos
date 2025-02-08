import TitlePage from "../componentes/TitlePage";
import ExcluirProduto from "../componentes/exclusao/ExcluirProduto";

const initial = process.env.LINK_BD;
const buscaProdutos = async () => {
    try {
        const resp = await fetch(`${initial}/api/produto`, { cache: 'no-store' })
        const data = await resp.json();       

        if (resp.ok) {
            data.sort((a,b) =>  a.nomeDoProduto.localeCompare(b.nomeDoProduto))
            return data;
        } else {
            console.log('Erro ao solicitar Produtos');
        }
    } catch (error) {
        return [];
    }
}



export default async function page() {
   
    const produtos = await buscaProdutos();
   
    return (
        <div className="relative bg-gray-50 min-h-screen text-gray-800 ">
            <TitlePage titulo={'Excluir Produto'} />
            <div className="w-2/3 bg-white shadow-macos p-4 rounded-macos">
                <h2 className="text-xl font-semibold">SELECIONE O PRODUTO</h2>
                <div>
                    <ul className="relative h-[400px] pb-56 overflow-auto">
                        {produtos.map((e, index) => (
                           <ExcluirProduto key={index} product={e} />
                        ))}
                    </ul>
                </div>
                
            </div>

        </div>
    )
};
