export interface ICreatePagamentoRequestDTO {
    subtotal: number;
    total: number;
    formaPagamento: string;
    desconto: number;
    ordensServico: ICreatePagamentoOrdensServico[],
    vendaDireta: ICreatePagamentoVenda,
}

export interface ICreatePagamentoOrdensServico {
    idOrdemServico: number;
}

export interface ICreatePagamentoVenda {
    total: number;
    produtos: ICreatePagamentoProduto[],
}

export interface ICreatePagamentoProduto {
    codigoBarras: string;
    quantidadeVendida: number;
    precoUnitario: number;
    precoTotal: number;
}