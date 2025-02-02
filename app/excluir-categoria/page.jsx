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
        <div className="p-2 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md">
                <TitlePage titulo="Excluir Categoria" />
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 overflow-auto h-screen">
                <ul className="divide-y divide-gray-200 pb-96 flex flex-wrap justify-between ">
                    {showCategorias.map((e) => (
                        <li key={e._id} className="py-2 hover:bg-gray-50 w-1/4 text-center items-center bg-slate-300 m-2  transition">
                            <ExcluirCategoria obj={e} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
