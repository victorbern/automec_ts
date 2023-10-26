import { describe, expect, it } from "vitest";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { FindAllDetalhePagamentoUC } from "./FindAllDetalhePagamentoUC";

describe("Find All Detalhe Pagamento", () => {
    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const findAllDetalhePagamentoUC = new FindAllDetalhePagamentoUC(mySqlDetalhePagamento);

    mySqlDetalhePagamento.items = [
        {
            idDetalhePagamento: 1,
            idOrdemServico: 1,
            idPagamento: 1,
        },
        {
            idDetalhePagamento: 2,
            idOrdemServico: 2,
            idPagamento: 1,
        },
        {
            idDetalhePagamento: 3,
            idOrdemServico: 3,
            idPagamento: 2,
        },
    ];

    it("should be able to find all the detail payments", () => {
        expect(findAllDetalhePagamentoUC.execute({idPagamento: 1})).resolves.toStrictEqual([
            {
                idDetalhePagamento: 1,
                idOrdemServico: 1,
                idPagamento: 1,
            },
            {
                idDetalhePagamento: 2,
                idOrdemServico: 2,
                idPagamento: 1,
            }
        ]);
    });

    it("should not be able to find any detail payment", () => {
        mySqlDetalhePagamento.items = [];
        expect(findAllDetalhePagamentoUC.execute({idPagamento: 1})).resolves.toHaveLength(0);

        expect(findAllDetalhePagamentoUC.execute({idPagamento: null})).rejects.toThrow("Campos faltando");
    })
})