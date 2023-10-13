import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";
import { AppError } from "../../../errors/AppError";
import { IExecutaFuncaoRepository } from "../../../repositories/IExecutaFuncaoRepository";
import { ICreateExecutaFuncaoRequestDTO } from "./CreateExecutaFuncaoDTO";

export class CreateExecutaFuncaoUC {
    constructor(
        private executaFuncaoRepository: IExecutaFuncaoRepository
    ) {}

    async execute(data: ICreateExecutaFuncaoRequestDTO): Promise<void> {
        try {
            const { idOSDetalhes, idServico, idFuncionario, observacao,  } = data;

            if (!idOSDetalhes || !idServico || !idFuncionario) {
                throw new AppError("Campos faltando", 400);
            }

            const executaFuncao = new ExecutaFuncao({idOSDetalhes, idServico, idFuncionario, observacao });

            await this.executaFuncaoRepository.save(executaFuncao);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}