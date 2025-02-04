import mongoose from "mongoose";


const ProdutoSchema = new mongoose.Schema({
    codigoDeBarras: {
        type: String,
        required: true,
        unique: true
    },
    nomeDoProduto: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    estoque: {
        type: Number
    },
    categoria: {
        type: String
    },
    dataValidade: {
        type: Date
    },
    imagem: {
        type: String 
    }
});

export default mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema);
