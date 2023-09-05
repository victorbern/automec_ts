import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { CreateExecutaFuncaoUC } from "./CreateExecutaFuncaoUC";

describe("Criar ExecutaFuncao", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository();
    const createExecutaFuncao = new CreateExecutaFuncaoUC(mySqlExecutaFuncao);

    it("should be able to create a ExecutaFuncao", () => {
        expect(createExecutaFuncao.execute({
            idFuncionario: 1,
            idServico: 2,
            observacao: "",
            idOSDetalhes: 1
        })).resolves
    })
})