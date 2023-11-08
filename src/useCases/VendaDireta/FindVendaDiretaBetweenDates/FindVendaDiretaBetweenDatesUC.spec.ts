import { describe, expect, it } from "vitest";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { FindVendaDiretaBetweenDatesUC } from "./FindVendaDiretaBetweenDatesUC";

describe("Find Venda Direta Between Dates", () => {
    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const findVendaDiretaBetweenDatesUC = new FindVendaDiretaBetweenDatesUC(mySqlVendaDireta);

    const data1 = new Date(Date.parse("2023-07-01")); // Data anterior aos testes
    const data2 = new Date(Date.parse("2023-08-01")); // Data 'dataDe' usada nos testes
    const data3 = new Date(Date.parse("2023-09-01")); // Data dentro do range de datas
    const data4 = new Date(Date.parse("2023-10-01")); // Data dentro do range de datas
    const data5 = new Date(Date.parse("2023-11-01")); // Data 'dataAte' usada nos testes
    const data6 = new Date(Date.parse("2023-12-01")); // Data posterior aos testes

    mySqlVendaDireta.items = [
        {
            idVendaDireta: 1,
            idPagamento: 10,
            total: 100,
            dataHora: data1,
        },
        {
            idVendaDireta: 2,
            idPagamento: 11,
            total: 200,
            dataHora: data2,
        },
        {
            idVendaDireta: 3,
            idPagamento: 12,
            total: 21,
            dataHora: data3,
        },
        {
            idVendaDireta: 4,
            idPagamento: 13,
            total: 10,
            dataHora: data4,
        },
        {
            idVendaDireta: 5,
            idPagamento: 14,
            total: 15,
            dataHora: data5,
        },
        {
            idVendaDireta: 6,
            idPagamento: 15,
            total: 25,
            dataHora: data6,
        },
    ];

    it("should be able to find all VendaDireta", () => {
        let dataDe = new Date(Date.parse("2023-05-01"));
        let dataAte = new Date(Date.parse("2023-12-01"));
        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toStrictEqual([
            {
                idVendaDireta: 1,
                idPagamento: 10,
                total: 100,
                dataHora: data1,
            },
            {
                idVendaDireta: 2,
                idPagamento: 11,
                total: 200,
                dataHora: data2,
            },
            {
                idVendaDireta: 3,
                idPagamento: 12,
                total: 21,
                dataHora: data3,
            },
            {
                idVendaDireta: 4,
                idPagamento: 13,
                total: 10,
                dataHora: data4,
            },
            {
                idVendaDireta: 5,
                idPagamento: 14,
                total: 15,
                dataHora: data5,
            },
            {
                idVendaDireta: 6,
                idPagamento: 15,
                total: 25,
                dataHora: data6,
            },
        ]);
    });

    it("should be able to find some VendaDireta", () => {
        let dataDe = new Date(Date.parse("2023-08-01"));
        let dataAte = new Date(Date.parse("2023-11-01"));
        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toStrictEqual([
            {
                idVendaDireta: 2,
                idPagamento: 11,
                total: 200,
                dataHora: data2,
            },
            {
                idVendaDireta: 3,
                idPagamento: 12,
                total: 21,
                dataHora: data3,
            },
            {
                idVendaDireta: 4,
                idPagamento: 13,
                total: 10,
                dataHora: data4,
            },
            {
                idVendaDireta: 5,
                idPagamento: 14,
                total: 15,
                dataHora: data5,
            },
        ]);
    });

    it("should not be able to find any VendaDireta", () => {
        let dataDe = new Date(Date.parse("2023-05-01"));
        let dataAte = new Date(Date.parse("2023-06-30"));

        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toHaveLength(0);

        dataDe = new Date(Date.parse("2023-12-02"));
        dataAte = new Date(Date.parse("2024-01-01"));

        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe, dataAte })).resolves.toHaveLength(0);

        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe: null, dataAte })).rejects.toThrow("Campos faltando");
        expect(findVendaDiretaBetweenDatesUC.execute({ dataDe, dataAte: null })).rejects.toThrow("Campos faltando");
    })
})