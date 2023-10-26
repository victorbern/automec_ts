export interface IFindAllDetalhePagamentoRequestDTO {
    idPagamento: number;
}

export interface IFindAllDetalhePagamentoResponseDTO {
    idDetalhePagamento: number;
    idOrdemServico: number;
    idPagamento: number;   
}