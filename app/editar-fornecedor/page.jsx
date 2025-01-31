import TitlePage from '../componentes/TitlePage';
import EditarFornecedor from '../componentes/EditarFornecedor';



export default async function Page() {
  
  
    // Buscar dados diretamente no servidor
    const fetchFornecedores = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fornecedor', { cache: 'no-store' }); // 'no-store' para SSR dinâmico
            if (!response.ok) {
                // throw new Error('Erro ao buscar fornecedores');
            }
            return await response.json();
        } catch (error) {
            
            return []; // Retorna array vazio em caso de erro
        }
    };
    
    const fornecedores = await fetchFornecedores();

    return (
        <div >
            <TitlePage titulo="Editar Fornecedor" />

            <div className="flex gap-10 relative">
                <div>
                    <h2>Lista de Fornecedores:</h2>
                    {fornecedores.length > 0 ? (
                        <ul>
                            {fornecedores.map((fornecedor, index) => (
                                <EditarFornecedor empresa={fornecedor} atualiza={fetchFornecedores()}  key={index} />
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum fornecedor encontrado.</p>
                    )}
                </div>
                <div>
                 
                </div>
            </div>
        </div>
    );
}
