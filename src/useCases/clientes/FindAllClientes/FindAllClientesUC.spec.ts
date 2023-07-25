import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindAllClientesUC } from "./FindAllClientesUC";

describe("Find All Clientes", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findAllClientes = new FindAllClientesUC(mySqlClientes);

    it("should be able to find all clientes", () => {
        // Busca todos os clientes e compara com os dados do banco de dados
        expect(findAllClientes.execute()).resolves.toBe(mySqlClientes.items);
    });
});
