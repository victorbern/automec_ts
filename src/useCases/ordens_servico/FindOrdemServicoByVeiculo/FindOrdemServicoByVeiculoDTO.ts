export interface IFindOrdemServicoByVeiculoRequestDTO {
    placaVeiculo: string;
}

export interface IFindOrdemServicoByVeiculoResponseDTO {
    idOrdemServico: number;
    total: number;
    km: number;
    isFinalizada: boolean;
    isPaga: boolean;
    placaVeiculo: string;
    idCliente: number;
}