import { DetalhePagamento } from "../entities/DetalhePagamento";

export interface IDetalhePagamentoRepository {
    save(detalhePagamento: DetalhePagamento): Promise<void>;
    findByPagamento(idPagamento: number): Promise<DetalhePagamento[]>;
    findById(idDetalhePagamento: number): Promise<DetalhePagamento>;
    delete(idDetalhePagamento: number): Promise<void>;
}