import { DetalhePagamento } from "../../entities/DetalhePagamento";
import { IDetalhePagamentoRepository } from "../IDetalhePagamentoRepository";

export class InMemoryDetalhePagamentoRepository implements IDetalhePagamentoRepository {
    public items: DetalhePagamento[] = [
        {
            idDetalhePagamento: 1,
            idOrdemServico: 1,
            idPagamento: 1,
        }
    ]

    async save(detalhePagamento: DetalhePagamento): Promise<void> {
        let id = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idDetalhePagamento > id) {
                id++;
            }
        }
        detalhePagamento.idDetalhePagamento = id + 1;
        this.items.push(detalhePagamento);
    }

    async findByPagamento(idPagamento: number): Promise<DetalhePagamento[]> {
        let detalhePagamentoList: DetalhePagamento[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idPagamento === idPagamento) {
                detalhePagamentoList.push(this.items[i]);
            }
        }

        return detalhePagamentoList;
    }

    async findById(idDetalhePagamento: number): Promise<DetalhePagamento> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idDetalhePagamento == idDetalhePagamento) {
                return this.items[i];
            }
        }
        return null;
    }

    async delete(idDetalhePagamento: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idDetalhePagamento == idDetalhePagamento) {
                this.items.splice(i, 1);
            }
        }
    }
}