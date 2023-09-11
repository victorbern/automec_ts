export interface IFindAllProdutosRequestDTO {
    filtro?: string;
}

export interface IFindAllProdutosResponseDTO {
    codigoBarras: string;
    descricao: string;
    valorCusto: number;
    quantidadeEstoque: number;
    precoVenda: number;
}