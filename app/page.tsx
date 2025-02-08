import Modulos from "./componentes/modulos/Modulos";
import { menuModulos } from "./componentes/modulos/MenuModulos";
import ButtonResolution from "./componentes/ButtonResolution";

const initial = process.env.LINK_BD;
const fetchFornecedores = async () => {
  try {
    const resp = await fetch(`${initial}/api/fornecedor`, {
      cache: "no-store",
    });
    const data = await resp.json();

    if (resp.ok) {
      return data;
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
    const resp = await fetch(`${initial}/api/produto`, {
      cache: "no-store",
    });
    const data = await resp.json();

    if (resp.ok) {
      return data;
    } else {
      console.log("Erro ao Chamar Categorias");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Home() {
  const fornecedores = await fetchFornecedores();
  const produtos = await fetchProdutos();
 
  return (
    <div className="flex gap-2">
      <div className="flex flex-wrap gap-10 justify-between max-w-[683px]">
        <ButtonResolution />

        {menuModulos.map((e, index) => (
          <Modulos key={index} obj={e} />
        ))}
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
        <p className="text-gray-800 text-lg font-semibold">
          📊 <span className="text-blue-600">Atualmente você possui:</span>
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            🏢 <span className="font-medium text-blue-500">{fornecedores.length} fornecedores</span>{" "}
            cadastrados
          </p>
          <p className="text-gray-700">
            🛒 <span className="font-medium text-green-500">{produtos.length} produtos</span>{" "}
            cadastrados
          </p>
        </div>
      </div>
    </div>
  );
}
