import TitlePage from '../componentes/TitlePage'
import ExcluirFornecedor from '../componentes/ExcluirFornecedor'

export default async function page() {
    const fetchFornecedor = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fornecedor', { cache: 'no-store' }); // 'no-store' para SSR dinâmico
            if (!response.ok) {
                 throw new Error('Erro ao buscar fornecedores');
            }
            return await response.json();
        } catch (error) {
            
            return []; // Retorna array vazio em caso de erro
        }
    }
    const fornecedor = await fetchFornecedor();
    return (
        <div className='relative'>
            <TitlePage titulo={'Excluir Fornecedor'} />

            <div className='flex gap-10'>
                <div>
                    <ul>
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
