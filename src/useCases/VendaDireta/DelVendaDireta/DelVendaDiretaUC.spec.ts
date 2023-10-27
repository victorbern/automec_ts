import { describe, expect, it } from "vitest";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { DelVendaDiretaUC } from "./DelVendaDiretaUC";

describe("Del Venda Direta", () => {
    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const delVendaDiretaUC = new DelVendaDiretaUC(mySqlVendaDireta);

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
        },
    ];

    it("should be able to delete a Venda Direta", () => {
        expect(delVendaDiretaUC.execute({idVendaDireta: 2}).then(() => {
            expect(mySqlVendaDireta.items.find((vendaDireta) => {
                if (vendaDireta.idVendaDireta == 2) {
                    return vendaDireta;
                }
            })).toBe(undefined);
        })).resolves;
    });

    it("should not be able to delete a VendaDireta", () => {
        expect(delVendaDiretaUC.execute({idVendaDireta: null})).rejects.toThrow("Campos faltando");
    })
})