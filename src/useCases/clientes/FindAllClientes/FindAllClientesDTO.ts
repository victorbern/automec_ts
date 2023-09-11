export interface IFindAllClientesRequestDTO {
    filtro?: string;
}

export interface IFindAllClientesResponseDTO {
    idCliente: number;
    nomeCliente: string;
    cpfCnpj: string;
    celularCliente: string;
    telefoneCliente: string;
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;
}