import { Pagamento } from "../../entities/Pagamento";
import { IPagamentosRepository } from "../IPagamentosRepository";

export class InMemoryPagamentosRepository implements IPagamentosRepository {
    public items: Pagamento[] = [
        {
            idPagamento: 1,
            dataHora: new Date(Date.now()),
            subtotal: 20,
            total: 19,
            desconto: 1,
            formaPagamento: "Cartão de Crédito",
        }
    ]

    async save(pagamento: Pagamento): Promise<number> {
        let id = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idPagamento > id) {
                id++;
            }
        }
        pagamento.idPagamento = id + 1;
        this.items.push(pagamento);
        
        return pagamento.idPagamento;
    }

    async findAll(): Promise<Pagamento[]> {
        return this.items;
    }

    async findById(idPagamento: number): Promise<Pagamento> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idPagamento === idPagamento) {
                return this.items[i];
            }
        }

        return null;
    }

    async findBetweenDates(dataDe: Date, dataAte: Date): Promise<Pagamento[]> {
        let pagamentos: Pagamento[] = [];
        for (let i in this.items) {
            if (this.items[i].dataHora >= dataDe && this.items[i].dataHora <= dataAte) {
                pagamentos.push(this.items[i]);
            }
        }

        return pagamentos;
    }

    async delete(idPagamento: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idPagamento == idPagamento) {
                this.items.splice(i, 1);
            }
        }
    }
}