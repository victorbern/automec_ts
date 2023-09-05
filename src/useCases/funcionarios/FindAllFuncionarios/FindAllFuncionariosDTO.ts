export interface IFindAllFuncionariosRequestDTO {
    filtro: string;
}

export interface IFindAllFuncionariosResponseDTO {
    idFuncionario: number;
    nomeFuncionario: string;
    isAtivo: string;
    funcao: string;
}