import EditarCategoria from "../componentes/EditarCategoria"
import TitlePage from "../componentes/TitlePage"
export default async function page() {
    const initial = process.env.LINK_BD;
    const fetchCategory = async () => {
        try {
            const resp = await fetch(`${initial}/api/categories`, { cache: 'no-store' })
            const data = await resp.json();
           

            if (resp.ok) {
                data.sort((a, b) => a.nome.localeCompare(b.nome))
                return data;
            } else {
                console.log('Erro ao Chamar Categorias');
            }
        } catch (error) {
            return [];
        }
    }
    const categorys = await fetchCategory();
    return (
        <div>
            <TitlePage titulo={'Editar Categoria'} />

            <p>Selecione a categoria</p>

            <ul className="h-screen pb-96 overflow-auto">
                {
                    categorys.map(((e) => (
                        <EditarCategoria key={e._id} obj={e} />
                    )))
                }
            </ul>


        </div>
    )
};
