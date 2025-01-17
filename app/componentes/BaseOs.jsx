import Image from "next/image"
import { menu } from '@/app/componentes/Menu'
import Link from "next/link"

export default function BaseOs({ apresentacao }) {
    return (
        <div>
            <div className="w-full bg-gray-300">
                <div className="flex align-middle items-center w-2/3 m-auto justify-between">
                    <div>
                        <Image src='/logo.png' width={50} height={50} alt="Logo" />
                    </div>
                    <div>
                        <h2>Stock OS</h2>
                        <p>Sistema de Cadastro e controle de estoque</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="bg-gray-400 w-fit px-12 h-screen">
                    {menu.length}
                    {menu.map((e, index) => (
                        <div key={index}>
                            <p>{e.nome}</p>
                            <Link href={e.link}>Cadastrar</Link>
                        </div>
                    ))}

                  
                </div>
                <div>
                    {apresentacao}
                </div>
            </div>

        </div>
    )
};
