import { describe, expect, it } from "vitest";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { CreateVendaDiretaUC } from "./CreateVendaDiretaUC";

describe("Create Venda Direta", () => {
    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const createVendaDiretaUC = new CreateVendaDiretaUC(mySqlVendaDireta);

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
            total: 3,
            dataHora: data,
        }
    ];

    it("should be able to create a venda direta", () => {
        expect(createVendaDiretaUC.execute({idPagamento: 3, total: 44, dataHora: data}).then(() => {
            const vendaDireta = mySqlVendaDireta.items.find((vendaDireta) => {
                if (vendaDireta.idVendaDireta == 3) {
                    return vendaDireta;
                }
            });

            expect(vendaDireta.idPagamento).toBe(3);
            expect(vendaDireta.total).toBe(44);
            expect(vendaDireta.dataHora).toBe(data);
        }));

        // Criando Venda Direta sem passar dataHora (a useCase deve pegar a Data/Hora atual neste caso)
        expect(createVendaDiretaUC.execute({idPagamento: 4, total: 45, dataHora: data}).then(() => {
            const vendaDireta = mySqlVendaDireta.items.find((vendaDireta) => {
                if (vendaDireta.idVendaDireta == 4) {
                    return vendaDireta;
                }
            });

            expect(vendaDireta.idPagamento).toBe(4);
            expect(vendaDireta.total).toBe(45);
            expect(vendaDireta.dataHora).toBeInstanceOf(Date);
        }))
    });

    it("should not be able to create a venda direta", () => {
        expect(createVendaDiretaUC.execute({idPagamento: null, total: 30, dataHora: data})).rejects.toThrow("Campos faltando");
    })
})