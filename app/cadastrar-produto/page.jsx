'use client'
import CadastrarCategoria from "../componentes/CadastrarCategoria";
import TitlePage from "../componentes/TitlePage";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";

export default function Page() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [newCategory, setNewCategory] = useState(false);
    const [baseImagem, setBaseImagem] = useState('');
    const [encontra, setEncontra] = useState('hidden')

    const [produto, setProduto] = useState({
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
            } else {
                console.error('Erro ao buscar categorias:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

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
                setProduto({
                    codigoDeBarras: '',
                    nomeDoProduto: '',
                    descricao: '',
                    estoque: '',
                    categoria: '',
                    dataValidade: '',
                    imagem: baseImagem
                });
                setEncontra('hidden')
            } else {
                alert('Erro ao cadastrar Produto: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    };
    const verificaProduto = async (e) => {
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
            
            if (resp.status == 409) {
                setEncontra('')
            } else {
                alert('Erro ao cadastrar Produto: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    };


    useEffect(() => {
        pegaCategorias();
    }, []);

    const novaCat = (e) => {
        e.preventDefault();
        const verifica = !newCategory;
        if (verifica) {
            const aviso = "*ATENÇÃO* - Uma nova Categoria será criada";
            if (confirm(aviso)) {
                setNewCategory(verifica);
            }
        } else {
            setNewCategory(verifica);
            pegaCategorias();
        }
    };

    return (
        <div className="relative p-6 bg-gray-100 min-h-screen">
            <TitlePage titulo='Cadastro de Produtos' />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={verificaProduto} >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Código de Barras:</label>
                        <input type="number" required name="codigoDeBarras" value={produto.codigoDeBarras} onChange={geraObjeto} placeholder="789123" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Continuar</button>
                    </div>

                </form>


                <form onSubmit={cadastraProduto} className={encontra}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Categoria: *</label>
                        <select name="categoria" value={produto.categoria} onChange={geraObjeto} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Selecione</option>
                            {categorias.map((e, index) => (
                                <option key={index} value={e.nome}>{e.nome}</option>
                            ))}
                        </select>
                        <button onClick={novaCat} className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Nova Categoria</button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome do Produto: *</label>
                        <input type="text" name="nomeDoProduto" value={produto.nomeDoProduto} onChange={geraObjeto} placeholder="Insira o nome do produto" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Descrição: *</label>
                        <input type="text" name="descricao" value={produto.descricao} onChange={geraObjeto} placeholder="Descreva brevemente o produto" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque: *</label>
                        <input type="number" name="estoque" value={produto.estoque} onChange={geraObjeto} placeholder="Quantidade disponível" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Data de Validade:</label>
                        <input type="date" name="dataValidade" value={produto.dataValidade} onChange={geraObjeto} placeholder="Validade" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Imagem do Produto:</label>
                        <input type="file" accept=".png, .jpg, .gif, .webp" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        <input className="invisible" type="text" name="imagem" value={baseImagem} />
                        {previewImage && (
                            <div className="mt-4">
                                <Image src={previewImage} width={96} height={96} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <input type="submit" value="Cadastrar" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" />
                    </div>
                </form>
                {newCategory && (
                    <div className="w-full absolute left-0 top-0 p-10 bg-white h-screen">
                        <div onClick={novaCat} className="text-3xl hover:cursor-pointer w-fit text-red-500"><IoMdCloseCircle /></div>
                        <CadastrarCategoria />
                    </div>
                )}
            </div>
        </div>
    );
}