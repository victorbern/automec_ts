import { describe, expect, it } from "vitest";
import { InMemoryPagamentosRepository } from "../../../repositories/in-memory/in-memory-PagamentosRepository";
import { FindPagamentosBetweenDatesUC } from "./FindPagamentosBetweenDatesUC";

describe("Find Pagamento Between Dates", () => {
    const mySqlPagamentos = new InMemoryPagamentosRepository;
    const findPagamentoBetweenDatesUC = new FindPagamentosBetweenDatesUC(mySqlPagamentos);

    const data1 = new Date(Date.parse("2023-07-01")); // Data anterior aos testes
    const data2 = new Date(Date.parse("2023-08-01")); // Data 'dataDe' usada nos testes
    const data3 = new Date(Date.parse("2023-09-01")); // Data dentro do range de datas
    const data4 = new Date(Date.parse("2023-10-01")); // Data dentro do range de datas
    const data5 = new Date(Date.parse("2023-11-01")); // Data 'dataAte' usada nos testes
    const data6 = new Date(Date.parse("2023-12-01")); // Data posterior aos testes

    mySqlPagamentos.items = [
        {
            idPagamento: 1,
            dataHora: data1,
            subtotal: 233,
            total: 232,
            desconto: 1,
            formaPagamento: "Cartão de Crédito",
        },
        {
            idPagamento: 2,
            dataHora: data2,
            subtotal: 1231,
            total: 1181,
            desconto: 50,
            formaPagamento: "Cartão de Débito",
        },
        {
            idPagamento: 3,
            dataHora: data3,
            subtotal: 3000,
            total: 3000,
            desconto: 0,
            formaPagamento: "Cartão de Débito",
        },
        {
            idPagamento: 4,
            dataHora: data4,
            subtotal: 200,
            total: 100,
            desconto: 100,
            formaPagamento: "Cartão de Crédito",
        },
        {
            idPagamento: 5,
            dataHora: data5,
            subtotal: 15,
            total: 15,
            desconto: 0,
            formaPagamento: "Pix",
        },
        {
            idPagamento: 6,
            dataHora: data6,
            subtotal: 20,
            total: 20,
            desconto: 0,
            formaPagamento: "Pix",
        }
    ]

    it("should be able to find all payments", () => {
        let dataDe = new Date(Date.parse("2023-06-01"));
        let dataAte = new Date(Date.parse("2023-12-12"));
        expect(findPagamentoBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toStrictEqual([
            {
                idPagamento: 1,
                dataHora: data1,
                subtotal: 233,
                total: 232,
                desconto: 1,
                formaPagamento: "Cartão de Crédito",
            },
            {
                idPagamento: 2,
                dataHora: data2,
                subtotal: 1231,
                total: 1181,
                desconto: 50,
                formaPagamento: "Cartão de Débito",
            },
            {
                idPagamento: 3,
                dataHora: data3,
                subtotal: 3000,
                total: 3000,
                desconto: 0,
                formaPagamento: "Cartão de Débito",
            },
            {
                idPagamento: 4,
                dataHora: data4,
                subtotal: 200,
                total: 100,
                desconto: 100,
                formaPagamento: "Cartão de Crédito",
            },
            {
                idPagamento: 5,
                dataHora: data5,
                subtotal: 15,
                total: 15,
                desconto: 0,
                formaPagamento: "Pix",
            },
            {
                idPagamento: 6,
                dataHora: data6,
                subtotal: 20,
                total: 20,
                desconto: 0,
                formaPagamento: "Pix",
            }
        ])
    });

    it("should be able to find some payments", () => {
        let dataDe = new Date(Date.parse("2023-08-01"));
        let dataAte = new Date(Date.parse("2023-11-01"));
        expect(findPagamentoBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toStrictEqual([
            {
                idPagamento: 2,
                dataHora: data2,
                subtotal: 1231,
                total: 1181,
                desconto: 50,
                formaPagamento: "Cartão de Débito",
            },
            {
                idPagamento: 3,
                dataHora: data3,
                subtotal: 3000,
                total: 3000,
                desconto: 0,
                formaPagamento: "Cartão de Débito",
            },
            {
                idPagamento: 4,
                dataHora: data4,
                subtotal: 200,
                total: 100,
                desconto: 100,
                formaPagamento: "Cartão de Crédito",
            },
            {
                idPagamento: 5,
                dataHora: data5,
                subtotal: 15,
                total: 15,
                desconto: 0,
                formaPagamento: "Pix",
            },
        ]);
    });

    it("should not be able to find any payment", () => {
        let dataDe = new Date(Date.parse("2023-05-01"));
        let dataAte = new Date(Date.parse("2023-06-30"));
        expect(findPagamentoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);
        dataDe = new Date(Date.parse("2023-12-02"));
        dataAte = new Date(Date.parse("2024-01-01"));
        expect(findPagamentoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);
        
        expect(findPagamentoBetweenDatesUC.execute({dataDe: null, dataAte})).rejects.toThrow("Campos faltando");
        expect(findPagamentoBetweenDatesUC.execute({dataDe, dataAte: null})).rejects.toThrow("Campos faltando");
    })
});