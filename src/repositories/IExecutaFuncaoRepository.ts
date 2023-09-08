import { ExecutaFuncao } from "../entities/ExecutaFuncao";

export interface IExecutaFuncaoRepository {
    save(executaFuncao: ExecutaFuncao): Promise<void>;
    findByOSDetalhes(idOSDetalhes: number): Promise<ExecutaFuncao[]>;
}