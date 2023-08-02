import { Veiculo } from "../../../entities/Veiculo";
import { AppError } from "../../../errors/AppError";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { ICreateVeiculoRequestDTO } from "./CreateVeiculoDTO";

export class CreateVeiculoUC {
    constructor (
        private veiculosRepository: IVeiculosRepository,
        private findCliente: FindClienteUC,
    ) {}

    async execute(data: ICreateVeiculoRequestDTO) {
        try {
            if (!data.placaVeiculo || !data.marca || !data.modelo || !data.idCliente){
                throw new AppError('There are missing fields', 400);
            }
            const veiculoAlreadyExists = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo);
            if (veiculoAlreadyExists != null) {
                throw new AppError('The placaVeiculo already exists', 400);
            }
            const idCliente = data.idCliente
            const clienteExists = await this.findCliente.execute({idCliente});
            if (clienteExists == null) {
                throw new AppError('The client does not exist', 400)
            }
            const veiculo = new Veiculo(data);
            await this.veiculosRepository.save(veiculo);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError('Unexpected error', 500);
            }
        }
    }
}