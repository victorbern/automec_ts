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
            const { idOSDetalhes } = data;

            if (!idOSDetalhes) {
                throw new AppError("Campos faltando", 400);
            }

            const executaFuncaoList: ExecutaFuncao[] = await this.executaFuncaoRepository.findByOSDetalhes(idOSDetalhes);

            return executaFuncaoList;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
    
}