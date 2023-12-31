import { OrdemServico } from "../entities/OrdemServico";

export interface IOrdemServicoRepository {
    save(ordemServico: OrdemServico): Promise<number>;
    findAll(): Promise<OrdemServico[]>;
    findById(idOrdemServico: number): Promise<OrdemServico>;
    findByCliente(idCliente: number): Promise<OrdemServico[]>;
    findByVeiculo(placaVeiculo: string): Promise<OrdemServico[]>;
    isPaga(idOrdemServico: number): Promise<Boolean>;
    update(ordemServico: OrdemServico): Promise<void>;
    delete(idOrdemServico: number): Promise<void>;
}