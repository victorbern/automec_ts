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
            const { idFuncionario, idServico, observacao, idOSDetalhes } = data;

            const executaFuncao = new ExecutaFuncao({idFuncionario, idServico, observacao, idOSDetalhes});

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