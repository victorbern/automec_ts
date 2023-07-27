import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";

describe("Find All Veículos", () => {
    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findAllVeiculos = new FindAllVeiculosUC(mySqlVeiculos, findCliente)
    it("should be able to find all vehicles", () => {
        // Busca todos os veículos e verifica se não houve erros
        expect(findAllVeiculos.execute()).resolves
    })

    it("should not be able to find any vehicle", () => {     
        mySqlVeiculos.items = []
        // Busca todos os veiculos (com a base zerada) e verifica se não houve erros
        expect(findAllVeiculos.execute()).resolves.toStrictEqual([])
    })
})