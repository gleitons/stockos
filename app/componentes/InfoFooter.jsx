export default function InfoFooter() {
    return (
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="bg-white p-2 rounded-lg shadow-lg max-w-2xl w-full text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    S<span className="text-black font-light">tock</span>OS
                </h1>
                <p className="text-gray-700 mb-4">
                    Sistema desenvolvido por <strong>Gleiton</strong> como parte do curso de <strong>Análise e Desenvolvimento de Sistemas</strong> da <strong>Gran Faculdade</strong>.
                </p>
                <p className="text-gray-700 mb-6">
                    O StockOS é uma plataforma para gerenciamento de estoque, fornecedores e produtos vinculados. Acesse o sistema em:
                </p>
                
            </div>
        </div>
    )
};
