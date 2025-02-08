import TitlePage from '../componentes/TitlePage'
import ExcluirFornecedor from '../componentes/ExcluirFornecedor'



export const metadata = {
    title: 'StockOs -Excluir fornecedor',
    description: 'Criado por Gleiton Aparecido Soares de Souza - Cursos GranCursos - Analise e desenvolvimento de sistemas - ADS',
}


export default async function page() {

 
    const url = process.env.LINK_BD
    const fetchFornecedor = async () => {
        try {
            const response = await fetch(`${url}/api/fornecedor`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Erro ao buscar fornecedores');
            }
            const data = await response.json();
            data.sort((a, b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa))
            return data;
        } catch (error) {

            return [];
        }
    }
    const fornecedor = await fetchFornecedor();
    return (
        <div className='relative'>
            <TitlePage titulo={'Excluir Fornecedor'} />

            <div className='flex gap-10'>
                <div>
                    <ul className="relative h-[400px] pb-56 overflow-auto">
                        {
                            fornecedor.map((e, index) => (
                                <ExcluirFornecedor key={index} fornec={e} />
                            ))
                        }

                    </ul>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
};
