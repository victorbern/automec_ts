export interface IFindServicoRequestDTO {
    idServico: number;
}

export interface IFindServicoResponseDTO {
    idServico: number;
    descricaoServico: string;
    precoServico: number;
}