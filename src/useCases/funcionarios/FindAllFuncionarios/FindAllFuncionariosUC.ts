import { Funcionario } from "../../../entities/Funcionario";
import { IFuncionariosRepository } from "../../../repositories/IFuncionariosRepository";
import { IFindAllFuncionariosRequestDTO, IFindAllFuncionariosResponseDTO } from "./FindAllFuncionariosDTO";

export class FindAllFuncionariosUC {
    constructor(
        private funcionariosRepository: IFuncionariosRepository
    ) {}

    async execute(data: IFindAllFuncionariosRequestDTO): Promise<IFindAllFuncionariosResponseDTO[]> {
        let funcionarios: Funcionario[] = [];
        if (!data.filtro) {
            funcionarios = await this.funcionariosRepository.findAll();
        } else {
            funcionarios = await this.funcionariosRepository.findAllWithFilter(data.filtro);
        }
        return funcionarios;
    }
}