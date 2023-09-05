import { Servico } from "../../../entities/Servico";
import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { IFindAllServicosRequestDTO, IFindAllServicosResponseDTO } from "./FindAllServicosDTO";

export class FindAllServicosUC {
    constructor(
        private servicosRepository: IServicosRepository
    ) {}

    async execute(data: IFindAllServicosRequestDTO): Promise<IFindAllServicosResponseDTO[]> {
        let servicos: Servico[] = [];
        if (!data.filtro) {
            servicos = await this.servicosRepository.findAll();
        } else {
            servicos = await this.servicosRepository.findAllWithFilter(data.filtro);
        }
        return servicos;
    }
}