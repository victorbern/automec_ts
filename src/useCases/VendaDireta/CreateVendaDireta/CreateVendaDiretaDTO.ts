export interface ICreateVendaDiretaRequestDTO {
    idPagamento: number;
    total: number;
    dataHora: Date;
}

export interface ICreateVendaDiretaResponseDTO {
    idVendaDireta: number;
}