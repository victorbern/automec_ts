export interface IFindVendaDiretaBetweenDatesRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IFindVendaDiretaBetweenDatesResponseDTO {
    idVendaDireta: number;
    idPagamento: number;
    total: number;
    dataHora: Date;
}