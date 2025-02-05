import TitlePage from "../componentes/TitlePage";
import ExcluirCategoria from "../componentes/ExcluirCategoria";

const url = process.env.LINK_BD;
const fetchCategoria = async () => {
    try {
        const resp = await fetch(`${url}/api/categories`);
        const data = await resp.json();
        if (resp.ok) {
            await data.sort((a, b) => a.nome.localeCompare(b.nome));
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
export default async function page() {
   

    const showCategorias = await fetchCategoria();
   

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md">
                <TitlePage titulo="Excluir Categoria" />
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 overflow-auto h-screen">
                <ul className="divide-y divide-gray-200 pb-96 flex flex-wrap justify-between ">
                    {showCategorias.map((e, index) => (
                        <li key={index} className="py-2 hover:bg-gray-50 w-1/4 text-center items-center bg-slate-300 m-2  transition">
                            <ExcluirCategoria  obj={ e._id} nome={e.nome} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
