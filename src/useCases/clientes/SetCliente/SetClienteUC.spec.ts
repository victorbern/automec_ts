import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { SetClienteUC } from "./SetClienteUC";

describe("Set Cliente", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const setCliente = new SetClienteUC(mySqlClientes);

    it("should be able to set a client", () => {
        // Cria um cliente que será usado como teste para editar seus dados
        mySqlClientes.items.push({
            idCliente: 2,
            nomeCliente: "Luis",
            cpfCnpj: "165.369.698-56",
            celularCliente: "11953014839",
            telefoneCliente: "40364930",
            cep: "12970-000",
            endereco: "Rua 1",
            numero: "44",
            bairro: "Jd San Marino",
            cidade: "Piracaia",
            uf: "SP",
            complemento: "",
        });

        // Tenta alterar os dados do cliente que acabamos de criar
        expect(
            setCliente
                .execute({
                    idCliente: 2,
                    nomeCliente: "Victor",
                    cpfCnpj: "165.369.698-56",
                    celularCliente: "11953014839",
                    telefoneCliente: "40364930",
                    cep: "12970-000",
                    endereco: "Rua 1",
                    numero: "44",
                    bairro: "Jd San Marino",
                    cidade: "Piracaia",
                    uf: "SP",
                    complemento: "",
                })
                .then(() => {
                    // Verifica através do nome se os dados do cliente foram alteradoss
                    expect(
                        mySqlClientes.items.find((cliente) => {
                            if (cliente.idCliente === 2) {
                                return cliente;
                            }
                        }).nomeCliente
                    ).toBe("Victor");
                })
        ).resolves;
    });

    it("should not be able to set a client", () => {
        // Tenta alterar os dados de cliente sem passar um id
        expect(
            setCliente.execute({
                idCliente: null,
                nomeCliente: "Victor",
                cpfCnpj: "165.369.698-56",
                celularCliente: "11953014839",
                telefoneCliente: "40364930",
                cep: "12970-000",
                endereco: "Rua 1",
                numero: "44",
                bairro: "Jd San Marino",
                cidade: "Piracaia",
                uf: "SP",
                complemento: "",
            })
        ).rejects.toThrow("Campos faltando");

        // Tenta alterar os dados de cliente sem passar um nome
        expect(
            setCliente.execute({
                idCliente: 2,
                nomeCliente: "",
                cpfCnpj: "165.369.698-56",
                celularCliente: "11953014839",
                telefoneCliente: "40364930",
                cep: "12970-000",
                endereco: "Rua 1",
                numero: "44",
                bairro: "Jd San Marino",
                cidade: "Piracaia",
                uf: "SP",
                complemento: "",
            })
        ).rejects.toThrow("Campos faltando");

        // Tenta alterar os dados de cliente sem passar um cpf/cnpj
        expect(
            setCliente.execute({
                idCliente: 2,
                nomeCliente: "Victor",
                cpfCnpj: "",
                celularCliente: "11953014839",
                telefoneCliente: "40364930",
                cep: "12970-000",
                endereco: "Rua 1",
                numero: "44",
                bairro: "Jd San Marino",
                cidade: "Piracaia",
                uf: "SP",
                complemento: "",
            })
        ).rejects.toThrow("Campos faltando");

        // Tenta alterar os dados de cliente sem passar um número de celular
        expect(
            setCliente.execute({
                idCliente: 2,
                nomeCliente: "Victor",
                cpfCnpj: "165.369.698-56",
                celularCliente: "",
                telefoneCliente: "40364930",
                cep: "12970-000",
                endereco: "Rua 1",
                numero: "44",
                bairro: "Jd San Marino",
                cidade: "Piracaia",
                uf: "SP",
                complemento: "",
            })
        ).rejects.toThrow("Campos faltando");

        // Tenta alterar os dados de um cliente que não existe
        expect(
            setCliente.execute({
                idCliente: 3,
                nomeCliente: "Victor",
                cpfCnpj: "165.369.698-56",
                celularCliente: "11953014839",
                telefoneCliente: "40364930",
                cep: "12970-000",
                endereco: "Rua 1",
                numero: "44",
                bairro: "Jd San Marino",
                cidade: "Piracaia",
                uf: "SP",
                complemento: "",
            })
        ).rejects.toThrow("Cliente não encontrado");
    });
});
