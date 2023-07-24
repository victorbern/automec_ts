export interface IFindVeiculoRequestDTO {
    placaVeiculo: string;
}

export interface IFindVeiculoResponseDTO {
    placaVeiculo: string;
    marca: string;
    modelo: string;
    ano: number;
    capacidadeOleo: number;
    cor: string;
    veiculo_idCliente: number;
    nomeCliente: string;
    celularCliente: string;
}