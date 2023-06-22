import { Cliente } from "../../entities/Cliente";
import { IClientesRepository } from "../../repositories/IClientesRepository";
import { ISetClienteRequestDTO } from "./SetClienteDTO";

export class SetClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: ISetClienteRequestDTO) {
        try {
            if (!data.idCliente || !data.nomeCliente || !data.cpfCnpj || !data.celularCliente) {
                throw new Error("Data missing")
            }
            const clienteExistCpfCnpj = await this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
            if (clienteExistCpfCnpj != null) {
                if (clienteExistCpfCnpj.idCliente == data.idCliente) {
                    throw new Error("The CPF/CNPJ is already associated")
                }
            }
            
            const clienteExistId = await this.clientesRepository.findById(data.idCliente);
            if (!clienteExistId) {
                throw new Error("Client not found")
            }

            const cliente = new Cliente(data);
            await this.clientesRepository.update(cliente);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected error")
            }
        }
    }
}