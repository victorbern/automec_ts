export interface IFindFuncionarioRequestDTO {
    idFuncionario: number;
}

export interface IFindFuncionarioResponseDTO {
    idFuncionario: number;
    nomeFuncionario: string;
    isAtivo: string;
    funcao: string;
}