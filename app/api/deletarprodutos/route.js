import mongoose from "mongoose";
import connectToDatabase from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    await connectToDatabase();
    const { nomeColecao } = await req.json(); 

    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some((col) => col.name === nomeColecao);

    if (!collectionExists) {
        return NextResponse.json({ message: `Coleção "${nomeColecao}" não encontrada` });
    }

    await mongoose.connection.db.dropCollection(nomeColecao);
    return NextResponse.json({ message: `Coleção "${nomeColecao}" deletada com sucesso` });
}
