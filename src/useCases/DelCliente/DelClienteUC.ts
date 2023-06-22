import { MySqlClientesRepository } from "../../repositories/implementations/MySqlClientesRepository";
import { IDelClienteRequestDTO } from "./DelClienteDTO";

export class DelClienteUC {
    constructor(
        private clientesRepository: MySqlClientesRepository 
    ) {}

    async execute(data: IDelClienteRequestDTO) {
        try {
            // Verificar se o cliente existe
            const clienteExists = await this.clientesRepository.findById(data.idCliente)
            if (!clienteExists) {
                throw new Error('Client does not found')
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