import TitlePage from '../componentes/TitlePage'
import Print from '../componentes/imprimir/Print';


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

export default async  function page() {
   
    const fornecedores = await  pegaFornecedores();
    const produtoss = await pegaProdutos();

    console.log(produtoss)

    const verCategorias = async () => {
        const categorias = await produtoss.map(e => e.categoria);
        categorias.sort();

       return categorias.reduce((cont, catego) => {
            cont[catego] = (cont[catego] || 0) + 1;
            return cont;
        }, {})
        
    }
    const contagem = await verCategorias()

    return (
        <div>
            <TitlePage titulo={'Relatórios de Produtos Associados'} />
            <div className='flex gap-10'>
                <div>
                    <h2>Selecione a Empresa</h2>
                    <div>
                        <Print fornecedor={await fornecedores} produtos={await produtoss} />

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
