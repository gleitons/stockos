import TitlePage from "../componentes/TitlePage";
import ExcluirCategoria from "../componentes/ExcluirCategoria";

export default async function Page() {
    const fetchCategoria = async () => {
        try {
            const resp = await fetch("http://localhost:3000/api/categories", { cache: "no-store" });
            const data = await resp.json();
            if (resp.ok) {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                return data;
            } else {
                console.log("Erro ao solicitar categorias");
                return [];
            }
        } catch (error) {
            console.log("Erro ao pegar categorias");
            return [];
        }
    };

    const showCategorias = await fetchCategoria();

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Título da Página */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                <TitlePage titulo="Excluir Categoria" />
            </div>

            {/* Subtítulo */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selecione a categoria</h2>

            {/* Lista de Categorias */}
            <div className="bg-white shadow-lg rounded-2xl p-6 overflow-auto h-screen">
                <ul className="divide-y divide-gray-200 pb-96">
                    {showCategorias.map((e) => (
                        <li key={e._id} className="py-4 hover:bg-gray-50 transition">
                            <ExcluirCategoria obj={e} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
