export interface IFindAllVeiculosRequestDTO {
    filtro?: string;
}

export interface IFindAllVeiculosResponseDTO {
    placaVeiculo: string;
    marca: string;
    modelo: string;
    ano: number;
    capacidadeOleo: number;
    cor: string;
    idCliente: number;
    nomeCliente: string;
    celularCliente: string;
}