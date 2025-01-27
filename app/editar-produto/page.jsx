"use client"
import CadastrarCategoria from "../componentes/CadastrarCategoria";
import TitlePage from "../componentes/TitlePage";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import GifLoad from "../componentes/GifLoad";


export default function Page() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categoria, setCategoria] = useState([]);
    const [newCategory, setNewCategory] = useState(false);
    const [showProduto, setShowProduto] = useState([]);
    const [baseImagem, setBaseImagem] = useState('');
    const [show, setShow] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o botão de submissão

    const [produto, setProduto] = useState({
        _id: '',
        codigoDeBarras: '',
        nomeDoProduto: '',
        descricao: '',
        estoque: '',
        category: '',
        dataValidade: '',
        imagem: baseImagem
    });

    const geraObjeto = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    const fetchProdutos = async () => {
        try {
            const resp = await fetch('/api/produto');
            const data = await resp.json();
            if (resp.ok) {
                setShowProduto(data);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

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
            data.sort((a, b) => a.nome.localeCompare(b.nome));
            if (response.ok) {
                setCategoria(data);
                // setShow(false)
            } else {
                console.error('Erro ao buscar categorias:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
        setShow(false)
    };

    const atualizarProduto = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const resp = await fetch(`/api/produto/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            const data = await resp.json();
            if (resp.ok) {
                alert('Produto Editado com sucesso');
                fetchProdutos();
                setProduto({
                    _id: '',
                    codigoDeBarras: '',
                    nomeDoProduto: '',
                    descricao: '',
                    estoque: '',
                    category: '',
                    dataValidade: '',
                    imagem: ''
                });
                setPreviewImage(false)

            } else {
                alert('Erro ao editar Produto: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
        pegaCategorias();
    }, []);

    const novaCat = (e) => {
        e.preventDefault();
        setNewCategory(!newCategory);
    };

    const insereInformacoesProduct = (e) => {
        setProduto({
            _id: e._id,
            codigoDeBarras: e.codigoDeBarras,
            nomeDoProduto: e.nomeDoProduto,
            descricao: e.descricao,
            estoque: Number(e.estoque),
            category: e.category,
            dataValidade: e.dataValidade,
            imagem: e.imagem
        });
        setPreviewImage(true)
        pegaCategorias();
    };
    const fundoImagem = {
        backgroundImage: 'url(/logo.png)',
        backgroundSize: 'cover'

    }
    const fundoProduto = {
        backgroundImage: `url(${produto.imagem})`,
        backgroundSize: 'contain', // Ajusta a imagem para caber dentro do contêiner
        backgroundRepeat: 'no-repeat', // Evita repetição da imagem
        backgroundPosition: 'center' // Centraliza a imagem no contêiner
    };
    return (
        <div className="relative">

            <TitlePage titulo='Editar Produto' />
            <div className="flex gap-10 w-full">
                <div className="w-1/3">
                    <h2>SELECIONE O PRODUTO</h2>
                    <div>
                        <input type="text" placeholder="Pesquise um Produto" />
                        <ul className="relative">
                            {show ? (
                                <GifLoad /> // Mensagem de carregamento
                            ) : showProduto.map((e) => (
                                <li className="hover:cursor-pointer" onClick={() => insereInformacoesProduct(e)} key={e._id}>{e.nomeDoProduto}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-1/3">
                    <form onSubmit={atualizarProduto}>
                        <div className="hidden">
                            id:
                            <input type="text" name="_id" value={produto._id} onChange={geraObjeto} placeholder="..." />
                        </div>
                        <div>
                            Código de Barras:
                            <input type="number" name="codigoDeBarras" value={produto.codigoDeBarras} onChange={geraObjeto} placeholder="789123" />
                        </div>
                        <div>
                            Nome do Produto: *
                            <input type="text" name="nomeDoProduto" value={produto.nomeDoProduto} onChange={geraObjeto} placeholder="Insira o nome do produto" />
                        </div>
                        <div>
                            Descrição: *
                            <input type="text" name="descricao" value={produto.descricao} onChange={geraObjeto} placeholder="Descreva brevemente o produto" />
                        </div>
                        <div>
                            Quantidade em Estoque: *
                            <input type="number" name="estoque" value={produto.estoque} onChange={geraObjeto} placeholder="Quantidade disponível" />
                        </div>
                        <div>
                            Categoria: *
                            <select name="category" value={produto.category} onChange={geraObjeto}>
                                <option value="">Selecione</option>
                                {categoria.map((e, index) => (
                                    <option key={index} value={e.nome}>{e.nome}</option>
                                ))}
                            </select>
                            <button onClick={novaCat}>Nova Categoria</button>
                        </div>
                        <div>
                            Data de Validade:
                            <input type="date" name="dataValidade" value={produto.dataValidade} onChange={geraObjeto} placeholder="Validade" />
                        </div>
                        <div>
                            Imagem do Produto:
                            <input type="file" accept=".png, .jpeg, .jpg, .gif, .webp" onChange={handleImageChange} />
                            {previewImage && (
                                <div>
                                    <Image src={previewImage != '' ? produto.imagem : previewImage} width={24} height={24} alt="Preview" className="w-24 h-24 object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <input type="submit" value="Atualizar" disabled={isSubmitting} />
                        </div>
                    </form>

                    {newCategory && (
                        <div className="w-full absolute left-0 top-0 p-10 bg-white h-screen">
                            <div onClick={novaCat} className="text-3xl hover:cursor-pointer w-fit text-red">
                                <IoMdCloseCircle />
                            </div>
                            <CadastrarCategoria />
                        </div>
                    )}
                </div>
                <div className="w-1/3">
                    <div>
                        <p>Código de Barras: {produto.codigoDeBarras}</p>
                        <p>{produto.nomeDoProduto}</p>
                        <div style={produto.imagem == '' ? fundoImagem : fundoProduto} className="w-[360px] h-[200px] m-auto cover">
                        </div>
                        <p>Descrição:</p>
                        <div className="overflow-auto text-justify py-2 h-[150px]">
                            <p> {produto.descricao}</p>
                        </div>
                        <p>Estoque: {produto.estoque}</p>
                        <p>Validade: {produto.dataValidade}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
