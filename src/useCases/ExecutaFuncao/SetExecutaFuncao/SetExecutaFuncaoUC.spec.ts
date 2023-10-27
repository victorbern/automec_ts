import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { SetExecutaFuncaoUC } from "./SetExecutaFuncaoUC";

describe("Set ExecutaFunção", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const setExecutaFuncaoUC = new SetExecutaFuncaoUC(mySqlExecutaFuncao);

    mySqlExecutaFuncao.items = [
        {
            idFuncionario: 1,
            idServico: 1,
            observacao: "",
            idOSDetalhes: 1
        },
        {
            idFuncionario: 2,
            idServico: 1,
            observacao: "",
            idOSDetalhes: 2
        },
        {
            idFuncionario: 3,
            idServico: 2,
            observacao: "",
            idOSDetalhes: 3
        }
    ];

    it("should be able to set a function execution", () => {
        expect(setExecutaFuncaoUC.execute({idFuncionario: 2, idOSDetalhes: 2, idServico: 1, observacao: "Teste"}).then(() => {
            expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
                if (executaFuncao.idFuncionario == 2 && executaFuncao.idOSDetalhes == 2 && executaFuncao.idServico == 1) {
                    return executaFuncao;
                }
            }).observacao).toBe("Teste");
        }))
    })


    it("should not be able to set a function execution", () => {
        expect(setExecutaFuncaoUC.execute({idFuncionario: null, idOSDetalhes: 2, idServico: 1, observacao: "Teste"})).rejects.toThrow("Campos faltando");
        expect(setExecutaFuncaoUC.execute({idFuncionario: 2, idOSDetalhes: null, idServico: 1, observacao: "Teste"})).rejects.toThrow("Campos faltando");
        expect(setExecutaFuncaoUC.execute({idFuncionario: 2, idOSDetalhes: 2, idServico: null, observacao: "Teste"})).rejects.toThrow("Campos faltando");

        expect(setExecutaFuncaoUC.execute({idFuncionario: 3, idOSDetalhes: 4, idServico: 3, observacao: "Teste"})).rejects.toThrow("O serviço executado a ser alterado não foi encontrado")
    })

})