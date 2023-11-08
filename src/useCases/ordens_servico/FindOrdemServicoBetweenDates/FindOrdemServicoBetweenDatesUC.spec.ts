import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesBetweenDatesUC } from "../../OSDetalhes/FindOSDetalhesBetweenDates/FindOSDetalhesBetweenDatesUC";
import { FindOrdemServicoBetweenDatesUC } from "./FindOrdemServicoBetweenDatesUC";

describe("Find Ordem Servico Between Dates", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhesBetweenDates = new FindOSDetalhesBetweenDatesUC(mySqlOSDetalhes);

    const findOrdemServicoBetweenDatesUC = new FindOrdemServicoBetweenDatesUC(mySqlOrdemServico, findOSDetalhesBetweenDates);

    const data1 = new Date(Date.parse("2023-07-01")); // Data anterior aos testes
    const data2 = new Date(Date.parse("2023-08-01")); // Data 'dataDe' usada nos testes
    const data3 = new Date(Date.parse("2023-09-01")); // Data dentro do range de datas
    const data4 = new Date(Date.parse("2023-10-01")); // Data dentro do range de datas
    const data5 = new Date(Date.parse("2023-11-01")); // Data 'dataAte' usada nos testes
    const data6 = new Date(Date.parse("2023-12-01")); // Data posterior aos testes

    mySqlOrdemServico.items = [
        // Ordem 1 (anterior a data testada)
        {
            idOrdemServico: 1,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 2 (exatamente na data testada 'dataDe')
        {
            idOrdemServico: 2,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 3 (dentro do range de datas testadas)
        {
            idOrdemServico: 3,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 4 (dentro do range de datas testadas)
        {
            idOrdemServico: 4,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 5 (exatamente na data testada 'dataAte')
        {
            idOrdemServico: 5,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 6 (posterior a data testada)
        {
            idOrdemServico: 6,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
    ];

    mySqlOSDetalhes.items = [
        // OSDetalhes 1 (anterior a data testada)
        {
            idOSDetalhes: 10,
            dataOS: data1,
            idOrdemServico: 1,
        },
        // OSDetalhes 2 (exatamente na data testada 'dataDe')
        {
            idOSDetalhes: 11,
            dataOS: data2,
            idOrdemServico: 2,
        },
        // OSDetalhes 3 (dentro do range de datas testadas)
        {
            idOSDetalhes: 12,
            dataOS: data3,
            idOrdemServico: 3,
        },
        // OSDetalhes 4 (dentro do range de datas testadas)
        {
            idOSDetalhes: 13,
            dataOS: data4,
            idOrdemServico: 4,
        },
        // OSDetalhes 5 (exatamente na data testada 'dataAte')
        {
            idOSDetalhes: 14,
            dataOS: data5,
            idOrdemServico: 5,
        },
        // OSDetalhes 6 (posterior a data testada)
        {
            idOSDetalhes: 15,
            dataOS: data6,
            idOrdemServico: 6,
        },
    ];

    it("should be able to find all orders", () => {
        let dataDe = new Date(Date.parse("2023-07-01"))
        let dataAte = new Date(Date.parse("2023-12-01"))
        expect(findOrdemServicoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                idOrdemServico: 1,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 10,
                dataOS: data1,
            },
            {
                idOrdemServico: 2,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 11,
                dataOS: data2,
            },
            {
                idOrdemServico: 3,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 12,
                dataOS: data3,
            },
            {
                idOrdemServico: 4,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 13,
                dataOS: data4,
            },
            {
                idOrdemServico: 5,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 14,
                dataOS: data5,
            },
            {
                idOrdemServico: 6,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 15,
                dataOS: data6,
            },
        ]);
    });

    it("should be able to find some orders", () => {
        let dataDe = new Date(Date.parse("2023-08-01"));
        let dataAte = new Date(Date.parse("2023-11-01"));
        expect(findOrdemServicoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                idOrdemServico: 2,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 11,
                dataOS: data2,
            },
            {
                idOrdemServico: 3,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 12,
                dataOS: data3,
            },
            {
                idOrdemServico: 4,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 13,
                dataOS: data4,
            },
            {
                idOrdemServico: 5,
                total: 100,
                km: 2000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "FDP-2912",
                idCliente: 1,
                idOSDetalhes: 14,
                dataOS: data5,
            },
        ]);
    });

    it("should not be able to find any order", () => {
        let dataDe = new Date(Date.parse("2023-04-01"));
        let dataAte = new Date(Date.parse("2023-06-01"));
        expect(findOrdemServicoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);
        dataDe = new Date(Date.parse("2023-12-02"));
        dataAte = new Date(Date.parse("2024-01-01"));
        expect(findOrdemServicoBetweenDatesUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);

        expect(findOrdemServicoBetweenDatesUC.execute({dataDe: null, dataAte: null})).rejects.toThrow("Campos faltando");

    })


})