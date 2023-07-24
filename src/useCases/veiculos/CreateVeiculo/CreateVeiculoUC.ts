import { Veiculo } from "../../../entities/Veiculo";
import { AppError } from "../../../errors/AppError";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { findClienteUC } from "../../clientes/FindCliente/";
import { findVeiculoUC } from "../FindVeiculo";
import { ICreateVeiculoRequestDTO } from "./CreateVeiculoDTO";

export class CreateVeiculoUC {
    constructor (
        private veiculosRepository: IVeiculosRepository,
    ) {}

    async execute(data: ICreateVeiculoRequestDTO) {
        try {
            if (!data.placaVeiculo || !data.marca || !data.modelo || !data.idCliente){
                throw new AppError('There are missing fields', 400);
            }

            const veiculoAlreadyExists = await findVeiculoUC.execute({placaVeiculo: data.placaVeiculo});
            if (veiculoAlreadyExists != null) {
                throw new AppError('The placaVeiculo already exists', 400);
            }
            const idCliente = data.idCliente
            const clienteExists = await findClienteUC.execute({idCliente});
            if (clienteExists == null) {
                throw new AppError('The cliente does not exist', 400)
            }

            const veiculo = new Veiculo(data);
            await this.veiculosRepository.save(veiculo);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                throw error;
            } else {
                throw new AppError('Unexpected error', 500);
            }
        }
    }
}