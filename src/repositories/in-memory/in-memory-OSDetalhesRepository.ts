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

    async findById(idOSDetalhes: number): Promise<OSDetalhes> {
        for (let i in this.items) {
            const osDetalhes = this.items[i];
            if (osDetalhes.idOSDetalhes == idOSDetalhes) {
                return osDetalhes;
            }
        }
        return null;
    }

    async findBetweenDates(dataDe: Date, dataAte: Date): Promise<OSDetalhes[]> {
        let osDetalhesList: OSDetalhes[] = [];
        for (let i in this.items) {
            if (this.items[i].dataOS >= dataDe && this.items[i].dataOS <= dataAte) {
                osDetalhesList.push(this.items[i]);
            }
        }
        return osDetalhesList;
    }

    async delete(idOSDetalhes: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes == idOSDetalhes) {
                this.items.splice(i, 1);
            }
        }
    }
}