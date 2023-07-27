import { AppError } from "../../../errors/AppError";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { IDelVeiculoRequestDTO } from "./DelVeiculoDTO";

export class DelVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository
    ) {}

    async execute(data: IDelVeiculoRequestDTO): Promise<void> {
        // Verifica se o veículo existe
        const veiculoExists = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo);
        if(!veiculoExists) {
            throw new AppError('Vehicle does not found', 400)
        }

        await this.veiculosRepository.delete(data.placaVeiculo)
    }
}