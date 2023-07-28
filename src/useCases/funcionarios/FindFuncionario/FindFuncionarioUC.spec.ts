import { describe, expect, it } from "vitest";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { FindFuncionarioUC } from "./FindFuncionarioUC";

describe("Find Funcionário", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository();
    const findFuncionario = new FindFuncionarioUC(mySqlFuncionarios);

    mySqlFuncionarios.items.push({
        idFuncionario: 2,
        nomeFuncionario: "Luan",
        isAtivo: "sim",
        funcao: "Mecânico",
    });

    it("should be able to find a employee", () => {
        // Tenta procurar um funcionário específico no banco de dados
        expect(findFuncionario.execute({ idFuncionario: 2 })).resolves.toBe(
            mySqlFuncionarios.items.find((funcionario) => {
                if (funcionario.idFuncionario === 2) {
                    return funcionario;
                }
            })
        );
    });

    it("should not be able to find a employee", () => {
        // Apaga o último funcionário salvo no banco
        mySqlFuncionarios.items.pop();
        // Tenta buscar pelo funcionário deletado (deve retornar null)
        expect(findFuncionario.execute({idFuncionario: 2})).resolves.toBeNull();
    })
});
