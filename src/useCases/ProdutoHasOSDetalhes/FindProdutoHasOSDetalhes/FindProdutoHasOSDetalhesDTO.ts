export interface IFindProdutoHasOSDetalhesRequestDTO {
    idOSDetalhes: number;
    codigoBarras: string;
}

export interface IFindProdutoHasOSDetalhesResponseDTO {
    idOSDetalhes: number;
    codigoBarras: string;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}