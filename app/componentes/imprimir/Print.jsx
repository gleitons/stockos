'use client';

import Image from 'next/image';
import generatePDF, { Margin } from 'react-to-pdf';
import moment from 'moment';
import { useState } from 'react';

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

const Print = ({ fornecedor }) => {
  const [show, setShow] = useState(true); // Estado para controlar a exibição do conteúdo

  const ImprimirPDF = () => {
    generatePDF(imprimeRelatorio, personalizar);
  
  };

  const closeVisualizador = () => {
    setShow(false); // Fecha o conteúdo
  };

  return (
    <>
      {show && (
        <div className='w-full h-full bg-slate-700 p-10 fixed left-0 top-0 overflow-auto'>
          <div className="flex justify-center items-center">
            <div className="flex gap-4 mb-2">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={ImprimirPDF}
              >
                Imprimir
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={closeVisualizador}
              >
                Fechar
              </button>
            </div>
          </div>
          <div id="conteudo" className={`w-[794px] m-auto bg-white shadow-lg mx-auto p-8`}>
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
                            RELATÓRIO DE PRODUTOS VINCULADOS: {fornecedor.nomeEmpresa.toUpperCase()}
                          </h2>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-2 bg-gray-200 font-semibold text-gray-700">
                      FORNECEDOR: {fornecedor.nomeEmpresa.toUpperCase()} - {fornecedor.produtos.length} Produtos Vinculados
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
                  {fornecedor.produtos.map((d, i) => (
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
        </div>
      )}
    </>
  );
};

export default Print;