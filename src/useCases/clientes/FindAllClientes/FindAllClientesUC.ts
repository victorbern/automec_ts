import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { IFindAllClientesResponseDTO } from "./FindAllClientesDTO";

export class FindAllClientesUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(): Promise<IFindAllClientesResponseDTO[]> {
        const clientes = await this.clientesRepository.findAll();
        return clientes;
    }
}