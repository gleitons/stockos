import TitlePage from '../componentes/TitlePage'
import Print from '../componentes/imprimir/Print';



export default async function page() {
    const url = process.env.LINK_BD;

    const pegaFornecedores = async () => {
        try {

            const resp = await fetch(`${url}/api/fornecedor`);
            const data = await resp.json();
            if (resp.ok) {
                data.sort((a, b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa))
                return data
            }

        } catch (error) {
            console.log(error)
        }
    }
    const pegaProdutos = async () => {
        try {

            const resp = await fetch(`${url}/api/produto`);
            const data = await resp.json();

            return data
        } catch (error) {
            console.log(error)
        }
    }
    const fornecedores = await pegaFornecedores();
    const produtoss = await pegaProdutos();

    const verCategorias = () => {
        const categorias = produtoss.map(e => e.categoria);
        categorias.sort();

       return categorias.reduce((cont, catego) => {
            cont[catego] = (cont[catego] || 0) + 1;
            return cont;
        }, {})
        
    }
    const contagem = verCategorias()

    return (
        <div>
            <TitlePage titulo={'Relatórios de Produtos Associados'} />
            <div className='flex gap-10'>
                <div>
                    <h2>Selecione a Empresa</h2>
                    <div>
                        <Print fornecedor={fornecedores} produtos={produtoss} />

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
                    </div>
                </div>
            </div>
        </div>
    );
};
