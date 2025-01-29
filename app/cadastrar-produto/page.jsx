'use client'
import CadastrarCategoria from "../componentes/CadastrarCategoria";
import TitlePage from "../componentes/TitlePage";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
// import { categoria } from "../base/Categoria";
// export const metadata = {
//     title: "StockOs - Cadastrar Produto",
//     description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
// };

export default function page() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [newCategory, setNewCategory] = useState(false);
    const [baseImagem, setBaseImagem] = useState('')

    const [produto, setProduto] = useState({
        codigoDeBarras: '',
        nomeDoProduto: '',
        descricao: '',
        estoque: '',
        categoria: '',
        dataValidade: '',
        imagem: baseImagem
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
                setBaseImagem(reader.result);
                setProduto(prevState => ({
                    ...prevState,
                    imagem: reader.result
                }));
            };

            reader.readAsDataURL(file);
        }
    };




    const pegaCategorias = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            data.sort((a, b) => a.nome.localeCompare(b.nome))
            if (response.ok) {
                setCategorias(data); // Define as categorias no estado
            } else {
                console.error('Erro ao buscar categorias:', data);
            }

        } catch (error) {

        }
    }


    const cadastraProduto = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)

            });
            const data = await resp.json();
            if (resp.ok) {
                alert('Produto cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar Produto: ' + data.error);
            }
        } catch (error) {

        }
    };



    useEffect(() => {
        pegaCategorias();
    }, []);



    const novaCat = (e) => {
        e.preventDefault()
        const verifica = !newCategory ? true : false;

        if (verifica) {
            const aviso = "*ATENÇÃO* - Cadastrar uma nova categoria nessa página apagará os dados preenchidos. Deseja continuar?"
            if (confirm(aviso) == true) {
                setNewCategory(verifica)
               
            }
        } else {
            setNewCategory(verifica)
        }


    }


    return (
        <div className="relative">
            <TitlePage titulo='Cadastro de Produtos' />

            <div>
                Código de Barras: <input type="number" name="codigoDeBarras" value={produto.codigoDeBarras} onChange={geraObjeto} placeholder="789123" /> <button>Continuar</button>
                {/* onSubmit={cadastraProduto} */}
                <form onSubmit={cadastraProduto} >
                    <div>
                        Categoria: *
                        <select name="categoria" value={produto.categoria} onChange={geraObjeto}>
                            <option value="">Selecione</option>
                            {
                                categorias.map((e, index) => (
                                    <option key={index} value={e.nome}>{e.nome}</option>
                                ))
                            }
                        </select>

                        <button onClick={novaCat}>Nova Categoria</button>
                    </div>

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
                        Data de Validade: <input type="date" name="dataValidade" value={produto.dataValidade} onChange={geraObjeto} placeholder="Validade" />
                    </div>
                    <div>

                        Imagem do Produto:
                        <input type="file" accept=".png, .jpg, .gif, .webp" onChange={handleImageChange} />
                        <input className="invisible" type="text" name="dataValidade" value={baseImagem} />
                        {previewImage &&
                            <div>
                                <Image src={previewImage} width={24} height={24} alt="Preview" className="w-24 h-24 object-cover" />

                            </div>

                        }
                    </div>

                    <div>
                        <input type="submit" value="Cadastrar" />
                    </div>

                </form>
                {
                    newCategory && (
                        <div className="w-full absolute left-0 top-0 p-10 bg-white  h-screen">
                            <div onClick={novaCat} className="text-3xl hover:cursor-pointer w-fit text-red"><IoMdCloseCircle /></div>
                            <CadastrarCategoria />
                        </div>
                    )
                }




            </div>

        </div>
    )
};
