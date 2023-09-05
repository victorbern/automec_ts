import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindAllClientesUC } from "./FindAllClientesUC";

describe("Find All Clientes", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findAllClientes = new FindAllClientesUC(mySqlClientes);

    it("should be able to find all clientes", () => {
        // Busca todos os clientes e compara com os dados do banco de dados
        expect(findAllClientes.execute({filtro: null})).resolves.toBe(mySqlClientes.items);
    });

    it("should not be able to find any client", () => {
        mySqlClientes.items = []

        // Busca todos os clientes (com a base zerada) e verifica se não houve erros
        expect(findAllClientes.execute({filtro: null})).resolves.toStrictEqual([]);
    })
});
