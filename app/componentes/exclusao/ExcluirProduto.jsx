'use client'


export default function ExcluirProduto({ product }) {
    

    const excluirProduto = async (e) => {
        const texto = `Deseja EXCLUIR o produto " ${e.nomeDoProduto} " PERMANENTEMENTE?`;
        if(confirm(texto) == true) {     
        try {
            const resp = await fetch('/api/produto', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(e)
            });
            const data = resp.json();
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
            <li onClick={() => excluirProduto(product)} className="hover:cursor-pointer p-2 hover:bg-gray-100" >{product.nomeDoProduto}</li>

        </>

    )
};
