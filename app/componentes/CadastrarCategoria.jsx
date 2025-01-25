'use client'
import { useState, useEffect } from "react";
import EditCategory from "./EditCategory";
import { FetchDados } from "./FetchDados";

export default function CadastrarCategoria() {
    // Estados para armazenar a nova categoria e as categorias existentes
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categorias, setCategorias] = useState([]); // Novo estado para armazenar as categorias
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento


    // UseEffect para buscar categorias ao montar o componente
    useEffect( () => {
        const pegaDa = async () => {
            const SolicitaCategoria = await FetchDados();
            console.log(await FetchDados());
            setCategorias(SolicitaCategoria);
            setIsLoading(false) // 
        }
        // fetchCategories();
        pegaDa()
       
    }, []);

    const cadastroCategoria = async (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: newCategoryName })
            });
            console.log(newCategoryName)
            const data = await response.json();
            if (response.ok) {
                alert('Categoria salva com sucesso');
                setNewCategoryName('');
                fetchCategories(); // Recarrega as categorias após o cadastro
            } else {
                alert('Erro ao salvar categoria: Contate o suporte', data);
            }
        } catch (error) {
            console.error('Erro de rede ao salvar categoria:', error);
        }
    };

    return (
        <div>
            <h2>Cadastrar Categoria</h2>
            <p>A categoria deverá ser cadastrada aqui</p>
            <div className="flex gap-4">
                <div>
                    <div>
                        <h2>Editar Categorias</h2>
                        <div>
                            {isLoading ? (
                                <p>Carregando categorias...</p> // Mensagem de carregamento
                            ) : (
                                <ul>
                                    {categorias.map((e, index) => (
                                        <EditCategory key={index} category={e} existingCategories={categorias} />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <form onSubmit={cadastroCategoria}>
                    <div>
                        <h2>Nova Categoria</h2>
                    </div>
                    <div>
                        Título: <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Digite a nova categoria"
                            required
                        />
                    </div>
                    <div>
                        <button >Cadastrar Categoria</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
