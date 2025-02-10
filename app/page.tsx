import Modulos from "./componentes/modulos/Modulos";
import { menuModulos } from "./componentes/modulos/MenuModulos";
import ButtonResolution from "./componentes/ButtonResolution";
import InfoEmpPro from './componentes/InfoEmpPro' 



export default async function Home() {
 
  return (
    <div className="flex gap-2">
      <div className="flex flex-wrap gap-10 justify-between max-w-[683px]">
        <ButtonResolution />

        {menuModulos.map((e, index) => (
          <Modulos key={index} obj={e} />
        ))}
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
       <InfoEmpPro />
      </div>
    </div>
  );
}
