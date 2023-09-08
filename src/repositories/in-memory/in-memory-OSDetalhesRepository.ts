import { IOSDetalhesRepository } from "../IOSDetalhesRepository";
import { OSDetalhes } from "../../entities/OSDetalhes";

export class InMemoryOSDetalhesRepository implements IOSDetalhesRepository {
    
    public items: OSDetalhes[] = [{
        idOSDetalhes: 1,
        dataOS: new Date(Date.now()),
        idOrdemServico: 1,
    }]

    async save(osDetalhes: OSDetalhes): Promise<number> {
        let id = 1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes > id) {
                id ++;
            }
        }
        osDetalhes.idOSDetalhes = id + 1;
        this.items.push(osDetalhes);
        return osDetalhes.idOSDetalhes;
    }

    async findByOrdemServico(idOrdemServico: number): Promise<OSDetalhes> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOrdemServico === idOrdemServico) {
                return this.items[i];
            }
        }
        return null;
    }
}