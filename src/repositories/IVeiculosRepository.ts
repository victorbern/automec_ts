import { Veiculo } from "@prisma/client";

export interface IVeiculosRepository {
    save(veiculo: Veiculo): Promise<void>;
    findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo>;
}