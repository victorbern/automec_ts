import { describe, expect, it } from "vitest";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { DelDetalhePagamentoUC } from "./DelDetalhePagamentoUC";

describe("Del DetalhePagamento", () => {
    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const delDetalhePagamentoUC = new DelDetalhePagamentoUC(mySqlDetalhePagamento);

    mySqlDetalhePagamento.items = [
        {
            idDetalhePagamento: 1,
            idOrdemServico: 1,
            idPagamento: 1,
        },
        {
            idDetalhePagamento: 2,
            idOrdemServico: 2,
            idPagamento: 2,
        },
    ];

    it("should be able to delete a payment", () => {
        expect(delDetalhePagamentoUC.execute({idDetalhePagamento: 1}).then(() => {
            expect(mySqlDetalhePagamento.items.find((detalhePagamento) => {
                if (detalhePagamento.idDetalhePagamento == 1) {
                    return detalhePagamento;
                }
            })).toBe(undefined);
        }));
    });

    it("should not be able to delete a payment", () => {
        expect(delDetalhePagamentoUC.execute({idDetalhePagamento: null})).rejects.toThrow("Campos faltando");
    });
})