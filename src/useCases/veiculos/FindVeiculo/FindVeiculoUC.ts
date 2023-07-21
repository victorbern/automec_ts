import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { IFindVeiculoRequestDTO } from "./FindVeiculoDTO";

export class FindVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
    ) {}

    async execute(data: IFindVeiculoRequestDTO) {
        try {
            const veiculo = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo)
            return veiculo;
            
        } catch (error) {
            throw new Error("Unexpected Error")
        }
    }
}