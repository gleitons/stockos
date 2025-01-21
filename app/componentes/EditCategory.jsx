'use client'

import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export default function EditCategory({ category, existingCategories, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [valor, setValor] = useState(category.nome);
    const [icon, setIcon] = useState(<BsFillPencilFill />);

    const toggleEditMode = () => {
        if (isEditing) {
            if (existingCategories.includes(valor)) {
                alert('Categoria Existente ou não alterada!');
            } else {
                saveCategory(valor);
                setIcon(<BsFillPencilFill />);
                setIsEditing(false);
            }
        } else {
            setIcon(<IoSave />);
            setIsEditing(true);
        }
    };

    const deleteCategory = async () => {
        const confirmation = confirm("Confirmar a exclusão!");
        
        if (confirmation) {
            try {
                const response = await fetch(`/api/categories/${category._id}`, { 
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
    
                if (response.ok) {
                    alert("Deletado com sucesso!");
                    onDelete(category._id); 
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao deletar categoria: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Erro ao deletar categoria:', error);
                alert("Erro de rede ao deletar categoria.");
            }
        } else {
            alert('Cancelado a exclusão');
        }
    };
    
    const saveCategory = async (newCategoryName) => {
        // try {
        //     const response = await fetch('/api/save-category', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ nome: newCategoryName })
        //     });
        //     const data = await response.json();
        //     if (response.ok) {
        //         console.log('Categoria salva com sucesso:', data);
        //     } else {
        //         console.error('Erro ao salvar categoria:', data);
        //     }
        // } catch (error) {
        //     console.error('Erro de rede ao salvar categoria:', error);
        // }
    };

    return (
        <li className="flex items-center gap-2">
            <input
                type="text"
                value={valor}
                readOnly={!isEditing}
                onChange={(e) => setValor(e.target.value)}
                className={isEditing ? 'border' : 'bg-slate-100'}
            />
            <div onClick={toggleEditMode} className="cursor-pointer">
                {icon}
            </div>
            <div onClick={deleteCategory} className="cursor-pointer">
                <MdDelete />
            </div>
        </li>
    );
}
