import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import Category from '../../models/Category';




export async function GET() {
    await connectToDatabase();
    const categories = await Category.find({});
    return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(req) {   
    await connectToDatabase();
    const  name  = await req.json();
    const category = new Category(name);
    await category.save();
    return new NextResponse(JSON.stringify(category), { status: 201 });
}


export async function PUT(req) {
    try {
        

        await connectToDatabase(); // Certifique-se de que a conexão está ativa

        const { _id, nome } = await req.json(); // Desestrutura os dados corretamente

        if (!_id || !nome) {
            return new NextResponse(JSON.stringify({ error: "ID ou nome ausente" }), { status: 400 });
        }

        const categoriaAtualizada = await Category.findByIdAndUpdate(
            _id,
            { nome },
            { new: true } // Retorna o documento atualizado
        );

        if (!categoriaAtualizada) {
            return new NextResponse(JSON.stringify({ error: "Categoria não encontrada" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Categoria atualizada com sucesso", categoriaAtualizada }), { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        return new NextResponse(JSON.stringify({ error: "Erro interno no servidor" }), { status: 500 });
    }
}

export async function DELETE(req) {
   
    await connectToDatabase();

    const { _id } = await req.json(); 
    console.log(_id);
    const categoriaExcluida = await Category.findByIdAndDelete(_id);
    return new NextResponse(JSON.stringify({ message: "Categoria excluída com sucesso", categoriaExcluida }), { status: 200 });
}