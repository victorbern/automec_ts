import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesBetweenDatesUC } from "../../OSDetalhes/FindOSDetalhesBetweenDates/FindOSDetalhesBetweenDatesUC";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { FindOrdemServicoBetweenDatesUC } from "../../ordens_servico/FindOrdemServicoBetweenDates/FindOrdemServicoBetweenDatesUC";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { FindVendaDiretaBetweenDatesUC } from "../../VendaDireta/FindVendaDiretaBetweenDates/FindVendaDiretaBetweenDatesUC";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { GetRelatorioProdutosUC } from "./GetRelatorioProdutosUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";

describe("Get Relatorio Produtos", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhesBetweenDates = new FindOSDetalhesBetweenDatesUC(mySqlOSDetalhes);

    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;
    const findOrdemServicoBetweenDates = new FindOrdemServicoBetweenDatesUC(mySqlOrdemServico, findOSDetalhesBetweenDates);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlProdutos = new InMemoryProdutosRepository;
    const findProduto = new FindProdutoUC(mySqlProdutos);

    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const findVendaDiretaBetweenDates = new FindVendaDiretaBetweenDatesUC(mySqlVendaDireta);

    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const findAllProdutoHasVendaDireta = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    const getRelatorioProdutosUC = new GetRelatorioProdutosUC(
        findOrdemServicoBetweenDates, findAllProdutoHasOSDetalhes,
        findProduto, findVendaDiretaBetweenDates, findAllProdutoHasVendaDireta,
    );

    const data1 = new Date(Date.parse("2023-07-01")); // Data anterior aos testes
    const data2 = new Date(Date.parse("2023-08-01")); // Data 'dataDe' usada nos testes
    const data3 = new Date(Date.parse("2023-09-01")); // Data dentro do range de datas
    const data4 = new Date(Date.parse("2023-10-01")); // Data dentro do range de datas
    const data5 = new Date(Date.parse("2023-11-01")); // Data 'dataAte' usada nos testes
    const data6 = new Date(Date.parse("2023-12-01")); // Data posterior aos testes

    mySqlProdutos.items = [
        {
            codigoBarras: "1",
            descricao: "Oleo",
            valorCusto: 20,
            quantidadeEstoque: 50,
            precoVenda: 25
        },
        {
            codigoBarras: "2",
            descricao: "Limpeza Auto",
            valorCusto: 15,
            quantidadeEstoque: 30,
            precoVenda: 20
        },
        {
            codigoBarras: "3",
            descricao: "Lubrificante",
            valorCusto: 32,
            quantidadeEstoque: 60,
            precoVenda: 37
        },
        {
            codigoBarras: "4",
            descricao: "Filtro de Óleo",
            valorCusto: 10,
            quantidadeEstoque: 45,
            precoVenda: 15
        },
        {
            codigoBarras: "5",
            descricao: "Mangueira",
            valorCusto: 15,
            quantidadeEstoque: 50,
            precoVenda: 20
        },
    ];
    // Apenas as ordens de serviço com isPaga = true contam na soma de produtos vendidos
    mySqlOrdemServico.items = [
        // Ordem 1 (anterior a data testada)
        {
            idOrdemServico: 1,
            total: 0,
            km: 2000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 2 (exatamente na data testada 'dataDe')
        {
            idOrdemServico: 2,
            total: 100,
            km: 3000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 3 (dentro do range de datas testadas)
        {
            idOrdemServico: 3,
            total: 100,
            km: 4000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 4 (dentro do range de datas testadas)
        {
            idOrdemServico: 4,
            total: 100,
            km: 4500,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 5 (exatamente na data testada 'dataAte')
        {
            idOrdemServico: 5,
            total: 100,
            km: 3000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        // Ordem 6 (posterior a data testada)
        {
            idOrdemServico: 6,
            total: 100,
            km: 100000,
            isFinalizada: false,
            isPaga: true,
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

    mySqlProdutoHasOSDetalhes.items = [
        {
            idOSDetalhes: 10,
            codigoBarras: "1",
            quantidadeVendida: 2,
            precoTotal: 50,
            precoUnitario: 25
        },
        {
            idOSDetalhes: 10,
            codigoBarras: "2",
            quantidadeVendida: 5,
            precoTotal: 100,
            precoUnitario: 20
        },
        {
            idOSDetalhes: 10,
            codigoBarras: "4",
            quantidadeVendida: 1,
            precoTotal: 30,
            precoUnitario: 30
        },
        {
            idOSDetalhes: 11,
            codigoBarras: "2",
            quantidadeVendida: 4,
            precoTotal: 80,
            precoUnitario: 20
        },
        {
            idOSDetalhes: 12,
            codigoBarras: "5",
            quantidadeVendida: 3,
            precoTotal: 90,
            precoUnitario: 30
        },
        {
            idOSDetalhes: 13,
            codigoBarras: "3",
            quantidadeVendida: 2,
            precoTotal: 74,
            precoUnitario: 37
        },
        {
            idOSDetalhes: 14,
            codigoBarras: "1",
            quantidadeVendida: 1,
            precoTotal: 25,
            precoUnitario: 25
        },
        {
            idOSDetalhes: 14,
            codigoBarras: "5",
            quantidadeVendida: 1,
            precoTotal: 30,
            precoUnitario: 30
        },
        {
            idOSDetalhes: 15,
            codigoBarras: "2",
            quantidadeVendida: 6,
            precoTotal: 120,
            precoUnitario: 20
        },
    ];

    mySqlVendaDireta.items = [
        {
            idVendaDireta: 1,
            idPagamento: 1,
            total: 1,
            dataHora: data3,
        },
        {
            idVendaDireta: 2,
            idPagamento: 2,
            total: 1,
            dataHora: data6,
        },
    ];

    mySqlProdutoHasVendaDireta.items = [
        {
            codigoBarras: "1",
            idVendaDireta: 1,
            quantidadeVendida: 2,
            precoTotal: 50,
            precoUnitario: 25
        },
        {
            codigoBarras: "2",
            idVendaDireta: 1,
            quantidadeVendida: 5,
            precoTotal: 100,
            precoUnitario: 20
        },
    ];

    it("should be able to find all products", () => {
        let dataDe = new Date(Date.parse("2023-07-01"));
        let dataAte = new Date(Date.parse("2023-12-01"));

        expect(getRelatorioProdutosUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                codigoBarras: "1",
                descricao: "Oleo",
                totalVendido: 5,
            },
            {
                codigoBarras: "2",
                descricao: "Limpeza Auto",
                totalVendido: 20,
            },
            {
                codigoBarras: "4",
                descricao: "Filtro de Óleo",
                totalVendido: 1,
            },
            {
                codigoBarras: "5",
                descricao: "Mangueira",
                totalVendido: 4,
            },
            {
                codigoBarras: "3",
                descricao: "Lubrificante",
                totalVendido: 2,
            },
        ]);
    });

    it("should be able to find some products", () => {
        let dataDe = new Date(Date.parse("2023-08-01"));
        let dataAte = new Date(Date.parse("2023-11-01"));

        expect(getRelatorioProdutosUC.execute({dataDe, dataAte})).resolves.toStrictEqual([
            {
                codigoBarras: "2",
                descricao: "Limpeza Auto",
                totalVendido: 9,
            },
            {
                codigoBarras: "5",
                descricao: "Mangueira",
                totalVendido: 4,
            },
            {
                codigoBarras: "3",
                descricao: "Lubrificante",
                totalVendido: 2,
            },
            {
                codigoBarras: "1",
                descricao: "Oleo",
                totalVendido: 3,
            },
        ]);
    });

    it("should not be able to find any product", () => {
        let dataDe = new Date(Date.parse("2023-06-01"));
        let dataAte = new Date(Date.parse("2023-06-30"));
        expect(getRelatorioProdutosUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);

        dataDe = new Date(Date.parse("2023-12-02"));
        dataAte = new Date(Date.parse("2023-12-30"));
        expect(getRelatorioProdutosUC.execute({dataDe, dataAte})).resolves.toHaveLength(0);

        expect(getRelatorioProdutosUC.execute({dataDe: null, dataAte})).rejects.toThrow("Campos faltando");
        expect(getRelatorioProdutosUC.execute({dataDe, dataAte: null})).rejects.toThrow("Campos faltando");
    });
})