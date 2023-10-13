export interface ISetOrdemServicoRequestDTO {
    idOrdemServico: number;
    idCliente: number;
    placaVeiculo: string;
    total: number;
    km: number;
    produtos: ISetOrdemServicoProdutos[];
    servicos: ISetOrdemServicoServicos[];
}

export interface ISetOrdemServicoProdutos {
    codigoBarras: string;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}

export interface ISetOrdemServicoServicos {
    idServico: number;
    idFuncionario: number;
    observacao: string;
}