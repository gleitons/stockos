import TitlePage from '../componentes/TitlePage'
import ResetaBD from '../componentes/exclusao/ResetaBD'
import { produtos } from '../componentes/associar/Produtos';
import { categorias } from '../componentes/associar/Categorias';
import { fornecedores } from '../componentes/associar/Fornecedores';
import Image from 'next/image';

export default async function page() {
    // const fetchFornecedor = async () => {
    //     const url = process.env.LINK_BD
    //     try {
    //         const response = await fetch(`${url}/api/fornecedor`, { cache: 'no-store' }); // 'no-store' para SSR dinâmico
    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar fornecedores');
    //         }
    //         return await response.json();
    //     } catch (error) {

    //         return []; // Retorna array vazio em caso de erro
    //     }
    // }
    // const fornecedor = await fetchFornecedor();
    return (
        <div className='relative'>
            <TitlePage titulo={'Resetar banco de Dados'} />
            <h2>Atenção, essa opção resetará todo o banco de Dados</h2>
            <p>Veja a lista de fornecedores, produtos e categorias que serão resetadas</p>
            <div className='flex justify-between gap-4'>
                <div className='w-1/3 text-center bg-slate-200 max-h-[200px] overflow-auto'>
                    <h2>Ver Fornecedores</h2>
                    <ul>
                    {fornecedores.map((e) => (
                        <li key={e.cnpj}>{e.nomeEmpresa}</li>
                    ))}
                    </ul>
                </div>
                <div  className='w-1/3  text-center bg-slate-200 max-h-[200px] overflow-auto'>
                    <h2>Ver Produtos</h2>
                    <ul>
                    {produtos.map((e) => (
                        <li key={e.codigoDeBarras} className='flex items-center bg-slate-100 my-2 text-center justify-between px-9'>{e.nomeDoProduto} <div  className='w-[80px] max-h-[100px] '> <Image className='w-full' src={e.imagem} width={100} height={50} alt='imag' /> </div></li>
                    ))}
                    </ul>
                </div>
                <div  className='w-1/3  text-center bg-slate-200 max-h-[200px] overflow-auto'>
                    <h2>Ver Categorias</h2>
                    <ul>
                    {categorias.map((e, index) => (
                        <li key={index}>{e.nome}</li>
                    ))}
                    </ul>
                </div>

            </div>
           <div>
                <ResetaBD />
           </div>
        </div>
    )
};
