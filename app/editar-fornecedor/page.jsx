import TitlePage from '../componentes/TitlePage';
import EditarFornecedor from '../componentes/EditarFornecedor';
export const dynamic = "force-dynamic"; 

export default async function Page() {
    
    const fetchFornecedores = async () => {
        try {
            const url = process.env.LINK_BD;
            const response = await fetch(`${url}/api/fornecedor`, {cache: 'no-store'});
            if (!response.ok) {
                throw new Error('Erro ao buscar fornecedores');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const fornecedores = await fetchFornecedores();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <TitlePage titulo="Editar Fornecedor" />

            <div className="flex gap-10 mt-6">

                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Fornecedores:</h2>
                    {fornecedores.length > 0 ? (
                        <ul className="space-y-4">
                            {fornecedores.map((fornecedor, index) => (
                                <EditarFornecedor
                                    empresa={fornecedor}
                                    atualiza={fetchFornecedores()}
                                    key={index}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Nenhum fornecedor encontrado.</p>
                    )}
                </div>

                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Fornecedor</h2>
                    <p className="text-gray-600">Selecione um fornecedor para editar ou visualizar detalhes.</p>
                </div>
            </div>
        </div>
    );
}