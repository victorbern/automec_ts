import { describe, expect, it } from "vitest";
import { DelFuncionarioUC } from "./DelFuncionarioUC";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";

describe("Delete a employee", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const delFuncionarioUC = new DelFuncionarioUC(mySqlFuncionarios);

    // Cria um funcionário para testes
    mySqlFuncionarios.items.push({
        idFuncionario: 2,
        nomeFuncionario: "Luis",
        isAtivo: "true",
        funcao: "Mecanico"
    })

    it("should be able to delete a employee", () => {
        // Tenta deletar o funcionário recém criado
        expect(delFuncionarioUC.execute({idFuncionario: 2}).then(() => {
            expect(mySqlFuncionarios.items.find((funcionario) => {
                if (funcionario.idFuncionario === 2) {
                    return funcionario;
                }
            })).toBe(undefined);
        })).resolves
    });

    it("should not be able to delete a employee", () => {
        // Tenta deletar um funcionário passando um id nulo
        expect(delFuncionarioUC.execute({idFuncionario: null})).rejects.toThrow("Campos faltando")

        // Tenta deletar um funcionário que não existe
        expect(delFuncionarioUC.execute({idFuncionario: 3})).rejects.toThrow("Funcionário não encontrado")
        
    })
});