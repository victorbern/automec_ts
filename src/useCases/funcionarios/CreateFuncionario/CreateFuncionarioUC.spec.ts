import { describe, expect, it } from "vitest";
import { CreateFuncionarioUC } from "./CreateFuncionarioUC";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";

describe("Criar Funcionário", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const createFuncionario = new CreateFuncionarioUC(mySqlFuncionarios);

    it("should be able to create a employee", () => {
        // Tenta criar um funcionário
        expect(createFuncionario.execute({
            nomeFuncionario: "Luan",
            isAtivo: "sim",
            funcao: "Mecânico"
        }).then(() => {
            // Verifica se o funcionário foi criado (testando pelo nome do funcionário)
            expect(mySqlFuncionarios.items.find((funcionario) => {
                if (funcionario.idFuncionario === 2) {
                    return funcionario;
                }
            }).nomeFuncionario).toBe("Luan");

            // Verifica se o funcionário foi criado (pelo 'isAtivo' do funcionário)
            expect(mySqlFuncionarios.items.find((funcionario) => {
                if (funcionario.idFuncionario === 2) {
                    return funcionario;
                }
            }).isAtivo).toBe("sim");

            // Verifica se o funcionário foi criado (testando pela função do funcionário)
            expect(mySqlFuncionarios.items.find((funcionario) => {
                if (funcionario.idFuncionario === 2) {
                    return funcionario;
                }
            }).funcao).toBe("Mecânico");

        })).resolves
        
    })

    it("should not be able to create a employee", () => {
        // Tenta criar um usuário sem um nome
        expect(createFuncionario.execute({
            nomeFuncionario: "",
            isAtivo: "true",
            funcao: "Mecânico"
        })).rejects.toThrow('There are missing fields');

        // Tenta criar um funcionário sem um isAtivo
        expect(createFuncionario.execute({
            nomeFuncionario: "Luan",
            isAtivo: "",
            funcao: "Mecânico"
        })).rejects.toThrow('There are missing fields');

        // Tenta criar um funcionário sem uma função
        expect(createFuncionario.execute({
            nomeFuncionario: "Luan",
            isAtivo: "true",
            funcao: ""
        })).rejects.toThrow('There are missing fields')

        // Tenta criar um funcionário com um 'isAtivo' inválido
        expect(createFuncionario.execute({
            nomeFuncionario: "Luan",
            isAtivo: "true",
            funcao: "não"
        })).rejects.toThrow(`O campo 'isAtivo' deve ser 'sim' ou 'nao'`)
    })
})