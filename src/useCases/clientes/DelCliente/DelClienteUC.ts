import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { FindVeiculoByClienteUC } from "../../veiculos/FindVeiculoByCliente/FindVeiculoByClienteUC";
import { IDelClienteRequestDTO } from "./DelClienteDTO";

export class DelClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
        private findVeiculoByCliente: FindVeiculoByClienteUC
    ) {}

    async execute(data: IDelClienteRequestDTO): Promise<void> {
        try {
            // Verificar se o cliente existe
            const clienteExists = await this.clientesRepository.findById(data.idCliente)
            if (!clienteExists) {
                throw new Error('Client does not found')
            }
            
            const hasVeiculo = await this.findVeiculoByCliente.execute({ idCliente: data.idCliente });
            if (hasVeiculo.length > 0) {
                throw new Error('The client has vehicles in his name')
            }
            await this.clientesRepository.delete(data.idCliente)
        } catch (error) {  
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected Error!")
            }
        }

    }
}