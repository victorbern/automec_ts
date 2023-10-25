export interface IFindVendaDiretaRequestDTO {
    idPagamento: number;
}

export interface IFindVendaDiretaResponseDTO {
    idVendaDireta: number;
    idPagamento: number;
    total: number;
    dataHora: Date;
}