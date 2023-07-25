export interface IFindVeiculoByClienteRequestDTO {
    idCliente: number;
}

export interface IFindVeiculoByClienteResponseDTO {
    placaVeiculo: string;
    marca: string;
    modelo: string;
    ano: number;
    capacidadeOleo: number;
    cor: string;
    veiculo_idCliente: number;
}