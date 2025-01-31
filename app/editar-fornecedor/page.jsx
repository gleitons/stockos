import TitlePage from '../componentes/TitlePage';
import EditarFornecedor from '../componentes/EditarFornecedor';



export default async function Page() {
  
  
    // Buscar dados diretamente no servidor
    const fetchFornecedores = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fornecedor', { cache: 'no-store' }); // 'no-store' para SSR dinâmico
            if (!response.ok) {
                // throw new Error('Erro ao buscar fornecedores');
            }
            return await response.json();
        } catch (error) {
            
            return []; // Retorna array vazio em caso de erro
        }
    };
    
    const fornecedores = await fetchFornecedores();

    return (
        <div >
            <TitlePage titulo="Editar Fornecedor" />

            <div className="flex gap-10 relative">
                <div>
                    <h2>Lista de Fornecedores:</h2>
                    {fornecedores.length > 0 ? (
                        <ul>
                            {fornecedores.map((fornecedor, index) => (
                                <EditarFornecedor empresa={fornecedor} atualiza={fetchFornecedores()}  key={index} />
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum fornecedor encontrado.</p>
                    )}
                </div>
                <div>
                    <div>
                        {/* <AtulizarFornecedor /> */}
                    {/* <form onSubmit={atualizarFornecedor} >
                            <div>
                                Nome da Empresa: *<input type="text" name="nomeEmpresa" value={dadosFornecedor.nomeEmpresa} onChange={adicionaInfo} placeholder="Insira o nome da empresa" />
                            </div>
                            <div>
                                Logradouro: *<input type="text" name="logradouro" value={dadosFornecedor.logradouro} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                            </div>
                            <div>
                                Numero: * <input type="number" name="numero" value={dadosFornecedor.numero} onChange={adicionaInfo} placeholder="Insira o numero" />
                            </div>
                            <div>
                                Bairro: *<input type="text" name="bairro" value={dadosFornecedor.bairro} onChange={adicionaInfo} placeholder="Insira o bairro da empresa" />
                            </div>
                            <div>
                                CEP: *<input type="text" name="cep" value={dadosFornecedor.cep} onChange={adicionaInfo} placeholder="Insira o endereço completo da empresa" />
                            </div>
                            <div>
                                Cidade: *<input type="text" name="cidade" value={dadosFornecedor.cidade} onChange={adicionaInfo} placeholder="Insira a cidade" />
                            </div>
                            <div>
                                Telefone: *<input type="text" name="telefone" value={dadosFornecedor.telefone} onChange={adicionaInfo} placeholder="Insira o Telefone" />
                            </div>
                            <div>
                                E-mail: *<input type="email" name="email" value={dadosFornecedor.email} onChange={adicionaInfo} placeholder="exemplo@fornecedor.com" />
                            </div>
                            <div>
                                Contato Principal: *<input type="text" name="contato" value={dadosFornecedor.contato} onChange={adicionaInfo} placeholder="Nome do contato principal" />
                            </div>

                            <div>
                                <button type="submit">Cadastrar</button>
                            </div>

                        </form> */}
                    </div>
                    {/* Outros elementos */}
                </div>
            </div>
        </div>
    );
}
