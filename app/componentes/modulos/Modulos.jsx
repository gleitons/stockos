'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


export default function Modulos({obj}) {
    const [img, setImg] = useState(obj.imagem);
    const [resolucao, setResolucao] = useState(60);
    const [quality, setQuality] = useState(30)

    const resolution = () => {
        setImg(obj.imagem)
        setQuality(100)
        setResolucao(100)
    }
    const retiraImage = () => {
        setImg(obj.imagem)
        setQuality(60)
        setResolucao(60)
    }
    return (
        <Link  href={obj.link} className="hover:brightness-[1.15]" onMouseOver={resolution} onMouseLeave={retiraImage}>
            <div className="w-[200px] h-[150px] text-center bg-gray-300 border-2 border-gray-500 p-2 rounded-lg">
                <div className="w-[100px] h-[100px] m-auto">
                    <Image className="m-auto transition-all " quality={quality} src={img} width={resolucao} height={resolucao} alt="Cadastro" />
                </div>
                <h3 className="font-bold text-gray-700">{obj.nome}</h3>
            </div>
        </Link>
    )
};
