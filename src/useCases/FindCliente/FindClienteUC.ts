import { IClientesRepository } from "../../repositories/IClientesRepository";
import { IFindClienteRequestDTO } from "./FindClienteDTO";

export class FindClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: IFindClienteRequestDTO) {
        try {
            const cliente = await this.clientesRepository.findById(data.idCliente);
            return cliente;
        } catch (error) {
            throw new Error("Unexpected Error")
        }
    }
}