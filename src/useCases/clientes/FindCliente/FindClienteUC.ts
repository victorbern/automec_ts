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
            if (cliente == null || cliente == undefined) {
                return null;
            }
            return cliente;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}