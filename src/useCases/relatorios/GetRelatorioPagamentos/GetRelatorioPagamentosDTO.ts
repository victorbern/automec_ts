export interface IGetRelatorioPagamentosRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IGetRelatorioPagamentosResponseDTO {
    total: number;
    tipos: IGetRelatorioPagamentosTipos[];
}

export interface IGetRelatorioPagamentosTipos {
    tipo: string;
    total: number;
    pagamentos: IGetRelatorioPagamentosPagamentos[];
}

export interface IGetRelatorioPagamentosPagamentos {
    idPagamento: number;
    total: number;
    formaPagamento: string;
    dataHora: Date;
}