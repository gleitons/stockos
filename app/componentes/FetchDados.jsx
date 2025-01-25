export async function FetchDados() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        data.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena os dados
        if (response.ok) {
            return data; // Retorna os dados
        } else {
            console.error('Erro ao buscar categorias:', data);
            return []; // Retorna um array vazio em caso de erro
        }
    } catch (error) {
        console.error('Erro de rede ao buscar categorias:', error);
        return []; // Retorna um array vazio em caso de erro de rede
    }
}
