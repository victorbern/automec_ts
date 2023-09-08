export interface IFindOSDetalhesRequestDTO {
    idOrdemServico: number;
}

export interface IFindOSDetalhesResponseDTO {
    idOSDetalhes: number;
    dataOS: Date;
    idOrdemServico: number;
}