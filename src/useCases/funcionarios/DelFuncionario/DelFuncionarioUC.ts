import { AppError } from "../../../errors/AppError";
import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { IDelFuncionarioRequestDTO } from "./DelFuncionarioDTO";

export class DelFuncionarioUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository,
    ) {}

    async execute(data: IDelFuncionarioRequestDTO): Promise<void> {
        try {
            // Verificar se o id fornecido não é nulo
            const idFuncionario = data.idFuncionario;
            if (!idFuncionario) {
                throw new AppError("Campos faltando", 400);
            }

            // Verificar se o funcionário existe
            const funcionarioExists = await this.funcionariosRepository.findByIdFuncionario(idFuncionario);

            if (!funcionarioExists) {
                throw new AppError("Funcionário não encontrado", 400);
            }

            await this.funcionariosRepository.delete(idFuncionario);
            
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected Error!")
            }
        }
    }
}