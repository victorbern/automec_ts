import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { CreateExecutaFuncaoUC } from "./CreateExecutaFuncaoUC";

describe("Criar ExecutaFuncao", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository();
    const createExecutaFuncao = new CreateExecutaFuncaoUC(mySqlExecutaFuncao);

    mySqlExecutaFuncao.items = [
        {
            idFuncionario: 1,
            idServico: 1,
            observacao: "",
            idOSDetalhes: 1
        }
    ]

    it("should be able to create a ExecutaFuncao", () => {
        expect(createExecutaFuncao.execute({
            idFuncionario: 1,
            idServico: 2,
            observacao: "Teste",
            idOSDetalhes: 1
        }).then(() => {
            expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
                if (executaFuncao.idFuncionario == 1 && executaFuncao.idServico == 2 && executaFuncao.idOSDetalhes == 1) {
                    return executaFuncao;
                }
            }).observacao).toBe("Teste")
        })).resolves;
    });

    it("should not be able to create a ExecutaFuncao", () => {
        expect(createExecutaFuncao.execute({idOSDetalhes: null, idServico: 3, observacao: "Teste", idFuncionario: 2})).rejects.toThrow("Campos faltando");
        expect(createExecutaFuncao.execute({idOSDetalhes: 2, idServico: null, observacao: "Teste", idFuncionario: 2})).rejects.toThrow("Campos faltando");
        expect(createExecutaFuncao.execute({idOSDetalhes: 2, idServico: 3, observacao: "Teste", idFuncionario: null})).rejects.toThrow("Campos faltando");
    })
})