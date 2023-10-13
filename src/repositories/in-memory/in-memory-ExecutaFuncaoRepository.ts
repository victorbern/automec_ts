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

    async findByOSDetalhes(idOSDetalhes: number): Promise<ExecutaFuncao[]> {
        let executaFuncaoList: ExecutaFuncao[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes === idOSDetalhes) {
                executaFuncaoList.push(this.items[i]);
            }
        }

        return executaFuncaoList;
    }

    async findUnique(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<ExecutaFuncao> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes == idOSDetalhes && this.items[i].idServico == idServico && this.items[i].idFuncionario == idFuncionario) {
                return this.items[i];
            }
        }
        return null;
    }

    async update(executaFuncao: ExecutaFuncao): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes == executaFuncao.idOSDetalhes && this.items[i].idServico == executaFuncao.idServico && this.items[i].idFuncionario == executaFuncao.idFuncionario) {
                this.items[i] = {
                    idFuncionario: executaFuncao.idFuncionario,
                    idServico: executaFuncao.idServico,
                    observacao: executaFuncao.observacao,
                    idOSDetalhes: executaFuncao.idOSDetalhes,
                }
                break;
            }
        }
    }

    async delete(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idOSDetalhes == idOSDetalhes && this.items[i].idServico == idServico && this.items[i].idFuncionario == idFuncionario) {
                this.items.splice(i, 1);
                break;
            }
        }
    }
}