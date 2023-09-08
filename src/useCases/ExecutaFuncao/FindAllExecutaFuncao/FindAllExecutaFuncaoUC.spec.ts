import { describe, expect, it } from "vitest";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { FindAllExecutaFuncaoUC } from "./FindAllExecutaFuncaoUC";
import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";

describe("Find All ExecutaFuncao", () => {
    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);

    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 2,
        observacao: "",
        idOSDetalhes: 2
    })
    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 3,
        observacao: "",
        idOSDetalhes: 2
    })

    it("should be able to find some services done", () => {
        let executaFuncaoList: ExecutaFuncao[] = [];
        mySqlExecutaFuncao.items.find((executaFuncao) => {
            if (executaFuncao.idOSDetalhes === 2) {
                executaFuncaoList.push(executaFuncao);
            }
        });

        expect(findAllExecutaFuncao.execute({idOSDetalhes: 2})).resolves.toStrictEqual(executaFuncaoList);

        // Verifica se está retornando os dois serviços realizados
        expect(findAllExecutaFuncao.execute({idOSDetalhes: 2})).resolves.toHaveLength(2);
    });

    it("should be able to find just one service done", () => {
        // Apaga o segundo registro do banco e deve retornar apenas um serviço realizado
        mySqlExecutaFuncao.items.pop();

        expect(findAllExecutaFuncao.execute({idOSDetalhes: 2})).resolves.toHaveLength(1);
    });

    it("should not be able to find any service done", () => {
        // Apaga o primeiro registro do banco de dados e não deve encontrar mais nada
        mySqlExecutaFuncao.items.pop();

        expect(findAllExecutaFuncao.execute({idOSDetalhes: 2})).resolves.toHaveLength(0);
    })
})