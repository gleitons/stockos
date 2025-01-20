import connectToDatabase from '../../lib/mongodb';
import Category from '../../models/Category';

export async function GET() {
    await connectToDatabase();
    const categories = await Category.find({});
    return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(request) {
    await connectToDatabase();
    const { nome } = await request.json();
    console.log(nome)
    const category = new Category({ nome });
    console.log(category)
    await category.save();
    return new Response(JSON.stringify(category), { status: 201 });
}

export async function PUT(request) {
    await connectToDatabase();
    const { id, nome } = await request.json();
    await Category.findByIdAndUpdate(id, { nome });
    return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
}

export async function DELETE(request) {
    await connectToDatabase();
    const { id } = await request.json();
    await Category.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: 'Category deleted' }), { status: 200 });
}
