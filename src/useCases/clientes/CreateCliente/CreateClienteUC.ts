import { Cliente } from "../../../entities/Cliente";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { ICreateClienteRequestDTO } from "./CreateClienteDTO";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: ICreateClienteRequestDTO) {
        try {
            if (!data.nomeCliente || !data.celularCliente || !data.cpfCnpj) {
                throw new AppError('There are missing fields', 400);
            }

            const clienteAlreadyExists = await this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
            if (clienteAlreadyExists != null) {
                throw new AppError('The CPF/CNPJ already exists', 400);
            }
            
            const cliente = new Cliente(data);
            await this.clientesRepository.save(cliente).then(() => {
                return { success: true }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}