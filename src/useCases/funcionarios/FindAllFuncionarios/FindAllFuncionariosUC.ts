import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { IFindAllFuncionariosResponseDTO } from "./FindAllFuncionariosDTO";

export class FindAllFuncionariosUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository
    ) {}

    async execute(): Promise<IFindAllFuncionariosResponseDTO[]> {
        const funcionarios = await this.funcionariosRepository.findAll();
        return funcionarios;
    }
}