import { Cliente } from "../../../entities/Cliente";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { IFindAllClientesRequestDTO, IFindAllClientesResponseDTO } from "./FindAllClientesDTO";

export class FindAllClientesUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: IFindAllClientesRequestDTO): Promise<IFindAllClientesResponseDTO[]> {
        let clientes: Cliente[] = [];
        
        if (!data.filtro) {
            clientes = await this.clientesRepository.findAll();
        } else {
            clientes = await this.clientesRepository.findAllWithFilter(data.filtro);
        }
        return clientes;
    }
}