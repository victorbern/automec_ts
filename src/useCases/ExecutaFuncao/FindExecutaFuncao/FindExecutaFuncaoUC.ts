import { AppError } from "../../../errors/AppError";
import { IExecutaFuncaoRepository } from "../../../repositories/IExecutaFuncaoRepository";
import { IFindExecutaFuncaoRequestDTO, IFindExecutaFuncaoResponseDTO } from "./FindExecutaFuncaoDTO";

export class FindExecutaFuncaoUC {
    constructor(
        private executaFuncaoRepository: IExecutaFuncaoRepository
    ) {}

    async execute(data: IFindExecutaFuncaoRequestDTO): Promise<IFindExecutaFuncaoResponseDTO> {
        try {
            const { idOSDetalhes, idServico, idFuncionario } = data;
            
            if (!idOSDetalhes || !idServico || !idFuncionario) {
                throw new AppError("Campos faltando", 400);
            }

            const executaFuncao = await this.executaFuncaoRepository.findUnique(idOSDetalhes, idServico, idFuncionario);

            if (executaFuncao == null || executaFuncao == undefined){
                return null;
            }

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