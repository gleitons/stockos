import EditarCategoria from "../componentes/EditarCategoria"
import TitlePage from "../componentes/TitlePage"

export const metadata = {
    title: 'StockOs - Editar Categoria',
    description: 'Criado por Gleiton Aparecido Soares de Souza - Cursos GranCursos - Analise e desenvolvimento de sistemas - ADS',
}

const initial = process.env.LINK_BD;
const fetchCategory = async () => {
    try {
        const resp = await fetch(`${initial}/api/categories`)
        const data = await resp.json();
        data.sort((a, b) => a.nome.localeCompare(b.nome))

        if (resp.ok) {
           
            return data;
        } else {
            console.log('Erro ao Chamar Categorias');
        }
    } catch (error) {
        return [];
    }
}
export default async function page() {
   
    const categorys = await fetchCategory();
    return (
        <div>
            <TitlePage titulo={'Editar Categoria'} />

            <p>Selecione a categoria</p>

            <ul className="overflow-auto justify-between flex flex-wrap">
                {
                    categorys.map(((e, index) => (
                        <EditarCategoria key={e._id} obj={e} numero={index} />
                    )))
                }
            </ul>


        </div>
    )
};
