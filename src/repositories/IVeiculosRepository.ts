import { Veiculo } from "@prisma/client";

export interface IVeiculosRepository {
    save(veiculo: Veiculo): Promise<void>;
    findAll(): Promise<Array<Veiculo>>;
    findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo>;
    update(veiculo: Veiculo): Promise<void>;
}