import { Funcionario } from "../../../entities/Funcionario";
import { AppError } from "../../../errors/AppError";
import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { ICreateFuncionarioRequestDTO } from "./CreateFuncionarioDTO";

export class CreateFuncionarioUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository
    ) {}

    async execute(data: ICreateFuncionarioRequestDTO): Promise<void> {
        try {
            if (!data.nomeFuncionario || !data.isAtivo || !data.funcao) {
                throw new AppError('There are missing fields', 400)
            }

            if (data.isAtivo !== "sim" && data.isAtivo !== "nao"){
                throw new AppError(`O campo 'isAtivo' deve ser 'sim' ou 'nao'`, 400)
            }
            const funcionario = new Funcionario(data);
            await this.funcionariosRepository.save(funcionario);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}