import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { IFindClienteRequestDTO, IFindClienteResponseDTO } from "./FindClienteDTO";

export class FindClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: IFindClienteRequestDTO): Promise<IFindClienteResponseDTO> {
        try {
            const cliente = await this.clientesRepository.findById(data.idCliente);
            return cliente;
        } catch (error) {
            throw new Error("Unexpected Error")
        }
    }
}