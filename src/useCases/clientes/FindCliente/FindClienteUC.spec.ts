import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { CreateClienteUC } from "../CreateCliente/CreateClienteUC";
import { FindClienteUC } from "./FindClienteUC";
import { Cliente } from "../../../entities/Cliente";

describe("Find Cliente", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findCliente = new FindClienteUC(mySqlClientes);

    it("should be able to find a client", () => {
        // Busca o cliente com id 1 e compara com o cliente de id 1 que está no banco de dados
        expect(
            findCliente.execute({
                idCliente: 1,
            })
        ).resolves.toBe(
            mySqlClientes.items.find((cliente) => {
                if (cliente.idCliente === 1) {
                    return cliente;
                }
            })
        );
    });
});
