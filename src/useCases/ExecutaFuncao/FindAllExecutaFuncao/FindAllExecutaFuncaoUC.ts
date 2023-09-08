import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";
import { AppError } from "../../../errors/AppError";
import { IExecutaFuncaoRepository } from "../../../repositories/IExecutaFuncaoRepository";
import { IFindAllExecutaFuncaoRequestDTO, IFindAllExecutaFuncaoResponseDTO } from "./FindAllExecutaFuncaoDTO";

export class FindAllExecutaFuncaoUC {
    constructor(
        private executaFuncaoRepository: IExecutaFuncaoRepository,
    ) {}

    async execute(data: IFindAllExecutaFuncaoRequestDTO): Promise<IFindAllExecutaFuncaoResponseDTO[]> {
        try {
            const executaFuncao: ExecutaFuncao[] = await this.executaFuncaoRepository.findByOSDetalhes(data.idOSDetalhes);

            return executaFuncao;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
    
}