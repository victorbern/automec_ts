export interface IFindExecutaFuncaoRequestDTO {
    idOSDetalhes: number;
    idServico: number;
    idFuncionario: number;
}

export interface IFindExecutaFuncaoResponseDTO {
    idOSDetalhes: number;
    idServico: number;
    idFuncionario: number;
    observacao: string;
}