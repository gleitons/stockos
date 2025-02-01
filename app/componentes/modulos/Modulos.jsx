import Image from "next/image"
import Link from "next/link"


export default function Modulos({obj}) {
    return (
        <Link  href={obj.link} className="hover:brightness-[1.15]">
            <div className="w-[200px] h-[150px] text-center bg-gray-300 border-2 border-gray-500 p-2 rounded-lg">
                <div className="w-full">
                    <Image className="m-auto" src={obj.imagem} width={100} height={100} alt="Cadastro" />
                </div>
                <h3 className="font-bold text-gray-700">{obj.nome}</h3>
            </div>
        </Link>
    )
};
