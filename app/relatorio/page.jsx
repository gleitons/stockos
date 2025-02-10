import TitlePage from '../componentes/TitlePage'
import Pdf from '../componentes/relatorio/Pdf'


const url = process.env.LINK_BD;

const pegaFornecedores = async () => {
    try {

        const resp = await fetch(`${url}/api/fornecedor`, { cache: 'no-store' });
        const data = await resp.json();
        if (resp.ok) {
            data.sort( (a, b) =>  a.nomeEmpresa.localeCompare(b.nomeEmpresa))
            return data
        }

    } catch (error) {
        console.log(error)
    }
}
const pegaProdutos = async () => {
    try {

        const resp = await fetch(`${url}/api/produto`, { cache: 'no-store' });
        const data = await resp.json();
        if (resp.ok) {
            data.sort( (a, b) =>  a.nomeDoProduto.localeCompare(b.nomeDoProduto));
            return data
        }

    } catch (error) {
        console.log(error)
    }
}

export default async function page() {
    const vinculados = []
    const [fornecedores, produtoss] = await Promise.all([pegaFornecedores(), pegaProdutos()]);

   
    const togetter = () => {
        fornecedores.forEach((fornecedor) => {
          

            const produtosVinculados = (fornecedor.produtosViculados || []).map(produtoId => {
                const produtoCompleto = produtoss.find(produto => produto._id === produtoId);

                if (produtoCompleto) {

                    const product = {
                        'nomeDoProduto': produtoCompleto.nomeDoProduto,
                        'estoque': produtoCompleto.estoque,
                        'categoria': produtoCompleto.categoria,
                        'dataValidade': produtoCompleto.dataValidade,
                        'imagem': produtoCompleto.imagem,

                    }

                    return product
                }
            }).filter(Boolean); // Remove valores nulos caso o produto não seja encontrado

            
            vinculados.push({
                ...fornecedor,
                produtos: produtosVinculados,
            });
        });
        vinculados.sort((a,b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa))
        return vinculados;
    };

    const verCategorias = async () => {
        const categorias = await produtoss.map(e => e.categoria);
        categorias.sort();

        return categorias.reduce((cont, catego) => {
            cont[catego] = (cont[catego] || 0) + 1;
            return cont;
        }, {})

    }
    const contagem = await verCategorias();
   
    const pVinc = togetter();
    
   

    return (
        <div>
            <TitlePage titulo={'Relatórios de Produtos Associados'} />
            <div className='flex gap-10'>
                <div className='w-1/3 '>
                    <h2>Selecione a Empresa</h2>
                    <div className='h-[400px] overflow-auto bg-slate-300 p-3 rounded-md'>
                        {pVinc.map((e, index) => (
                            <Pdf key={index}  produtosV={e} />
                        ))}

                    </div>
                </div>
                <div>
                    <h2>*CATEGORIAS CADASTRADAS E VINCULADAS: </h2>
                    <div>
                        {Object.entries(contagem).map(([categoria, quantidade]) => (
                            <li key={categoria} className="p-2 border rounded-md">
                                {categoria}: {quantidade}
                            </li>
                        ))}
                        Quantidade de Categorias Cadastradas: {Object.entries(contagem).length}
                    </div>
                </div>
            </div>
        </div>
    );
};
