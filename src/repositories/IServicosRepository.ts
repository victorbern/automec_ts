import { Servico } from "../entities/Servico";

export interface IServicosRepository {
    save(servico: Servico): Promise<void>;
    findAll(): Promise<Servico[]>;
    findByIdServico(idServico: number): Promise<Servico>;
    update(servico: Servico): Promise<void>;
}