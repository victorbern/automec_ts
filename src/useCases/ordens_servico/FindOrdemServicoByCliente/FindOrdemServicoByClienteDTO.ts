export interface IFindOrdemServicoByClienteRequestDTO {
    idCliente: number;
}

export interface IFindOrdemServicoByClienteResponseDTO {
    idOrdemServico: number;
    total: number;
    km: number;
    isFinalizada: boolean;
    isPaga: boolean;
    placaVeiculo: string;
    idCliente: number;
}