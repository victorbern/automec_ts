import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { FindAllServicosUC } from "./FindAllServicosUC";
import { Servico } from "../../../entities/Servico";

describe("Find All Servicos", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const findAllServicos = new FindAllServicosUC(mySqlServicos);

    // Limpa o banco de dados para teste
    mySqlServicos.items = [];

    // Insere alguns serviços no banco de dados para teste
    mySqlServicos.items.push({
        idServico: 2,
        descricaoServico: "Troca de Oleo",
        precoServico: 20,
    })

    mySqlServicos.items.push({
        idServico: 3,
        descricaoServico: "Limpeza do motor",
        precoServico: 20,
    })

    mySqlServicos.items.push({
        idServico: 4,
        descricaoServico: "Limpeza de disco",
        precoServico: 20,
    })

    it("should be able to find all services without using filter", () => {
        // Busca todos os funcionários e compara com os dados do banco de dados
        expect(findAllServicos.execute({ filtro: null })).resolves.toBe(mySqlServicos.items);
        expect(findAllServicos.execute({})).resolves.toHaveLength(3);
    })

    it("should be able to find some services using filter", () => {
        // Testando o filtro pela descrição do serviço
        expect(findAllServicos.execute({ filtro: "Limpeza" })).resolves.toStrictEqual(
            [
                {
                    idServico: 3,
                    descricaoServico: "Limpeza do motor",
                    precoServico: 20,
                },
                {
                    idServico: 4,
                    descricaoServico: "Limpeza de disco",
                    precoServico: 20,
                }
            ]
        )
    })

    it("should not be able to find any service using filter", () => {
        // Testando a busca de todos os serviços com um filtro que não existe
        expect(findAllServicos.execute({ filtro: "Alinhamento" })).resolves.toHaveLength(0);
    })

    it("should not be able to find any service without using filter", () => {
        mySqlServicos.items = [];

        // Busca todos os serviços (com a base zerada) e verifica se não houve erros
        expect(findAllServicos.execute({ filtro: null })).resolves.toStrictEqual([]);
    })
})