'use client'
export default function CAtualizar() {
    return (
        <div>
            <button className="w-fit mt-5 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => location.reload()}>Atualizar Vinculos</button>
        </div>
    )
};
