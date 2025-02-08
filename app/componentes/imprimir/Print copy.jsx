'use client';

import Image from 'next/image';
import { useState } from 'react';
import Carregando from '../Carregando'
import generatePDF, { Margin } from 'react-to-pdf';
import moment from 'moment';

const imprimeRelatorio = () => document.getElementById('conteudo');

const personalizar = {
  filename: 'Relatório de Fornecedores.pdf',
  method: 'open',
  page: {
    margin: Margin.SMALL,
    format: 'a4',
    orientation: 'portrait',
  },
};


const Print = ({ fornecedor, produtos }) => {

  const [load, setLod] = useState(false)
  const [imprimir, setImprimir] = useState(false);
  const [mostra, setMostra] = useState('hidden');
  const [loadItem, setLoadItem] = useState([]);
  const [oForn, setOForn] = useState(null);

  const geraImprime = (pro, forne) => {
    setLod(true)
    organizaProdutos(forne)

    setOForn(forne);
    setImprimir(true);
    setMostra('');

    setTimeout(() => {
      generatePDF(imprimeRelatorio, personalizar);
      setLod(false)
    }, 2000);

    setTimeout(() => setMostra('hidden'), 4000);
  };
 

  const organizaProdutos = (fornec) => {
    let vinculos = [];

    
    fornec.produtosViculados.forEach((p) => {
      const produtoEncontrado = produtos.find((e) => e._id === p);
      if (produtoEncontrado) {
        vinculos.push(produtoEncontrado);
      }
    });

    vinculos.sort((a,b) => a.nomeDoProduto.localeCompare(b.nomeDoProduto))

    setLoadItem(vinculos);
   
    return vinculos;

  };

  
  return (
    <>
      <ul>
       {
        load && (
          <Carregando />
        )
       }
       
        {fornecedor.map((e) => (
          <li
            key={e._id}
            onClick={() => geraImprime(loadItem, e)}
            className="cursor-pointer my-2 p-2 px-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
          >
            {e.nomeEmpresa}
          </li>
        ))}

        {imprimir && oForn && (
          <div id="conteudo" className={`w-[794px] ${mostra} bg-white shadow-lg mx-auto p-8`}>
            <div className="w-full">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <td colSpan={6}>
                      <div className="flex items-center justify-between px-10 py-4 bg-gray-100">
                        <div>
                          <Image src="/logo.png" height={50} width={50} alt="Logo" />
                        </div>
                        <div className="text-end">
                          <h2 className="text-xl font-bold text-center text-gray-800">
                            RELATÓRIO DE PRODUTOS VINCULADOS: {oForn.nomeEmpresa.toUpperCase()}
                          </h2>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-2 bg-gray-200 font-semibold text-gray-700">
                      FORNECEDOR: {oForn.nomeEmpresa.toUpperCase()} - {loadItem.length} Produtos Vinculados
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Item</td>
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Nome Produto</td>
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Categoria</td>
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Validade</td>
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Estoque</td>
                    <td className="px-4 py-2 font-medium text-gray-700 border border-gray-300">Imagem</td>
                  </tr>

                  {loadItem.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-gray-700 border border-gray-300 text-center">{i + 1}</td>
                      <td className="px-4 py-2 text-gray-700 border border-gray-300">{d.nomeDoProduto}</td>
                      <td className="px-4 py-2 text-gray-700 border border-gray-300 text-center">{d.categoria}</td>
                      <td className="px-4 py-2 text-gray-700 border border-gray-300 text-center">
                        {moment(d.dataValidade).utc().format('DD/MM/YYYY')}
                      </td>
                      <td className="px-4 py-2 text-gray-700 border border-gray-300 text-center">{d.estoque}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        <div className="flex justify-center">
                          <Image className="cover" src={d.imagem} height={50} width={50} alt="Produto" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </ul>
    </>
  );
};

export default Print;
