import type { Metadata } from "next";
import BaseOs from "./componentes/BaseOs";

import "./globals.css";



export const metadata: Metadata = {
  title: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
  description: "StockOs - Cadastro Mundial de Fornecedores e Produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <BaseOs apresentacao={children} />        
      </body>
    </html>
  );
}
