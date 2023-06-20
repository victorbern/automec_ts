import { Cliente } from "../../entities/Cliente";
import { IClientesRepository } from "../../repositories/IClientesRepository";
import { ICreateClienteRequestDTO } from "./CreateClienteDTO";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: ICreateClienteRequestDTO) {
        if (!data.nomeCliente || !data.celularCliente || !data.cpfCnpj) {
            throw new Error('There are missing fields')
        }

        const clienteAlreadyExists = await this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
        
        if (clienteAlreadyExists) {
            throw new Error('The CPF/CNPJ already exists');
        }
        
        const cliente = new Cliente(data);
        try {
            await this.clientesRepository.save(cliente);
        } catch (error) {

        }
    }
}