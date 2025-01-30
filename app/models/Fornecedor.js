import mongoose from "mongoose";




const FornecedorSchema = new mongoose.Schema({
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    produtosViculados: {
        type: [String], default: []
    },
    nomeEmpresa: {
        type: String,
        required: true,        
    },
    logradouro: {
        type: String
    },
    numero: {
        type: Number
    },
    bairro: {
        type: String
    },
    cidade: {
        type: String
    },
    cep: {
        type: String
    },
    telefone: {
        type: String
    },
    email: {
        type: String
    },
    contato: {
        type: String
    },
   

});

export default mongoose.models.Fornecedor || mongoose.model('Fornecedor', FornecedorSchema)



