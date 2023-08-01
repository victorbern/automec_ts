import { IServicosRepository } from "../../../repositories/IServicosRepository";
import { IFindAllServicosResponseDTO } from "./FindAllServicosDTO";

export class FindAllServicosUC {
    constructor(
        private servicosRepository: IServicosRepository
    ) {}

    async execute(): Promise<IFindAllServicosResponseDTO[]> {
        const servicos = await this.servicosRepository.findAll();
        return servicos;
    }
}