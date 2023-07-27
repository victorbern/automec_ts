import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "./FindClienteUC";

describe("Find Cliente", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findCliente = new FindClienteUC(mySqlClientes);

    // Cria um cliente no banco de dados para teste
    mySqlClientes.items.push({
        idCliente: 2,
        nomeCliente: "Andre",
        cpfCnpj: "156.154.125-12",
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
    it("should be able to find a client", () => {
        // Busca o cliente com id 2 e compara com o cliente de id 2 que está no banco de dados
        expect(
            findCliente.execute({
                idCliente: 2,
            })
        ).resolves.toBe(
            mySqlClientes.items.find((cliente) => {
                if (cliente.idCliente === 2) {
                    return cliente;
                }
            })
        );
    });
    it("should not be able to find a client", () => {
        // Apaga o último cliente salvo no banco
        mySqlClientes.items.pop()
        // Tenta buscar pelo cliente deletado (deve retornar null)
        expect(findCliente.execute({idCliente: 2})).resolves.toBeNull()
    })
});
