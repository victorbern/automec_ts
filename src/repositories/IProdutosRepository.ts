import { Produto } from "../entities/Produto";

export interface IProdutosRepository {
    save(produto: Produto): Promise<void>;
    findAll(): Promise<Produto[]>;
    findByCodigoBarras(codigoBarras: string): Promise<Produto>;
    update(produto: Produto): Promise<void>;
}