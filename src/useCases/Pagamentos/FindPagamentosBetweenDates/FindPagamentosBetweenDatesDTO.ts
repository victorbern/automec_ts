export interface IFindPagamentosBetweenDatesRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IFindPagamentosBetweenDatesResponseDTO {
    idPagamento: number;
    dataHora: Date;
    subtotal: number;
    total: number;
    desconto: number;
    formaPagamento: string;
}