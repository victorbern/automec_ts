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
                throw new AppError('Campos faltando', 400)
            }

            if (data.isAtivo !== "Sim" && data.isAtivo !== "Não"){
                throw new AppError(`O campo 'isAtivo' deve ser 'Sim' ou 'Não'`, 400)
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