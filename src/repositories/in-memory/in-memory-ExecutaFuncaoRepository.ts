import { ExecutaFuncao } from "../../entities/ExecutaFuncao";
import { IExecutaFuncaoRepository } from "../IExecutaFuncaoRepository";

export class InMemoryExecutaFuncaoRepository implements IExecutaFuncaoRepository {
    public items: ExecutaFuncao[] = [{
        idFuncionario: 1,
        idServico: 1,
        observacao: "",
        idOSDetalhes: 1
    }]

    async save(executaFuncao: ExecutaFuncao): Promise<void> {
        this.items.push(executaFuncao);
    }
}