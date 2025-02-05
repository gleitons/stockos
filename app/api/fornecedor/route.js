import connectToDatabase from '../../lib/mongodb';
import Fornecedor from '../../models/Fornecedor';
import { NextResponse } from 'next/server';


export async function POST(req) {
    await connectToDatabase();
    const dados = await req.json();
    
    const verifica = await Fornecedor.findOne({ cnpj: dados.cnpj });
 

    if (verifica) {
        return new NextResponse(JSON.stringify({ error: "Já existe um Fornecedor com este CNPJ" }),{ status: 400 });
    } else {
        if (dados.nomeEmpresa == '') {
            return new NextResponse(JSON.stringify(dados.nomeEmpresa), { status: 409 });

        } else {
            const fornecedor = new Fornecedor(dados);
        
            await fornecedor.save();
            return new NextResponse(JSON.stringify(fornecedor), { status: 200 });
        }

    }

   
   
}

export async function GET() {
    await connectToDatabase();
    const fornecedor = await Fornecedor.find({});

    return new NextResponse(JSON.stringify(fornecedor), { status: 200 });
}

export async function PUT(req) {
    await connectToDatabase();
    const fornecedor = await req.json();
    
  
    await Fornecedor.findByIdAndUpdate(fornecedor._id, fornecedor);
    return new NextResponse(JSON.stringify({ message: 'Fornecedor Atualizado' }), { status: 200 });
}

export async function DELETE(req) {
    await connectToDatabase();   
    const { id } = await req.json();

    await Fornecedor.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: 'Fornecedor deletedo' }), { status: 200 });
}
