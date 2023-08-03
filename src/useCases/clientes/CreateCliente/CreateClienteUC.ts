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
                throw new AppError('Campos faltando', 400);
            }

            const clienteAlreadyExists = await this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
            if (clienteAlreadyExists != null) {
                throw new AppError('O CPF/CNPJ já foi cadastrado', 400);
            }
            
            const cliente = new Cliente(data);
            await this.clientesRepository.save(cliente);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}