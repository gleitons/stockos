import TitlePage from '../componentes/TitlePage'
import ExcluirFornecedor from '../componentes/ExcluirFornecedor'

export default async function page() {
    const url = process.env.LINK_BD
    const fetchFornecedor = async () => {
        try {
            const response = await fetch(`${url}/api/fornecedor`, { cache: 'no-store' }); 
            if (!response.ok) {
                 throw new Error('Erro ao buscar fornecedores');
            }
            return await response.json();
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
                    <ul  className="relative h-[400px] pb-56 overflow-auto">
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
