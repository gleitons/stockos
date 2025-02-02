export default function Inputs({ tipo, ph }) {
    return (
        <input type={tipo}
            placeholder={ph}
            value={'valor'}           
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none" />
    )
};
