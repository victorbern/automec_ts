import { Veiculo } from "../../../entities/Veiculo";
import { AppError } from "../../../errors/AppError";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { ISetVeiculoRequestDTO } from "./SetVeiculoDTO";

export class SetVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
        private findCliente: FindClienteUC
    ) {}

    async execute(data: ISetVeiculoRequestDTO) {
        try {
            if (!data.placaVeiculo || !data.marca || !data.modelo || !data.idCliente) {
                throw new Error("Campos faltando")
            }

            const veiculoExistPlaca = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo);
            if (!veiculoExistPlaca) {
                throw new Error("Veículo não encontrado")
            }

            const clienteExistId = await this.findCliente.execute({idCliente: data.idCliente});
            if (!clienteExistId) {
                throw new Error("Cliente não encontrado")
            }

            const veiculo = new Veiculo(data);
            await this.veiculosRepository.update(veiculo);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}