import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { FindAllServicosUC } from "./FindAllServicosUC";

describe("Find All Servicos", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const findAllServicos = new FindAllServicosUC(mySqlServicos);

    it("should be able to find all services", () => {
        // Busca todos os funcionários e compara com os dados do banco de dados
        expect(findAllServicos.execute({filtro: null})).resolves.toBe(mySqlServicos.items);
    })

    it("should not be able to find any service", () => {
        mySqlServicos.items = [];

        // Busca todos os serviços (com a base zerada) e verifica se não houve erros
        expect(findAllServicos.execute({filtro: null})).resolves.toStrictEqual([]);
    })
})