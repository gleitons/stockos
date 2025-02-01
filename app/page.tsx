import Modulos from "./componentes/modulos/Modulos";
import { menuModulos } from "./componentes/modulos/MenuModulos";

export default function Home() {
  return (
    <div>
      <div className="flex flex-wrap gap-32">
        {menuModulos.map((e, index) => (
          <Modulos key={index} obj={e} />
        ))}
      </div>
    </div>
  );
}
