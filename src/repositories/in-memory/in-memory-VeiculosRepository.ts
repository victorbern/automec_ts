import { Veiculo } from "@prisma/client";
import { IVeiculosRepository } from "../IVeiculosRepository";

export class InMemoryVeiculosRepository implements IVeiculosRepository {
    public items: Veiculo[] = [{
        placaVeiculo: "FDP-2912",
        marca: "Fiat",
        modelo: "Uno",
        ano: 2009,
        capacidadeOleo: 3,
        cor: "Preto",
        idCliente: 1,
    }];

    async save(veiculo: Veiculo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Veiculo[]> {
        throw new Error("Method not implemented.");
    }
    async findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo> {
        throw new Error("Method not implemented.");
    }
    async findByIdCliente(idCliente: number): Promise<Veiculo[]> {
        const veiculos: Veiculo[] = [];
        for (let i=0; i<this.items.length; i++) {
            if (this.items[i].idCliente === idCliente) {
                veiculos.push({...this.items[i]})
            }
        }
        return veiculos;
    }
    async update(veiculo: Veiculo): Promise<void> {
        throw new Error("Method not implemented.");
    }
} 