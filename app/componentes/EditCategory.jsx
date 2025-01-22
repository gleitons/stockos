'use client'

import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export default function EditCategory({ category, existingCategories, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [valor, setValor] = useState(category.nome);
    const [icon, setIcon] = useState();
    //<BsFillPencilFill />


    const atualizarCategory = async (newCategoryName) => {
        
        try {
            const response = await fetch(`/api/categories/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategoryName)
            });

            if (response.ok) {
                // const data = await response.json();
                alert('Categoria atualizada com sucesso');
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar categoria:', errorData.error);
                alert(`Erro ao atualizar categoria: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Erro de rede ao atualizar categoria:', error);
            alert("Erro de rede ao atualizar categoria.");
        }
    };

    const toggleEditMode = async () => {

        if (isEditing) {
            if (existingCategories.includes(valor)) {
                alert('Categoria Existente ou não alterada!');
            } else {

                setIcon(<BsFillPencilFill />);
                setIsEditing(false);
            }
        } else {
            setIcon(<IoSave />);
            setIsEditing(true);
        }
    };


    const deleteCategory = async (categoryId) => {
        const confirmation = confirm("Confirmar a exclusão!");

        if (confirmation) {
            try {
                const response = await fetch(`/api/categories`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: categoryId }), // Envia o ID da categoria
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log("Categoria excluída com sucesso:", data);
                    alert("Categoria excluída com sucesso!");
                } else {
                    const errorData = await response.json();
                    console.error("Erro ao excluir categoria:", errorData.error);
                    alert(`Erro ao excluir categoria: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Erro de rede ao excluir categoria:", error);
                alert("Erro de rede ao excluir categoria.");
            }
        } else {
            alert('Cancelado a exclusão');
        }
    };



    return (
        <li className="flex items-center gap-2">
            <input onClick={toggleEditMode}
                type="text"
                value={valor}
                readOnly={!isEditing}
                onChange={(e) => setValor(e.target.value)}
                className={isEditing ? 'border' : 'bg-slate-100'}
            />{valor}
       
            <div onClick={() => atualizarCategory({ _id: category._id, nome: valor })} className="cursor-pointer">
                {icon}
            </div>
            <div onClick={deleteCategory} className="cursor-pointer">
                <MdDelete />
            </div>
        </li>
    );
}
