import connectToDatabase from "../../lib/mongodb";
import Produto from "../../models/Produto";
import { NextResponse } from "next/server";


export async function POST(req) {
    await connectToDatabase();
    const dados = await req.json();
    const produto = new Produto(dados);
    await produto.save();
    return new NextResponse(JSON.stringify(produto), { status: 200 });
}

export async function GET() {
    await connectToDatabase();
    const produto = await Produto.find({});
   
    return new NextResponse(JSON.stringify(produto), { status: 200 });

}