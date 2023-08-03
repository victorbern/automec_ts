import { describe, expect, it } from "vitest";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { SetFuncionarioUC } from "./SetFuncionarioUC";

describe("Set Funcionário", () => {
    const mySqlFuncionarios = new InMemoryFuncionariosRepository();
    const setFuncionario = new SetFuncionarioUC(mySqlFuncionarios);

    it("should be able to set a employee", () => {
        // Cria um funcionário que será usado como teste para editar seus dados
        mySqlFuncionarios.items.push({
            idFuncionario: 2,
            nomeFuncionario: "Luan",
            isAtivo: "sim",
            funcao: "Mecânico",
        });

        // Tenta alterar os dados do funcionário que acabamos de criar
        expect(
            setFuncionario
                .execute({
                    idFuncionario: 2,
                    nomeFuncionario: "Manuel",
                    isAtivo: "sim",
                    funcao: "Mecânico",
                })
                .then(() => {
                    // Verifica através do nome se os dados do funcionário foram alterados
                    expect(
                        mySqlFuncionarios.items.find((funcionario) => {
                            if (funcionario.idFuncionario === 2) {
                                return funcionario;
                            }
                        }).nomeFuncionario
                    ).toBe("Manuel");
                })
        ).resolves;
    });

    it("should not be able to set a employee", () => {
        // Tenta alterar os dados de funcionário sem passar um id
        expect(
            setFuncionario.execute({
                idFuncionario: null,
                nomeFuncionario: "Manuel",
                isAtivo: "sim",
                funcao: "Mecânico",
            })
        ).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de funcionário sem passar um nome
        expect(setFuncionario.execute({
            idFuncionario: 2,
            nomeFuncionario: "",
            isAtivo: "sim",
            funcao: "Mecânico",
        })).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de funcionário sem passar um isAtivo
        expect(setFuncionario.execute({
            idFuncionario: 2,
            nomeFuncionario: "Luan",
            isAtivo: "",
            funcao: "Mecânico",
        })).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de funcionário sem passar uma função
        expect(setFuncionario.execute({
            idFuncionario: 2,
            nomeFuncionario: "Luan",
            isAtivo: "sim",
            funcao: "",
        })).rejects.toThrow('Campos faltando')

        // Tenta alterar os dados de funcionario passando um isAtivo inválido
        expect(setFuncionario.execute({
            idFuncionario: 2,
            nomeFuncionario: "Luan",
            isAtivo: "true",
            funcao: "Mecânico"
        })).rejects.toThrow(`O campo 'isAtivo' deve ser 'sim' ou 'nao'`)

        // Tenta alterar os dados de um funcionário que não existe
        expect(setFuncionario.execute({
            idFuncionario: 3,
            nomeFuncionario: "Luan",
            isAtivo: "sim",
            funcao: "Mecânico",
        })).rejects.toThrow('Funcionário não encontrado')
    });
});
