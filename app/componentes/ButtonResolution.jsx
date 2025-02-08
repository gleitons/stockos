'use client'


import { AiOutlineCiCircle } from "react-icons/ai";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";

export default function ButtonResolution() {
    const [show, setShow] = useState(true)

    const fecha = () => {
        setShow(false)
    }
    return (
        <>
            {show && (<div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-[991px] bg-yellow-500 text-black p-4 rounded-lg flex items-center gap-2 shadow-lg  border border-yellow-700">
                <AiOutlineCiCircle className="text-2xl text-yellow-900" />
                <span className="font-semibold">
                    Atenção, utilize resolução acima de 992px
                </span>
                <CgCloseO onClick={fecha} className="text-2xl text-red-900 hover:cursor-pointer" />
            </div>)}
        </>
    )
};
