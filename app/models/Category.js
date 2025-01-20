import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique:true
    }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);




