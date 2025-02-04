'use client'
import Image from 'next/image';
import { useState } from 'react';
import Carregando from '../Carregando'
import generatePDF, { Margin } from 'react-to-pdf';
import moment from "moment";
const imprimeRelatorio = () => document.getElementById('conteudo');
const personalizar = {
  method: 'open',
  page: {
    margin: Margin.SMALL,
    format: 'a4',
    orientation: 'portrait',
  }
}
const Print = ({ fornecedor, produtos }) => {
  const [imprimir, setImprimir] = useState((false));
  const [mostra, setMostra] = useState('hidden');
  const [loadItem, setLoadItem] = useState(false)

  const mostraImprimir = () => {
    const ist = imprimir == true ? false : true;
    setImprimir(ist)
  }
  const geraImprime = () => {
    setLoadItem(true)
    setMostra('')
    setTimeout(() => { generatePDF(imprimeRelatorio, personalizar) }, 2000);

    setTimeout(() => setMostra('hidden'), 4000)
    setLoadItem(false)


  }
  const organizaProdutos = () => {
    const vinculos = []
    produtos.map((e, index) => {

      fornecedor.produtosViculados.map((p, ind) => {
        if (p == e._id) {
          vinculos.push(e)
        }
      })
    })
   
    return vinculos;
  }
  const products = organizaProdutos()
  return (
    <>

      {loadItem && <Carregando />}

      <li
        onClick={mostraImprimir}
        className="cursor-pointer my-2 p-2 px-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
      >
        {fornecedor.nomeEmpresa}
      </li>
      {imprimir && (<div className=' bg-blue-50'>

        <button className="w-fit mt-5 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={geraImprime}>Imprimir Produtos vinculados de {fornecedor.nomeEmpresa}</button>
        <div id='conteudo' className={`w-[794px] ${mostra} bg-white shadow-lg  mx-auto p-8`} >
          <div className=' w-full'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr>
                  <td colSpan={6}>
                    <div className='flex items-center justify-between px-10 py-4 bg-gray-100'>
                      <div>
                        <Image src={'/logo.png'} height={50} width={50} alt='Logo' />
                      </div>
                      <div className='text-end'>
                        <h2 className='text-xl font-bold text-center text-gray-800'>RELATÓRIO DE PRODUTOS VINCULADOS: {fornecedor.nomeEmpresa.toUpperCase()}</h2>
                      </div>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className='text-center py-2 bg-gray-200 font-semibold text-gray-700'>
                    FORNECEDOR: {fornecedor.nomeEmpresa.toUpperCase()} - {fornecedor.produtosViculados.length} Produtos Vinculados
                  </td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Item</td>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Nome Produto</td>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Categoria</td>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Validade</td>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Estoque</td>
                  <td className='px-4 py-2 font-medium text-gray-700 border border-gray-300'>Imagem</td>
                </tr>
              
                {products.map((e, index) => (

                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className='px-4 py-2 text-gray-700 border border-gray-300 text-center'>{index + 1}</td>
                    <td className='px-4 py-2 text-gray-700 border border-gray-300'>{e.nomeDoProduto}</td>
                    <td className='px-4 py-2 text-gray-700 border border-gray-300 text-center'>{e.categoria}</td>
                    <td className='px-4 py-2 text-gray-700 border border-gray-300 text-center'>{moment(e.dataValidade).utc().format('DD/MM/YYYY')}</td>
                    <td className='px-4 py-2 text-gray-700 border border-gray-300 text-center'>{e.estoque}</td>
                    <td className='px-4 py-2 border border-gray-300'>
                      <div className='flex justify-center'>
                        <Image className='cover' src={e.imagem} height={50} width={50} alt='Logo' />
                      </div>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>)}
    </>

  )
};

export default Print;