import { AppError } from "../../../errors/AppError";
import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { IFindFuncionarioRequestDTO, IFindFuncionarioResponseDTO } from "./FindFuncionarioDTO";

export class FindFuncionarioUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository
    ) {}

    async execute(data: IFindFuncionarioRequestDTO): Promise<IFindFuncionarioResponseDTO> {
        try {
            const funcionario = this.funcionariosRepository.findByIdFuncionario(data.idFuncionario);
            if (funcionario == null || funcionario == undefined) {
                return null;
            }
            return funcionario;
        } catch(error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}