'use client'
import { useState, useEffect } from "react";
import EditCategory from "./EditCategory";

export default function CadastrarCategoria() {
    // Estados para armazenar a nova categoria e as categorias existentes
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categorias, setCategorias] = useState([]); // Novo estado para armazenar as categorias
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

    // Função para buscar categorias do backend
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            if (response.ok) {
                setCategorias(data);
                setIsLoading(false) // Define as categorias no estado
            } else {
                console.error('Erro ao buscar categorias:', data);
            }
        } catch (error) {
            console.error('Erro de rede ao buscar categorias:', error);
        }
    };

    // UseEffect para buscar categorias ao montar o componente
    useEffect(() => {
        fetchCategories();
    }, []);

    const cadastroCategoria = async () => {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: newCategoryName })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Categoria salva com sucesso:', data);
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
                <div>
                    <div>
                        <h2>Nova Categoria</h2>
                    </div>
                    <div>
                        Título: <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Digite a nova categoria"
                        />
                    </div>
                    <div>
                        <button onClick={cadastroCategoria}>Cadastrar Categoria</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
