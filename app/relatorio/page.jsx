import TitlePage from '../componentes/TitlePage';
import Pdf from '../componentes/relatorio/Pdf';

const url = process.env.LINK_BD;

const pegaFornecedores = async () => {
    try {
        const resp = await fetch(`${url}/api/fornecedor`, { next: { revalidate: 10 } }); // Revalida a cada 10s
        if (!resp.ok) throw new Error("Erro ao buscar fornecedores");
        const data = await resp.json();
        data.sort((a, b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa));
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const pegaProdutos = async () => {
    try {
        const resp = await fetch(`${url}/api/produto`, { next: { revalidate: 10 } });
        if (!resp.ok) throw new Error("Erro ao buscar produtos");
        const data = await resp.json();
        data.sort((a, b) => a.nomeDoProduto.localeCompare(b.nomeDoProduto));
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default async function Page() {
    const [fornecedores, produtos] = await Promise.all([pegaFornecedores(), pegaProdutos()]);

    const vinculados = fornecedores.map(fornecedor => {
        const produtosVinculados = (fornecedor.produtosViculados || [])
            .map(produtoId => produtos.find(produto => produto._id === produtoId))
            .filter(Boolean);

        return { ...fornecedor, produtos: produtosVinculados };
    }).sort((a, b) => a.nomeEmpresa.localeCompare(b.nomeEmpresa));

    const contagem = produtos.reduce((cont, produto) => {
        cont[produto.categoria] = (cont[produto.categoria] || 0) + 1;
        return cont;
    }, {});

    return (
        <div>
            <TitlePage titulo="Relatórios de Produtos Associados" />
            <div className="flex gap-10">
                <div className="w-1/3">
                    <h2>Selecione a Empresa</h2>
                    <div className="h-[400px] overflow-auto bg-slate-300 p-3 rounded-md">
                        {vinculados.map((fornecedor, index) => (
                            <Pdf key={index} produtosV={fornecedor} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2>*CATEGORIAS CADASTRADAS E VINCULADAS: </h2>
                    <ul>
                        {Object.entries(contagem).map(([categoria, quantidade]) => (
                            <li key={categoria} className="p-2 border rounded-md">
                                {categoria}: {quantidade}
                            </li>
                        ))}
                    </ul>
                    <p>Quantidade de Categorias Cadastradas: {Object.keys(contagem).length}</p>
                </div>
            </div>
        </div>
    );
}
