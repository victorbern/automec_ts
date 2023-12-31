import { IVeiculosRepository } from "../IVeiculosRepository";
import { Veiculo } from "../../entities/Veiculo";

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
        this.items.push(veiculo);
    }
    async findAll(): Promise<Veiculo[]> {
        return this.items;
    }
    async findAllWithFilter(filtro: string): Promise<Veiculo[]> {
        let veiculos: Veiculo[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].placaVeiculo.includes(filtro) || this.items[i].marca.includes(filtro) || this.items[i].modelo.includes(filtro)){
                veiculos.push(this.items[i]);
            }
        }

        return veiculos;
    }
    async findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].placaVeiculo === placaVeiculo) {
                return this.items[i];
            }
        }
        return null;
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
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].placaVeiculo === veiculo.placaVeiculo) {
                this.items[i] = {
                    placaVeiculo: veiculo.placaVeiculo,
                    marca: veiculo.marca,
                    modelo: veiculo.modelo,
                    ano: veiculo.ano,
                    capacidadeOleo: veiculo.capacidadeOleo,
                    cor: veiculo.cor,
                    idCliente: veiculo.idCliente
                }
            }
        }
    }

    async delete(placaVeiculo: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].placaVeiculo === placaVeiculo) {
                this.items.splice(i, 1);
            }
        }
    }
} 