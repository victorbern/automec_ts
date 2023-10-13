import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { DelExecutaFuncaoUC } from "./DelExecutaFuncaoUC";

describe("Delete ExecutaFuncao", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const delExecutaFuncao = new DelExecutaFuncaoUC(mySqlExecutaFuncao);

    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 2,
        observacao: "",
        idOSDetalhes: 2,
    })

    it("should be able to delete a ExecutaFuncao", () => {
        expect(delExecutaFuncao.execute({idOSDetalhes: 2, idServico: 2, idFuncionario: 2}).then(() => {
            expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
                if (executaFuncao.idOSDetalhes == 2 && executaFuncao.idServico == 2 && executaFuncao.idFuncionario == 2) {
                    return executaFuncao;
                }
            })).toBe(undefined);
        })).resolves
    })

    it("should not be able to delete a ExecutaFuncao", () => {
        expect(delExecutaFuncao.execute({idOSDetalhes: null, idServico: 3, idFuncionario: 3})).rejects.toThrow("Campos faltando");
        expect(delExecutaFuncao.execute({idOSDetalhes: 3, idServico: null, idFuncionario: 3})).rejects.toThrow("Campos faltando");
        expect(delExecutaFuncao.execute({idOSDetalhes: 3, idServico: 3, idFuncionario: null})).rejects.toThrow("Campos faltando");
    })
})