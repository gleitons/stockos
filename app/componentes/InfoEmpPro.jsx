'use client'
import { useState, useEffect } from "react";
export const Load = () => {
    return (
        <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    )
}
export default function InfoEmpPro() {
    const [fornecedores, setFornecedores] = useState([])
    const [produtos, setProdutos] = useState([])
    const fetchFornecedores = async () => {
        try {
            const resp = await fetch(`https://stockos.vercel.app/api/fornecedor`);
            const data = await resp.json();

            if (resp.ok) {
                setFornecedores(data)
            } else {
                console.log("Erro ao Chamar Categorias");
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    const fetchProdutos = async () => {
        try {
            const resp = await fetch(`https://stockos.vercel.app/api/produto`);
            const data = await resp.json();

            if (resp.ok) {
                setProdutos(data)
            } else {
                console.log("Erro ao Chamar Produtos");
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    useEffect( () => {
        fetchFornecedores();
        fetchProdutos();
    }, []);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <p className="text-gray-800 text-lg font-semibold flex items-center">
          📊 <span className="text-blue-600 ml-2">Atualmente você possui:</span>
        </p>
      
        <div className="mt-4 space-y-3">
          {/* Fornecedores */}
          <p className="text-gray-700 flex items-center">
            🏢
            <span className="ml-2 flex items-center">
              <span className="w-14 text-center font-medium text-blue-500">
                {fornecedores.length ? fornecedores.length : <Load />}
              </span>
              <span className="ml-1">fornecedores</span>
            </span>
          </p>
      
          {/* Produtos */}
          <p className="text-gray-700 flex items-center">
            🛒
            <span className="ml-2 flex items-center">
              <span className="w-14 text-center font-medium text-green-500">
                {produtos.length ? produtos.length : <Load />}
              </span>
              <span className="ml-1">produtos</span>
            </span>
          </p>
        </div>
      </div>
    )
};
