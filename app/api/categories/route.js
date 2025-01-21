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
    await connectToDatabase();
    const { id, nome } = await request.json();
    await Category.findByIdAndUpdate(id, { nome });
    return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
}

export async function DELETE(req) {
    
    console.log('comecou')
    console.log(req)
    await connectToDatabase();
    const id = await req
    console.log(req)
    await Category.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: 'Categoria Deletada' }), { status: 200 });
}

