export default function ImageOs() {
    const fundoImagem = {
        backgroundImage: 'url(/logo.png)',
        backgroundSize: 'cover'
    }
    return (
        <div style={fundoImagem} className="w-full h-full">
           <p>"Nome da imagem"</p>
        </div>
    )
};
