export interface IFindProdutoRequestDTO {
    codigoBarras: string;
}

export interface IFindProdutoResponseDTO {
    codigoBarras: string;
    descricao: string;
    valorCusto: number;
    quantidadeEstoque: number;
    precoVenda: number;
}