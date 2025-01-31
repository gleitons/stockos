'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; 
import {menu} from '@/app/componentes/Menu'
export default function BaseOs({ apresentacao }) {
    const [openSubmenu, setOpenSubmenu] = useState(null); // Estado para controlar qual submenu está aberto

    const toggleSubmenu = (index) => {
        if (openSubmenu === index) {
            setOpenSubmenu(null); // Fecha o submenu se já estiver aberto
        } else {
            setOpenSubmenu(index); // Abre o submenu clicado
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="w-full bg-gray-800 text-white shadow-lg">
                <div className="flex items-center w-11/12 mx-auto py-3 justify-between">
                    <div className="flex items-center space-x-4 ">
                        <Image src='/logo.png' width={50} height={50} alt="Logo" className="rounded-lg bg-white p-1" />
                        <div>
                            <h2 className="text-xl font-semibold">Stock OS</h2>
                            <p className="text-sm text-gray-400">Sistema de Cadastro e Controle de Estoque</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <div className="bg-gray-900 text-gray-300 w-64 min-h-screen p-4 shadow-lg">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white">Menu</h3>
                    </div>
                    {menu.map((e, index) => (
                        <div key={index} className="mb-2">
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
                                <div className="pl-4 mt-2 space-y-1">
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