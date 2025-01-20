import connectToDatabase from '../../lib/mongodb';
import Fornecedor from '../../models/Fornecedor';
import { NextResponse } from 'next/server';

// export async function GET() {
//     await connectToDatabase();
//     const categories = await Category.find({});
//     return new Response(JSON.stringify(categories), { status: 200 });
// }

export async function POST(req) {
    await connectToDatabase();
    const dados = await req.json();
    console.log(dados)
    const fornecedor = new Fornecedor( dados );
    await fornecedor.save();
    return new NextResponse(JSON.stringify(fornecedor), { status: 200 });



}

// export async function POST(request) {
//     await connectToDatabase();
//     const { nome } = await request.json();
//     const category = new Category({ nome });
//     await category.save();
//     return new Response(JSON.stringify(category), { status: 201 });
// }
export async function GET() {
    await connectToDatabase();
    const fornecedor = await Fornecedor.find({});
    console.log(fornecedor)
    return new NextResponse(JSON.stringify(fornecedor), { status: 200 });

}
// export async function PUT(request) {
//     await connectToDatabase();
//     const { id, nome } = await request.json();
//     await Category.findByIdAndUpdate(id, { nome });
//     return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
// }

// export async function DELETE(request) {
//     await connectToDatabase();
//     const { id } = await request.json();
//     await Category.findByIdAndDelete(id);
//     return new Response(JSON.stringify({ message: 'Category deleted' }), { status: 200 });
// }
