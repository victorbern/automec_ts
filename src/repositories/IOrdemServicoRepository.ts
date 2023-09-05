import { OrdemServico } from "../entities/OrdemServico";

export interface IOrdemServicoRepository {
    save(ordemServico: OrdemServico): Promise<number>;
}