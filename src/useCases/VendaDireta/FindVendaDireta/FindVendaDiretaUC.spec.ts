import { describe, expect, it } from "vitest";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { FindVendaDiretaUC } from "./FindVendaDiretaUC";

describe("Find Venda Direta", () => {
    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const findVendaDiretaUC = new FindVendaDiretaUC(mySqlVendaDireta);

    const data = new Date(Date.now());

    mySqlVendaDireta.items = [
        {
            idVendaDireta: 1,
            idPagamento: 1,
            total: 1,
            dataHora: data,
        },
        {
            idVendaDireta: 2,
            idPagamento: 2,
            total: 44,
            dataHora: data,
        }
    ];

    it("should be able to find a Venda Direta", () => {
        expect(findVendaDiretaUC.execute({idPagamento: 2})).resolves.toStrictEqual({
            idVendaDireta: 2,
            idPagamento: 2,
            total: 44,
            dataHora: data,
        });
    });

    it("should not be able to find any Venda Direta", () => {
        expect(findVendaDiretaUC.execute({idPagamento: null})).rejects.toThrow("Campos faltando");

        // Tenta buscar uma venda direta inexistente ou de um pagamento que não existe
        expect(findVendaDiretaUC.execute({idPagamento: 3})).resolves.toBeNull();
    })
})