import { OrdemServico } from "../../entities/OrdemServico";
import { IOrdemServicoRepository } from "../IOrdemServicoRepository";

export class InMemoryOrdemServicoRepository implements IOrdemServicoRepository {

    public items: OrdemServico[] = [{
        idOrdemServico: 1,
        total: 100,
        km: 2000,
        isFinalizada: false,
        isPaga: false,
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

    async findById(idOrdemServico: number): Promise<OrdemServico> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOrdemServico === idOrdemServico) {
                return this.items[i];
            }
        }
        return null;
    }

    async findAll(): Promise<OrdemServico[]> {
        let ordens: OrdemServico[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].isPaga == false) {
                ordens.push(this.items[i]);
            }
        }
        return ordens;
    }
    async findByCliente(idCliente: number): Promise<OrdemServico[]> {
        let ordens: OrdemServico[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idCliente === idCliente && this.items[i].isPaga == false) {
                ordens.push(this.items[i]);
            }
        }
        return ordens;
    }
    async findByVeiculo(placaVeiculo: string): Promise<OrdemServico[]> {
        let ordens: OrdemServico[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].placaVeiculo === placaVeiculo && this.items[i].isPaga == false) {
                ordens.push(this.items[i]);
            }
        }
        return ordens;
    }

    async isPaga(idOrdemServico: number): Promise<Boolean> {
        let ordemServico: OrdemServico;
        for (let i in this.items) {
            if (this.items[i].idOrdemServico == idOrdemServico) {
                ordemServico = this.items[i];
                break;
            }
        }

        return ordemServico.isPaga;
    }

    async update(ordemServico: OrdemServico): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOrdemServico == ordemServico.idOrdemServico) {
                this.items[i] = {
                    idOrdemServico: ordemServico.idOrdemServico,
                    total: ordemServico.total,
                    km: ordemServico.km,
                    isFinalizada: ordemServico.isFinalizada,
                    isPaga: ordemServico.isPaga,
                    placaVeiculo: ordemServico.placaVeiculo,
                    idCliente: ordemServico.idCliente
                }
            }
        }
    }

    async delete(idOrdemServico: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOrdemServico == idOrdemServico) {
                this.items.splice(i, 1);
            }
        }
    }
}