import { ExecutaFuncao } from "../entities/ExecutaFuncao";

export interface IExecutaFuncaoRepository {
    save(executaFuncao: ExecutaFuncao): Promise<void>;
    findByOSDetalhes(idOSDetalhes: number): Promise<ExecutaFuncao[]>;
    findUnique(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<ExecutaFuncao>;
    update(executaFuncao: ExecutaFuncao): Promise<void>;
    delete(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<void>;
}