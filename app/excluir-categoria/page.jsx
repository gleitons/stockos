import TitlePage from "../componentes/TitlePage";
import ExcluirCategoria from "../componentes/ExcluirCategoria";
export default async function page() {
    const fetchCategoria = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/categories', {cache: 'no-store'});
            const data = await resp.json();
            if(resp.ok) {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                return data;
            } else {
                console.log('ERRO Ao solicitar');
            }
        } catch (error) {
            
            console.log('ERRO AO PEGAR CATEGORIAS');
            return [];
        }
       
    }
    const showCategorias = await fetchCategoria();
    return (
        <div>
            <TitlePage titulo={'Excluir Categoria'} />
            <h2>Selecione a categoria</h2>
            <ul>
                {showCategorias.map((e) => (
                    <ExcluirCategoria key={e._id} obj={e} />
                ))}
            </ul>
        </div>
    )
};
