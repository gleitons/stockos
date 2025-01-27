import TitlePage from "../componentes/TitlePage"
export default async function page() {
    const fetchCategoria = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/categories', {cache: 'no-store'});
            const data = await resp.json();
            if(resp.ok) {
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
                    <li key={e._id}>{e.nome}</li>
                ))}
            </ul>
        </div>
    )
};
