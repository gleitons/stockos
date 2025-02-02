'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { menu } from '@/app/componentes/Menu'
export default function BaseOs({ apresentacao }) {
    const [openSubmenu, setOpenSubmenu] = useState(null); 
    const [menuAnimado, setMenuAnimado] = useState(<Image src='/logo.png' width={50} height={50} alt="Logo" className="rounded-lg bg-white p-1" />)

    const toggleSubmenu = (index) => {
        if (openSubmenu === index) {
            setOpenSubmenu(null); // Fecha o submenu se já estiver aberto
        } else {
            setOpenSubmenu(index); // Abre o submenu clicado
        }
    };
    const animaLogo = () => {
        setMenuAnimado(<Image src='/gif-load.gif' width={50} height={50} alt="Logo" className="rounded-lg bg-white p-1" />)
    }
    const desaanimaLogo = () => {
        setMenuAnimado(<Image src='/logo.png' width={50} height={50} alt="Logo" className="rounded-lg bg-white p-1" />)
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full bg-gray-800 text-white shadow-lg">
                <div className="flex items-center w-11/12 mx-auto py-3 justify-between">
                    <div className="flex items-center space-x-4 ">
                        <Link href={'/'} onMouseOver={animaLogo} onMouseLeave={desaanimaLogo}>
                            <div>
                            {menuAnimado}
                            </div>
                        </Link>
                        
                        <Link href={'/'}>
                            <div>
                                <h2 className="text-xl font-semibold">Stock OS</h2>
                                <p className="text-sm text-gray-400">Sistema de Cadastro e Controle de Estoque</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

           
            <div className="flex">
                
                <div className="bg-gray-900 text-gray-300 w-52 min-h-screen p-4 shadow-lg">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white">Menu</h3>
                    </div>

                    <Link
                        href={'/'}
                        className="flex items-center justify-between p-2  mb-2 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                        <span>Início</span>
                        
                    </Link>

                    {menu.map((e, index) => (
                        <div key={index} className="mb-2 bg-gray-800 rounded-md">
                            {/* Menu Principal */}
                            <div
                                onClick={() => toggleSubmenu(index)}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
                            >
                                <span>{e.nome}</span>
                                <svg
                                    className={`w-4 h-4 transform transition-transform duration-200 ${openSubmenu === index ? 'rotate-90' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            {/* Submenu */}
                            {openSubmenu === index && (
                                <div className="pl-4 mt-2 space-y-1 ">
                                    {e.submenus.map((submenu, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={submenu.link}
                                            className="block p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
                                        >
                                            {submenu.nome}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-gray-50 p-6">
                    {apresentacao}
                </div>
            </div>
        </div>
    );
}