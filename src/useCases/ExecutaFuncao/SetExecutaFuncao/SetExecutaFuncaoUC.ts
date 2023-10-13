import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";
import { AppError } from "../../../errors/AppError";
import { IExecutaFuncaoRepository } from "../../../repositories/IExecutaFuncaoRepository";
import { ISetExecutaFuncaoRequestDTO } from "./SetExecutaFuncaoDTO";

export class SetExecutaFuncaoUC {
    constructor(
        private executaFuncaoRepository: IExecutaFuncaoRepository
    ) { }

    async execute(data: ISetExecutaFuncaoRequestDTO) {
        try {
            const { idOSDetalhes, idServico, idFuncionario, observacao } = data;

            if (!idOSDetalhes || !idServico || !idFuncionario) {
                throw new AppError("Campos faltando", 400);
            }

            let executaFuncaoExist = await this.executaFuncaoRepository.findUnique(idOSDetalhes, idServico, idFuncionario);

            if (!executaFuncaoExist) {
                throw new AppError("O serviço executado a ser alterado não foi encontrado", 400);
            }

            let executaFuncao = new ExecutaFuncao({
                idOSDetalhes,
                idServico,
                idFuncionario,
                observacao
            })

            await this.executaFuncaoRepository.update(executaFuncao);
            
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}