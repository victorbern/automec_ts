export interface ICreateOrdemServicoRequestDTO {
    idCliente: number,
    placaVeiculo: string,
    total: number,
    km: number,
    produtos: ICreateOrdemDeServicoProdutos[],
    servicos: ICreateOrdemDeServicoServicos[],
}

export interface ICreateOrdemDeServicoProdutos {
    codigoBarras: string,
    quantidadeVendida: number,
    precoTotal: number,
    precoUnitario: number,
}

export interface ICreateOrdemDeServicoServicos {
    idServico: number,
    idFuncionario: number,
    observacao: string,
}