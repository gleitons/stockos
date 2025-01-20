import connectToDatabase from "../../lib/mongodb";
import Produto from "../../models/Produto";


export async function POST(req) {
    //await connectToDatabase();
    const dados = await req.json();
    console.log(dados)
    const produto = new Produto( dados );
    console.log(produto)
   // await produto.save();
   // return new NextResponse(JSON.stringify(produto), { status: 200 });
}