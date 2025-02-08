'use client';

import { useState } from "react";
import Print from "../imprimir/Print";

export default function Pdf({ produtosV }) {
    const [mostraPrint, setMostraPrint] = useState(null); 

    const geraImprime = () => {
    
        setMostraPrint(item => {

            if (item) {
                return null;
            } else {
                return <Print fornecedor={produtosV} />
            }
        });
    };

    return (
        <li
            onClick={geraImprime}
            className="cursor-pointer my-2 p-2 px-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
        >
            {produtosV.nomeEmpresa.toLowerCase().split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')} {mostraPrint}
        </li>
    );
}