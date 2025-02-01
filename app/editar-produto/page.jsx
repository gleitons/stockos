"use client"
import CadastrarCategoria from "../componentes/CadastrarCategoria";
import TitlePage from "../componentes/TitlePage";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import GifLoad from "../componentes/GifLoad";
import moment from "moment";
import { FaPlusCircle } from "react-icons/fa";



export default function Page() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [newCategory, setNewCategory] = useState(false);
    const [showProduto, setShowProduto] = useState([]);
    const [baseImagem, setBaseImagem] = useState('');
    const [show, setShow] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [produto, setProduto] = useState({
        _id: '',
        codigoDeBarras: '',
        nomeDoProduto: '',
        descricao: '',
        estoque: '',
        categoria: '',
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
                setCategorias(data);
                setTimeout(() => {
                    setShow(false)
                }, 2000)

                // setShow(false)
            } else {
                console.error('Erro ao buscar categorias:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }


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
                    categoria: '',
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
        pegaCategorias();
    };

    const insereInformacoesProduct = (e) => {
        setProduto({
            _id: e._id,
            codigoDeBarras: e.codigoDeBarras,
            nomeDoProduto: e.nomeDoProduto,
            descricao: e.descricao,
            estoque: Number(e.estoque),
            categoria: e.categoria,
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
        backgroundPosition: 'center',
        overflow: 'auto'// Centraliza a imagem no contêiner
    };
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = showProduto.filter(produto =>
            produto.nomeDoProduto.toLowerCase().includes(value)
        );
        if (value.length < 1) {
            fetchProdutos();
        } else {
            setShowProduto(filtered);
        }        

    };
    return (
        <div className="relative bg-gray-50 min-h-screen text-gray-800 p-2">

            <TitlePage titulo='Editar Produto' />
            <div className="flex gap-2 w-full">
                <div className="w-1/3 bg-white shadow-macos p-2 rounded-macos">
                <label className="block text-sm font-medium">SELECIONE O PRODUTO:</label>
                   
                    <div>                        
                        <input type="text"
                            placeholder="Pesquise um Produto"
                            value={searchTerm}
                            onChange={handleSearch} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none" />
                        <ul className="relative">
                            {show ? (
                                <GifLoad /> // Mensagem de carregamento
                            ) : showProduto.map((e) => (
                                <li className="hover:cursor-pointer bg-slate-100 my-2 rounded-md p-2 hover:bg-gray-100" onClick={() => insereInformacoesProduct(e)} key={e._id}>{e.nomeDoProduto}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-1/3 bg-white shadow-macos rounded-macos">
                    <form onSubmit={atualizarProduto} className="space-y-3">
                        <div className="hidden">
                            id:
                            <input type="text" name="_id" value={produto._id} onChange={geraObjeto} placeholder="..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium"> Código de Barras:</label>
                            <input className="w-full border bg-slate-100 border-macosBorder rounded-macos px-4 py-2" type="number" name="codigoDeBarras" readOnly  value={produto.codigoDeBarras} onChange={geraObjeto} placeholder="789123" />
                        </div>
                        <div className="h-[240px]  overflow-auto">
                            <div>
                                Nome do Produto: *
                                <input className="w-full border border-macosBorder rounded-macos px-4 py-2" type="text" name="nomeDoProduto" value={produto.nomeDoProduto} onChange={geraObjeto} placeholder="Insira o nome do produto" />
                            </div>
                            <div>
                                Descrição: *
                                <textarea value={produto.descricao} className="w-full text-justify border border-macosBorder rounded-macos px-4 py-2" name="descricao" rows={3} onChange={geraObjeto} ></textarea>
                            </div>
                            <div>
                                Quantidade em Estoque: *
                                <input type="number" name="estoque" value={produto.estoque} onChange={geraObjeto} placeholder="Quantidade disponível" className="w-full border border-macosBorder rounded-macos px-4 py-2" />
                            </div>
                            <div>
                                Categoria: *
                                <div className="flex items-center">
                                    <select name="categoria" value={produto.categoria} onChange={geraObjeto} className="w-full border border-macosBorder rounded-macos px-4 py-2" >
                                        <option>Selecione</option>
                                        {categorias.map((e, index) => (
                                            <option key={index} value={e.nome}>{e.nome}</option>
                                        ))}
                                    </select>
                                    <div onClick={novaCat} className="bg-macosBlue w-fit text-white p-2  rounded-macos hover:opacity-90 items-center">
                                        <FaPlusCircle />
                                    </div>
                                </div>
                            </div>
                            <div>
                                Data de Validade:
                                <input type="date" name="dataValidade" value={produto.dataValidade} onChange={geraObjeto} placeholder="Validade" />
                            </div>
                            <div>
                                Imagem do Produto:
                                <input type="file" accept=".png, .jpeg, .jpg, .gif, .webp" onChange={handleImageChange} />
                                {previewImage && (
                                    <div className="hidden">
                                        <Image src={previewImage != '' ? produto.imagem : previewImage} width={24} height={24} alt="Preview" className="w-24 h-24 object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" value="Atualizar" disabled={isSubmitting} />
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
                <div className="w-1/3 bg-white shadow-macos p-4 overflow-hidden rounded-macos">                   
                        <h2 className="text-xl font-semibold">{produto.nomeDoProduto == '' ? 'Detalhes do Produto' : produto.nomeDoProduto}</h2>
                        <div  style={produto.imagem == '' ? fundoImagem : fundoProduto} className="w-[260px] h-[100px] m-auto overflow-auto cover">
                        </div>
                        <div className="space-y-2 my-4">
                            <p className="text-sm">Código de Barras: {produto.codigoDeBarras}</p>
                            <p className="text-lg font-semibold">{produto.categoria == '' ? 'Selecione a categoria' : produto.categoria}</p>
                            <div className="w-full h-[100px] bg-gray-100 overflow-auto text-justify py-2  rounded-macos shadow-macos">{produto.descricao}</div>
                        </div>
                       
                        <p>Estoque: {produto.estoque}</p>
                        <p>Validade: {moment(produto.dataValidade).utc().format('DD/MM/YYYY')}</p>
                   
                </div>
            </div>
        </div>
    );
}
