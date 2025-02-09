'use client'
import Image from "next/image";

export default function ExcluirProduto({ id, nome, imagem }) {
    

    const excluirProduto = async (e) => {
        const texto = `Deseja EXCLUIR o produto " ${nome} " PERMANENTEMENTE?`;
        if(confirm(texto) == true) {     
        try {
            const resp = await fetch('/api/produto', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });
           
            if(resp.ok) {
                alert('EXCLUIDO COM SUCESSO!');
                location.reload();
            } else {
                alert('ERRO AO EXCLUIR')
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }

}
    
    return (
        <>
            <li onClick={() => excluirProduto(id)} className="hover:cursor-pointer p-2 hover:bg-gray-100 flex justify-between items-center border-y-macosGray" >{nome} <div><Image src={imagem} width={50} height={50} alt={nome}    /></div></li>

        </>

    )
};
