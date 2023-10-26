import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { FindExecutaFuncaoUC } from "./FindExecutaFuncaoUC";

describe("Find Executa Função", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findExecutaFuncaoUC = new FindExecutaFuncaoUC(mySqlExecutaFuncao);

    mySqlExecutaFuncao.items = [
        {
            idFuncionario: 1,
            idServico: 1,
            observacao: "",
            idOSDetalhes: 1
        },
        {
            idFuncionario: 2,
            idServico: 2,
            observacao: "nenhuma",
            idOSDetalhes: 2
        },
        {
            idFuncionario: 3,
            idServico: 3,
            observacao: "",
            idOSDetalhes: 3
        },
    ];

    it("should be able find a function execution", () => {
        expect(findExecutaFuncaoUC.execute({ idFuncionario: 2, idOSDetalhes: 2, idServico: 2 })).resolves.toStrictEqual({
            idFuncionario: 2,
            idServico: 2,
            observacao: "nenhuma",
            idOSDetalhes: 2
        });
    });

    it("should not be able to find any funcion execution", () => {
        expect(findExecutaFuncaoUC.execute({ idFuncionario: 4, idOSDetalhes: 4, idServico: 4 })).resolves.toBeNull();
        expect(findExecutaFuncaoUC.execute({ idFuncionario: null, idOSDetalhes: 2, idServico: 2 })).rejects.toThrow("Campos faltando");
        expect(findExecutaFuncaoUC.execute({ idFuncionario: 2, idOSDetalhes: null, idServico: 2 })).rejects.toThrow("Campos faltando");
        expect(findExecutaFuncaoUC.execute({ idFuncionario: 2, idOSDetalhes: 2, idServico: null })).rejects.toThrow("Campos faltando");
    });
})