'use client'
import CadastrarCategoria from "../componentes/CadastrarCategoria";
import TitlePage from "../componentes/TitlePage";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
// import { categoria } from "../base/Categoria";
// export const metadata = {
//     title: "StockOs - Cadastrar Produto",
//     description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
// };

export default function page() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categoria, setCategoria] = useState([]);
    const [newCategory, setNewCategory] = useState(false);

    const [produto, setProduto] = useState({
        codigoDeBarras: '',
        nomeDoProduto: '',
        descricao: '',
        estoque: '',
        category: '',
        dataValidade: '',
        imagem: ''
    })

    const geraObjeto = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value })
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const pegaCategorias = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            if (response.ok) {
                setCategoria(data); // Define as categorias no estado
            } else {
                console.error('Erro ao buscar categorias:', data);
            }

        } catch (error) {

        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
        }
    };



    useEffect(() => {
        pegaCategorias();
    }, [])
    const novaCat = () => {
        const verifica = !newCategory ? true : false;
        setNewCategory(verifica)
    }
    const cadastraProduto = () => {
        console.log('Completo')
    }

    return (
        <div className="relative">
            <TitlePage titulo='Cadastro de Produtos' />

            <div>
                Código de Barras: <input type="number" name="" id="" placeholder="789123" /> <button>Continuar</button>
                {/* onSubmit={cadastraProduto} */}
                <form >
                    <div>
                        Nome do Produto: *<input type="text" name="nomeDoProduto" value={produto.nomeDoProduto} onChange={geraObjeto} placeholder="Insira o nome do produto" />
                    </div>

                    <div>
                        Descrição: *<input type="text" name="descricao" value={produto.descricao} onChange={geraObjeto} placeholder="Descreva brevemente o produto" />
                    </div>

                    <div>
                        Quantidade em Estoque: *<input type="number" name="estoque" value={produto.estoque} onChange={geraObjeto} placeholder="Quantidade disponível" />
                    </div>

                    <div>
                        Categoria: *
                        <select name="category" value={produto.categoy} onChange={geraObjeto}>
                            <option value="">Selecione</option>
                            {
                                categoria.map((e, index) => (
                                    <option key={index} value={e.nome}>{e.nome}</option>
                                ))
                            }
                        </select>
                        
                        <button onClick={novaCat}>Nova Categoria</button>
                    </div>


                </form>
                {produto.nomeDoProduto}
                {produto.category}




                {
                    newCategory && (
                        <div className="w-full absolute left-0 top-0 p-10 bg-white  h-screen">
                            <div onClick={novaCat} className="text-3xl hover:cursor-pointer w-fit text-red"><IoMdCloseCircle /></div>
                            <CadastrarCategoria />
                        </div>
                    )
                }

                <div>
                    Data de Validade: <input type="date" name="" id="" placeholder="Nome do contato principal" />
                </div>
                <div>
                    Imagem do Produto:
                    <input type="file" accept=".png, .jpg, .gif" onChange={handleImageChange} />
                    {previewImage && <img src={previewImage} alt="Preview" className="w-64 h-64 object-cover" />}
                </div>
                <div>
                    <input type="submit" value="Cadastrar" />
                </div>
            </div>

        </div>
    )
};
