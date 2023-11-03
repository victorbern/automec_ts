import { VendaDireta } from "../../entities/VendaDireta";
import { IVendaDiretaRepository } from "../IVendaDiretaRepository";

export class InMemoryVendaDiretaRepository implements IVendaDiretaRepository {
    public items: VendaDireta[] = [
        {
            idVendaDireta: 1,
            idPagamento: 1,
            total: 1,
            dataHora: new Date(Date.now()),
        }
    ]

    async save(vendaDireta: VendaDireta): Promise<number> {
        let id = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta > id) {
                id++;
            }
        }

        vendaDireta.idVendaDireta = id + 1;
        this.items.push(vendaDireta);

        return vendaDireta.idVendaDireta;
    }

    async findById(idVendaDireta: number): Promise<VendaDireta> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta === idVendaDireta) {
                return this.items[i];
            }
        }

        return null;
    }

    async findByPagamento(idPagamento: number): Promise<VendaDireta> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idPagamento === idPagamento) {
                return this.items[i];
            }
        };

        return null;
    }

    async delete(idVendaDireta: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idVendaDireta == idVendaDireta) {
                this.items.splice(i, 1);
            }
        }
    }
}