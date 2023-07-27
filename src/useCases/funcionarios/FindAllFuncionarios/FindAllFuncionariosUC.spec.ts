import { describe, expect, it } from "vitest";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";

describe("Find All Funcionarios", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const findAllFuncionarios = new FindAllFuncionariosUC(mySqlFuncionarios);

    it("should be able to find all employees", () => {
        // Busca todos os funcionários e compara com os dados do banco de dados
        expect(findAllFuncionarios.execute()).resolves.toBe(mySqlFuncionarios.items)
    })

    it("should not be able to find any employee", () => {
        mySqlFuncionarios.items = []

        // Busca todos os funcionários (com a base zerada) e verifica se não houve erros
        expect(findAllFuncionarios.execute()).resolves.toStrictEqual([]);
    })
})