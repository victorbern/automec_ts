import { Veiculo } from "../entities/Veiculo";

export interface IVeiculosRepository {
    save(veiculo: Veiculo): Promise<void>;
    findAll(): Promise<Array<Veiculo>>;
    findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo>;
    findByIdCliente(idCliente: number): Promise<Veiculo[]>;
    update(veiculo: Veiculo): Promise<void>;
    delete(placaVeiculo: string): Promise<void>;
}