import { Cliente } from "../../../entities/Cliente";
import { Veiculo } from "../../../entities/Veiculo";

export interface IFindAllOrdemServicoRequestDTO {
    filtro?: string;
}

export interface IFindAllOrdemServicoResponseDTO {
    idOrdemServico: number;
    total: number;
    km: number;
    isFinalizada: boolean;
    isPaga: boolean;
    cliente: IFindOrdemServicoCliente,
    veiculo: IFindOrdemServicoVeiculo,
    data: Date,
    produtos: IFindAllOrdemServicoProdutos[],
    servicos: IFindAllOrdemServicoServicos[],
}

export interface IFindOrdemServicoCliente {
    idCliente?: number,
    nomeCliente?: string,
    cpfCnpj?: string,
    celularCliente?: string,
    telefoneCliente?: string,
    cep?: string,
    endereco?: string,
    numero?: string,
    bairro?: string,
    cidade?: string,
    uf?: string,
    complemento?: string,
    dados?: string,
}

export interface IFindOrdemServicoVeiculo {
    placaVeiculo?: string,
    marca?: string,
    modelo?: string,
    ano?: number,
    capacidadeOleo?: number,
    cor?: string,
    idCliente?: number,
    dados?: string,
}

export interface IFindAllOrdemServicoProdutos {
    codigoBarras: string;
    descricao: string;
    quantidadeVendida: number;
    precoUnitario: number;
    precoTotal: number;
}

export interface IFindAllOrdemServicoServicos {
    idServico: number;
    descricaoServico: string;
    precoServico: number;
    observacao: string;
    idFuncionario: number;
    nomeFuncionario: string;
}