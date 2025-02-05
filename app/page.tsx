import Modulos from "./componentes/modulos/Modulos";
import { menuModulos } from "./componentes/modulos/MenuModulos";
import ButtonResolution from './componentes/ButtonResolution'

export default function Home() {
  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-between max-w-[683px]">    
    <ButtonResolution />
        {menuModulos.map((e, index) => (
          <Modulos key={index} obj={e} />
        ))}
      </div>
    </div>
  );
}
