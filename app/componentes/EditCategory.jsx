'use client'

import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";

export default function EditCategory({  category, existingCategories }) {
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
                alert('Categoria atualizada com sucesso');
                toggleEditMode();
                setIcon('')
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

                setIcon('');
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
                    body: JSON.stringify(categoryId), // Envia o ID da categoria
                });

                if (response.ok) {
                    alert("Categoria excluída com sucesso!");
                    atualiza();
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
           <BsPencilFill />
            <input onClick={toggleEditMode}
                type="text"
                value={valor}
                readOnly={!isEditing}
                onChange={(e) => setValor(e.target.value)}
                className={isEditing ? 'border' : 'bg-slate-100'}
            />

            <div onClick={() => atualizarCategory({ _id: category._id, nome: valor })} className="cursor-pointer">
                {icon}
            </div>
            <div onClick={() => deleteCategory(category)} className="cursor-pointer">
                <MdDelete />
            </div>
        </li>
    );
}
