import { AppError } from "../../../errors/AppError";
import { IExecutaFuncaoRepository } from "../../../repositories/IExecutaFuncaoRepository";
import { IDelExecutaFuncaoRequestDTO } from "./DelExecutaFuncaoDTO";

export class DelExecutaFuncaoUC {
    constructor(
        private executaFuncaoRepository: IExecutaFuncaoRepository,
    ) {}

    async execute(data: IDelExecutaFuncaoRequestDTO) {
        try {
            const { idOSDetalhes, idServico, idFuncionario } = data;
            if (!idOSDetalhes || !idServico || !idFuncionario) {
                throw new AppError("Campos faltando", 400);
            }

            let executaFuncaoExist = await this.executaFuncaoRepository.findUnique(idOSDetalhes, idServico, idFuncionario);
            if (executaFuncaoExist) {
                await this.executaFuncaoRepository.delete(idOSDetalhes, idServico, idFuncionario);
            }

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}