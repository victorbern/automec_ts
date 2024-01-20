import { describe, expect, it } from "vitest";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";

describe("Find All Funcionarios", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const findAllFuncionarios = new FindAllFuncionariosUC(mySqlFuncionarios);
    // Limpa a base de dados para fazer os testes
    mySqlFuncionarios.items = [];

    // Insere alguns funcionários no banco de dados para teste
    mySqlFuncionarios.items.push({
        idFuncionario: 2,
        nomeFuncionario: "Luis",
        isAtivo: "true",
        funcao: "Mecânico",
    })

    mySqlFuncionarios.items.push({
        idFuncionario: 3,
        nomeFuncionario: "Andre",
        isAtivo: "true",
        funcao: "Limpador",
    })

    mySqlFuncionarios.items.push({
        idFuncionario: 4,
        nomeFuncionario: "Andreia",
        isAtivo: "true",
        funcao: "Mecânico",
    })
    it("should be able to find all employees without using filter", () => {
        // Busca todos os funcionários e compara com os dados do banco de dados
        expect(findAllFuncionarios.execute({ filtro: null })).resolves.toBe(mySqlFuncionarios.items)
        expect(findAllFuncionarios.execute({})).resolves.toHaveLength(3);
    })

    it("should be able to find some employees using filter", () => {
        // Testando filtro pelo nome
        expect(findAllFuncionarios.execute({ filtro: "Andre" })).resolves.toStrictEqual(
            [
                {
                    idFuncionario: 3,
                    nomeFuncionario: "Andre",
                    isAtivo: "true",
                    funcao: "Limpador",
                },
                {
                    idFuncionario: 4,
                    nomeFuncionario: "Andreia",
                    isAtivo: "true",
                    funcao: "Mecânico",
                }
            ]
        );

        // Testando filtro pela função
        expect(findAllFuncionarios.execute({ filtro: "Mec" })).resolves.toStrictEqual(
            [
                {
                    idFuncionario: 2,
                    nomeFuncionario: "Luis",
                    isAtivo: "true",
                    funcao: "Mecânico",
                },
                {
                    idFuncionario: 4,
                    nomeFuncionario: "Andreia",
                    isAtivo: "true",
                    funcao: "Mecânico",
                }
            ]
        );
    })

    it("should not be able to find any employee using filter", () => {
        // Testando a busca de todos os funcionários com um filtro que não existe
        expect(findAllFuncionarios.execute({ filtro: "Trocador" })).resolves.toHaveLength(0);
    })

    it("should not be able to find any employee without using filter", () => {
        mySqlFuncionarios.items = []

        // Busca todos os funcionários (com a base zerada) e verifica se não houve erros
        expect(findAllFuncionarios.execute({ filtro: null })).resolves.toStrictEqual([]);
    })
})