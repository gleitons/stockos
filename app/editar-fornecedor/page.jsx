import TitlePage from '../componentes/TitlePage';
import EditarFornecedor from '../componentes/EditarFornecedor';
export const dynamic = "force-dynamic";
import Link from 'next/link';

export const metadata = {
    title: 'StockOs - Editar Fornecedor',
    description: 'Criado por Gleiton Aparecido Soares de Souza - Cursos GranCursos - Analise e desenvolvimento de sistemas - ADS',
}

const fetchFornecedores = async () => {
    try {
        const url = process.env.LINK_BD;
        const response = await fetch(`${url}/api/fornecedor`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Erro ao buscar fornecedores');
        }
        const fornec = await response.json();
        fornec.sort((a, b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa))
        return await fornec;
    } catch (error) {
        console.error(error);
        return [];
    }
};
export default async function Page() {



    const fornecedores = await fetchFornecedores();

    return (
        <div className=" bg-gray-100 min-h-screen">
            <TitlePage titulo="Editar Fornecedor" />

            <div className="flex gap-10 mt-6">

                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Fornecedores:</h2>
                    {fornecedores.length > 0 ? (
                        <ul className="space-y-4 h-[400px] overflow-auto pb-52">
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

                <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Fornecedor</h2>
                    <p className="text-gray-600 mb-6">Selecione um fornecedor para editar ou visualizar detalhes.</p>

                    <div className="flex gap-4 mb-6">
                        <Link href="/cadastrar-fornecedor">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                Cadastrar Fornecedor
                            </button>
                        </Link>
                        <Link href="/excluir-fornecedor">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                Excluir Fornecedor
                            </button>
                        </Link>
                    </div>

                    <p className="text-gray-700">
                        Fornecedores Cadastrados: <span className="font-semibold text-custom-gray-dark">{fornecedores.length}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}