import { Veiculo } from "../../../entities/Veiculo";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { findClienteUC } from "../../clientes/FindCliente";
import { ISetVeiculoRequestDTO } from "./SetVeiculoDTO";

export class SetVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
    ) {}

    async execute(data: ISetVeiculoRequestDTO) {
        try {
            if (!data.placaVeiculo || !data.marca || !data.modelo || !data.idCliente) {
                throw new Error("Data missing")
            }

            const veiculoExistPlaca = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo);
            if (!veiculoExistPlaca) {
                throw new Error("Veiculo not found")
            }

            const clienteExistId = await findClienteUC.execute({idCliente: data.idCliente});
            if (!clienteExistId) {
                throw new Error("Cliente not found")
            }

            const veiculo = new Veiculo(data);
            await this.veiculosRepository.update(veiculo);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected error")
            }
        }
    }
}