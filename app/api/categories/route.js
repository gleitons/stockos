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

    const category = new Category({ nome });
    console.log(category)
    await category.save();
    return new NextResponse(JSON.stringify(category), { status: 201 });
}

export async function PUT(request) {
    console.log('vamos ver')
    await connectToDatabase();
    const { id, nome } = await request.json();
    console.log(id)
    await Category.findByIdAndUpdate(id, { nome });
    return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
}

// export async function PUT(request) {
//     try {
//         await connectToDatabase();
//         const { id, nome } = await request.json();

//         if (!id || !nome) {
//             return new Response(JSON.stringify({ message: 'ID e nome são necessários' }), { status: 400 });
//         }
//         console.log(id, nome)
//         const updatedCategory = await Category.findByIdAndUpdate(id, { nome }, { new: true });

//         if (!updatedCategory) {
//             return new Response(JSON.stringify({ message: 'Categoria não encontrada' }), { status: 404 });
//         }

//         return new Response(JSON.stringify({ message: 'Categoria atualizada', data: updatedCategory }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ message: 'Erro ao atualizar a categoria', error: error.message }), { status: 500 });
//     }
// }

export async function DELETE(req) {

    console.log('comecou')
    console.log(req)
    await connectToDatabase();
    const id = await req
    console.log(req)
    await Category.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: 'Categoria Deletada' }), { status: 200 });
}

