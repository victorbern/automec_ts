export interface IFindOrdemServicoBetweenDatesRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IFindOrdemServicoBetweenDatesResponseDTO {
    idOrdemServico: number;
    total: number;
    km: number;
    isFinalizada: boolean;
    isPaga: boolean;
    placaVeiculo: string;
    idCliente: number;
    idOSDetalhes: number;
    dataOS: Date;
}