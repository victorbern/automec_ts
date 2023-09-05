import { OrdemServico } from "../../entities/OrdemServico";
import { IOrdemServicoRepository } from "../IOrdemServicoRepository";

export class InMemoryOrdemServicoRepository implements IOrdemServicoRepository {
    public items: OrdemServico[] = [{
        idOrdemServico: 1,
        total: 100,
        km: 2000,
        isFinalizada: "nao",
        isPaga: "nao",
        placaVeiculo: "FDP-2912",
        idCliente: 1
    }]

    async save(ordemServico: OrdemServico): Promise<number> {
        let id = 1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOrdemServico > id) {
                id++;
            }
        }
        ordemServico.idOrdemServico = id + 1;
        this.items.push(ordemServico);
        return ordemServico.idOrdemServico;
    }
}