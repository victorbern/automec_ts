export interface IFindAllServicosRequestDTO {
    filtro?: string;
}

export interface IFindAllServicosResponseDTO {
    idServico: number;
    descricaoServico: string;
    precoServico: number;
}