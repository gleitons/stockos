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

// export async function PUT(request) {
//     console.log('vamos ver')
//     await connectToDatabase();
//     const { id, nome } = await request.json();
//     console.log(id)
//     await Category.findByIdAndUpdate(id, { nome });
//     return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
// }


export async function PUT(req) {
    try {
        console.log("Iniciando atualização...");

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
    try {
        console.log("Iniciando exclusão...");

        await connectToDatabase();

        const { _id } = await req.json(); // Recebe o ID da categoria no corpo da requisição

        if (!_id) {
            return new NextResponse(JSON.stringify({ error: "ID ausente" }), { status: 400 });
        }

        const categoriaExcluida = await Category.findByIdAndDelete(_id);

        if (!categoriaExcluida) {
            return new NextResponse(JSON.stringify({ error: "Categoria não encontrada" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Categoria excluída com sucesso", categoriaExcluida }), { status: 200 });
    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        return new NextResponse(JSON.stringify({ error: "Erro interno no servidor" }), { status: 500 });
    }
}
// export async function PUT(req) {    
//     console.log('comecou')
//     await connectToDatabase();
//     const  categoria = await req.json();    
//     console.log(categoria)
//     const ola = await Category.findByIdAndUpdate(categoria._id, categoria.nome, { new: true });
//     console.log(ola )
//     return new NextResponse(JSON.stringify({ message: 'Atualizando produto' }, { status: 200 }), );
// }

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

// export async function DELETE(req) {

//     console.log('comecou')
//     console.log(req)
//     await connectToDatabase();
//     const id = await req
//     console.log(req)
//     await Category.findByIdAndDelete(id);
//     return new NextResponse(JSON.stringify({ message: 'Categoria Deletada' }), { status: 200 });
// }

