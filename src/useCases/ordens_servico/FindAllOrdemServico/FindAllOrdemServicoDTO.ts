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
    cliente: Cliente,
    veiculo: Veiculo,
    data: Date,
    produtos: IFindAllOrdemServicoProdutos[],
    servicos: IFindAllOrdemServicoServicos[],
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