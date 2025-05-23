export const menu = [
    {
        nome: 'Fornecedor',
        submenus: [
            { nome: 'Cadastrar', link: '/cadastrar-fornecedor' },
            { nome: 'Editar', link: '/editar-fornecedor' },
            { nome: 'Excluir', link: '/excluir-fornecedor' },
            { nome: 'Associar Produto', link: '/associar-produto' },
        ],
    },
    {
        nome: 'Produtos',
        submenus: [
            { nome: 'Cadastrar', link: '/cadastrar-produto' },
            { nome: 'Editar', link: '/editar-produto' },
            { nome: 'Excluir', link: '/excluir-produto' },
        ],
    },
    {
        nome: 'Categoria',
        submenus: [
            { nome: 'Cadastrar', link: '/cadastrar-categoria' },
            { nome: 'Editar', link: '/editar-categoria' },
            { nome: 'Excluir', link: '/excluir-categoria' },
        ],
    },
    {
        nome: 'Relatórios',
        submenus: [
            { nome: 'Produtos Vinculados', link: '/relatorio' },
           
        ],
    },
];