import TitlePage from '../componentes/TitlePage'
import ResetaBD from '../componentes/exclusao/ResetaBD'
import { produtos } from '../componentes/associar/Produtos';
import { categorias } from '../componentes/associar/Categorias';
import { fornecedores } from '../componentes/associar/Fornecedores';
import Image from 'next/image';

export default async function page() {
     fornecedores.sort((a,b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa))
     produtos.sort((a,b) => a.nomeDoProduto.localeCompare(b.nomeDoProduto))
     categorias.sort((a,b) => a.nome.localeCompare(b.nome))

    return (
        <div className='relative'>
            <TitlePage titulo={'Resetar banco de Dados'} />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-custom-gray-dark mb-4">
                    Atenção, essa opção resetará todo o banco de Dados e adicionará os itens listados abaixo:
                </h2>
                <p className="text-custom-gray mb-6">
                    Veja a lista de fornecedores, produtos e categorias que serão resetadas
                </p>
                <div className="flex justify-between gap-4">
                    <div className="w-1/3 text-center bg-custom-gray-light max-h-[200px] overflow-auto rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-custom-gray-dark py-2">Ver Fornecedores</h2>
                        <ul>
                            {fornecedores.map((e) => (
                                <li key={e.cnpj} className="py-1 text-custom-gray-dark">{e.nomeEmpresa.toLowerCase().split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/3 text-center bg-custom-gray-light max-h-[200px] overflow-auto rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-custom-gray-dark py-2">Ver Produtos</h2>
                        <ul>
                            {produtos.map((e) => (
                                <li key={e.codigoDeBarras} className="flex items-center bg-custom-gray my-2 text-center justify-between px-4 py-2 rounded">
                                    {e.nomeDoProduto.toLowerCase().split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')}
                                    <div className="w-[50px] max-h-[50px]">
                                        <Image className="w-full m-auto cover" src={e.imagem} width={50} height={30} alt="imag" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/3 text-center bg-custom-gray-light max-h-[200px] overflow-auto rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-custom-gray-dark py-2">Ver Categorias</h2>
                        <ul>
                            {categorias.map((e, index) => (
                                <li key={index} className="py-1 text-custom-gray-dark">{e.nome}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <ResetaBD />
            </div>
        </div>
    )
};
