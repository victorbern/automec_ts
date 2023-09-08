import { Cliente } from "../../../entities/Cliente";
import { Veiculo } from "../../../entities/Veiculo";

export interface IFindOrdemServicoRequestDTO {
    idOrdemServico: number;
}

export interface IFindOrdemServicoResponseDTO {
    idOrdemServico: number;
    total: number;
    km: number;
    isFinalizada: boolean;
    isPaga: boolean;
    cliente: Cliente,
    veiculo: Veiculo,
    data: Date,
    produtos: IFindOrdemServicoProdutos[],
    servicos: IFindOrdemServicoServicos[],
}

export interface IFindOrdemServicoProdutos {
    codigoBarras: string;
    descricao: string;
    quantidadeVendida: number;
    precoUnitario: number;
    precoTotal: number;
}

export interface IFindOrdemServicoServicos {
    idServico: number;
    descricaoServico: string;
    precoServico: number;
    observacao: string;
    idFuncionario: number;
    nomeFuncionario: string;
}