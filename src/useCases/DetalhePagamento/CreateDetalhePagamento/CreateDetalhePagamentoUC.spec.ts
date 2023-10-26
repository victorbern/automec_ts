import { describe, expect, it } from "vitest";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { CreateDetalhePagamentoUC } from "./CreateDetalhePagamentoUC";

describe("Create DetalhePagamento", () => {
    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const createDetalhePagamentoUC = new CreateDetalhePagamentoUC(mySqlDetalhePagamento);

    mySqlDetalhePagamento.items = [];
    it("should be able to create a payment detail", () => {
        expect(createDetalhePagamentoUC.execute({idOrdemServico: 2, idPagamento: 2}).then(() => {
            expect(mySqlDetalhePagamento.items.find((detalhePagamento) => {
                if (detalhePagamento.idOrdemServico == 2 && detalhePagamento.idPagamento == 2) {
                    return detalhePagamento;
                }
            }).idDetalhePagamento).toBe(1);
        })).resolves;
    });

    it("should not be able to create a detail payment", () => {
        expect(createDetalhePagamentoUC.execute({idOrdemServico: null, idPagamento: 3})).rejects.toThrow("Campos faltando");
        expect(createDetalhePagamentoUC.execute({idOrdemServico: 3, idPagamento: null})).rejects.toThrow("Campos faltando");
    })
})