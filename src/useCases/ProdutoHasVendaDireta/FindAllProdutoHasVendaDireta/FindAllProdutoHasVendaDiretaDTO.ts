export interface IFindAllProdutoHasVendaDiretaRequestDTO {
    idVendaDireta: number;
}

export interface IFindAllProdutoHasVendaDiretaResponseDTO {
    codigoBarras: string;
    idVendaDireta: number;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}