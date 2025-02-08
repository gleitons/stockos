'use client'

import { useState } from "react"
import Print from "../imprimir/Print"

export default function Pdf({produtosV}) {
    console.log(produtosV.cep)
    const [mostraPrint, setMostraPrint] = useState()
    const geraImprime = () => {
      setMostraPrint(<Print fornecedor={produtosV} condition={true} />)
        
    }
    return (
        <li
            onClick={() => geraImprime()}
            className="cursor-pointer my-2 p-2 px-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
        >
            {produtosV.nomeEmpresa} {mostraPrint}
        </li>
    )
};
