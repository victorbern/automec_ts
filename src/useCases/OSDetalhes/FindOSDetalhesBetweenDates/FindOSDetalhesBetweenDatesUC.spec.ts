import { describe } from "vitest";
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
    ]
});