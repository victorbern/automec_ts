import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesBetweenDatesUC } from "./FindOSDetalhesBetweenDatesUC";

describe("Find OSDetalhes Between Dates", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhesBetweenDatesUC = new FindOSDetalhesBetweenDatesUC(mySqlOSDetalhes);

    const data1 = new Date(Date.parse("2023-07-01")); // Data anterior aos testes
    const data2 = new Date(Date.parse("2023-08-01")); // Data 'dataDe' usada nos testes
    const data3 = new Date(Date.parse("2023-09-01")); // Data dentro do range de datas
    const data4 = new Date(Date.parse("2023-10-01")); // Data dentro do range de datas
    const data5 = new Date(Date.parse("2023-11-01")); // Data 'dataAte' usada nos testes
    const data6 = new Date(Date.parse("2023-12-01")); // Data posterior aos testes

    mySqlOSDetalhes.items = [
        // OSDetalhes 1 (anterior a data testada)
        {
            idOSDetalhes: 1,
            dataOS: data1,
            idOrdemServico: 1,
        },
        // OSDetalhes 2 (exatamente na data testada 'dataDe')
        {
            idOSDetalhes: 2,
            dataOS: data2,
            idOrdemServico: 2,
        },
        // OSDetalhes 3 (dentro do range de datas testadas)
        {
            idOSDetalhes: 3,
            dataOS: data3,
            idOrdemServico: 3,
        },
        // OSDetalhes 4 (dentro do range de datas testadas)
        {
            idOSDetalhes: 4,
            dataOS: data4,
            idOrdemServico: 4,
        },
        // OSDetalhes 5 (exatamente na data testada 'dataAte')
        {
            idOSDetalhes: 5,
            dataOS: data5,
            idOrdemServico: 5,
        },
        // OSDetalhes 6 (posterior a data testada)
        {
            idOSDetalhes: 6,
            dataOS: data6,
            idOrdemServico: 6,
        },
    ];

    it("should be able to find all osDetalhes", () => {
        let dataDe = new Date(Date.parse("2023-07-01"));
        let dataAte = new Date(Date.parse("2023-12-01"))
        expect(findOSDetalhesBetweenDatesUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                idOSDetalhes: 1,
                dataOS: data1,
                idOrdemServico: 1,
            },
            {
                idOSDetalhes: 2,
                dataOS: data2,
                idOrdemServico: 2,
            },
            {
                idOSDetalhes: 3,
                dataOS: data3,
                idOrdemServico: 3,
            },
            {
                idOSDetalhes: 4,
                dataOS: data4,
                idOrdemServico: 4,
            },
            {
                idOSDetalhes: 5,
                dataOS: data5,
                idOrdemServico: 5,
            },
            {
                idOSDetalhes: 6,
                dataOS: data6,
                idOrdemServico: 6,
            },
        ]);
    });

    it("should be able to find some osDetalhes", () => {
        let dataDe = new Date(Date.parse("2023-08-01"));
        let dataAte = new Date(Date.parse("2023-11-01"));
        expect(findOSDetalhesBetweenDatesUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                idOSDetalhes: 2,
                dataOS: data2,
                idOrdemServico: 2,
            },
            {
                idOSDetalhes: 3,
                dataOS: data3,
                idOrdemServico: 3,
            },
            {
                idOSDetalhes: 4,
                dataOS: data4,
                idOrdemServico: 4,
            },
            {
                idOSDetalhes: 5,
                dataOS: data5,
                idOrdemServico: 5,
            },
        ]);
    });

    it("should not be able to find any osDetalhes", () => {
        let dataDe = new Date(Date.parse("2023-05-01"));
        let dataAte = new Date(Date.parse("2023-06-30"));
        expect(findOSDetalhesBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);
        dataDe = new Date(Date.parse("2023-12-02"));
        dataAte = new Date(Date.parse("2024-01-01"));
        expect(findOSDetalhesBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);

        expect(findOSDetalhesBetweenDatesUC.execute({dataDe: null, dataAte: null})).rejects.toThrow("Campos faltando");
    })
});