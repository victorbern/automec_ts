import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { CreateClienteUC } from "../CreateCliente/CreateClienteUC";
import { FindClienteUC } from "./FindClienteUC";
import { Cliente } from "../../../entities/Cliente";

describe("Find Cliente", () => {
    const mySql = new InMemoryClientesRepository;
    const createCliente = new CreateClienteUC(mySql)
    const findCliente = new FindClienteUC(mySql);

    it("should be able to find a client", () => {
        expect(findCliente.execute({
            idCliente: 1
        })).resolves
    })
})