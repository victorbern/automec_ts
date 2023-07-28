import { Funcionario } from "../../../entities/Funcionario";
import { AppError } from "../../../errors/AppError";
import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { ISetFuncionarioRequestDTO } from "./SetFuncionarioDTO";

export class SetFuncionarioUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository
    ) {}

    async execute(data: ISetFuncionarioRequestDTO): Promise<void> {
        try {
            if (!data.idFuncionario || !data.nomeFuncionario || !data.isAtivo || !data.funcao) {
                throw new AppError('There are missing fields', 400)
            }

            if (data.isAtivo !== "sim" && data.isAtivo !== "nao"){
                throw new AppError(`O campo 'isAtivo' deve ser 'sim' ou 'nao'`, 400)
            }

            const funcionarioExists = await this.funcionariosRepository.findByIdFuncionario(data.idFuncionario);
            if (!funcionarioExists) {
                throw new AppError('Employee does not found', 400)
            }

            const funcionario = new Funcionario(data);

            await this.funcionariosRepository.update(funcionario);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected error")
            }
        }
    }
}