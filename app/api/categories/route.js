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

    const { nome } = await req.json();

    // Verifica se a categoria já existe
    const categoriaExistente = await Category.findOne({ nome });
  
    if (categoriaExistente) {
        return NextResponse.json({ error: "Categoria já cadastrada com esse nome" }, { status: 409 });
    }

    // Cria e salva a nova categoria
    const category = new Category({ nome });
    await category.save();

    return NextResponse.json(category, { status: 201 });
}

export async function PUT(req) {
   
    try {
        await connectToDatabase();

        const { _id, nome } = await req.json();

        if (!_id || !nome) {
            return NextResponse.json({ error: "ID ou nome ausente" }, { status: 400 });
        }

        // Verifica se já existe uma categoria com o mesmo nome (ignorando o ID atual)
        const categoriaExistente = await Category.findOne({ nome, _id: { $ne: _id } });
        if (categoriaExistente) {
            return NextResponse.json({ error: "Categoria já cadastrada com esse nome" }, { status: 409 });
        }

        // Atualiza a categoria
        const categoriaAtualizada = await Category.findByIdAndUpdate(
            _id,
            { nome },
            { new: true } // Retorna o documento atualizado
        );

        if (!categoriaAtualizada) {
            return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
        }

        return NextResponse.json({ message: "Categoria atualizada com sucesso", categoriaAtualizada }, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}

export async function DELETE(req) {
   
    await connectToDatabase();

    const id = await req.json(); 

    const categoriaExcluida = await Category.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: "Categoria excluída com sucesso", categoriaExcluida }), { status: 200 });
}