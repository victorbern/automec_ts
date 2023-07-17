import { IClientesRepository } from "../../../repositories/IClientesRepository";

export class FindAllClientesUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute() {
        const clientes = await this.clientesRepository.findAll();
        return clientes;
    }
}