export interface IGetRelatorioOrdemServicoRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IGetRelatorioOrdemServicoResponseDTO {
    total: number;
    subtotalPagas: number;
    subtotalNaoPagas: number;
    pagas: IGetRelatorioOrdemServicoOrdemServico[];
    naoPagas: IGetRelatorioOrdemServicoOrdemServico[];
}

export interface IGetRelatorioOrdemServicoOrdemServico {
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