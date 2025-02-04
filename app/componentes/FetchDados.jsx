export async function FetchDados() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        data.sort((a, b) => a.nome.localeCompare(b.nome)); 
        if (response.ok) {
            return data;
        } else {
            console.error('Erro ao buscar categorias:', data);
            return []; 
        }
    } catch (error) {
        console.error('Erro de rede ao buscar categorias:', error);
        return []; 
    }
}
