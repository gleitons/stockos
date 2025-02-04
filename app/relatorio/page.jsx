import TitlePage from '../componentes/TitlePage'
import Print from '../componentes/imprimir/Print';



export default async function page() {
    const url = process.env.LINK_BD;
    const pegaFornecedores = async () => {
        try {
           const resp = await fetch(`${url}/api/fornecedor`);
           const data = await resp.json();
           return data
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
    return (
        <div>
            <TitlePage titulo={'Relatórios de Produtos Associados'}  />
            <div className='flex gap-10'>
                <div>
                    <h2>Selecione a Empresa</h2>
                    <div>
                    <ul>
                        {fornecedores.map((e) => (
                            <Print key={e._id} fornecedor={e} produtos={produtoss} />
                            
                        ))}
                    </ul>
                    </div>
                </div>
                <div>
                    <h2>*ATENÇÃO: Caso não imprima na primeira tentativa, tente novamente.</h2>
                    <div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};
