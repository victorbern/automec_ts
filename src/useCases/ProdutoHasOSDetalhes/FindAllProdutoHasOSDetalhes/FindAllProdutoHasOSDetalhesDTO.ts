export interface IFindAllProdutoHasOSDetalhesRequestDTO {
    idOSDetalhes: number;
}

export interface IFindAllProdutoHasOSDetalhesResponseDTO {
    idOSDetalhes: number;
    codigoBarras: string;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}