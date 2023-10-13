import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { DelOSDetalhesUC } from "../../OSDetalhes/DelOSDetalhes/DelOSDetalhesUC";
import { DelOrdemServicoUC } from "./DelOrdemServicoUC";

describe("Del OrdemServico", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;

    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhes);
    const delOSDetalhes = new DelOSDetalhesUC(mySqlOSDetalhes);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
    const delProdutoHasOSDetalhes = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);
    const delExecutaFuncao = new DelExecutaFuncaoUC(mySqlExecutaFuncao);

    const delOrdemServico = new DelOrdemServicoUC(
        mySqlOrdemServico, findOSDetalhes, findAllProdutoHasOSDetalhes,
        delProdutoHasOSDetalhes, findAllExecutaFuncao, delExecutaFuncao, delOSDetalhes
    )

    mySqlOrdemServico.items.push({
        idOrdemServico: 2,
        total: 200,
        km: 3000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "1",
        idCliente: 1,
    });

    mySqlOSDetalhes.items.push({
        idOSDetalhes: 2,
        dataOS: new Date(Date.now()),
        idOrdemServico: 2,
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "2",
        quantidadeVendida: 2,
        precoTotal: 200,
        precoUnitario: 100
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "3",
        quantidadeVendida: 3,
        precoTotal: 30,
        precoUnitario: 10
    });

    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 2,
        observacao: "",
        idOSDetalhes: 2,
    })

    mySqlExecutaFuncao.items.push({
        idFuncionario: 3,
        idServico: 3,
        observacao: "",
        idOSDetalhes: 2,
    })

    it("should be able to delete a service order", () => {
        expect(delOrdemServico.execute({idOrdemServico: 2}).then(() => {
            // Verifica se apagou a OSDetalhes
            expect(mySqlOSDetalhes.items.find((osDetalhes) => {
                if (osDetalhes.idOrdemServico == 2) {
                    return osDetalhes;
                }
            })).toBe(undefined)

            // Verifica se apagou os produtos vendidos
            expect(() => {
                const produtoHasOSDetalhesList = [];
                for (let i in mySqlProdutoHasOSDetalhes.items) {
                    if (mySqlProdutoHasOSDetalhes.items[i].idOSDetalhes == 2) {
                        produtoHasOSDetalhesList.push(mySqlProdutoHasOSDetalhes.items[i]);
                    }
                }
                return produtoHasOSDetalhesList;
            }).toHaveLength(0);

            // Verifica se apagou as executaFuncao
            expect(() => {
                const executaFuncaoList = [];
                for (let i in mySqlExecutaFuncao.items) {
                    if (mySqlExecutaFuncao.items[i].idOSDetalhes == 2) {
                        executaFuncaoList.push(mySqlProdutoHasOSDetalhes.items[i]);
                    }
                }
                return executaFuncaoList;
            }).toHaveLength(0);

        }))
    });

    // Criando duas ordens de serviço para testar o isPaga e o isFinalizada
    mySqlOrdemServico.items.push({
        idOrdemServico: 3,
        total: 200,
        km: 3000,
        isFinalizada: true,
        isPaga: false,
        placaVeiculo: "1",
        idCliente: 1,
    })

    mySqlOrdemServico.items.push({
        idOrdemServico: 4,
        total: 200,
        km: 3000,
        isFinalizada: false,
        isPaga: true,
        placaVeiculo: "1",
        idCliente: 1,
    })

    it("should not be able to delete a service order", () => {
        // Tenta apagar uma ordem de serviço sem passar um id
        expect(delOrdemServico.execute({idOrdemServico: null})).rejects.toThrow("Campos faltando");

        // Tenta apagar uma ordem de serviço que não existe
        expect(delOrdemServico.execute({idOrdemServico: 5})).rejects.toThrow("Ordem de Serviço não encontrada!");

        // Tenta apagar uma ordem de serviço já paga
        expect(delOrdemServico.execute({idOrdemServico: 3})).rejects.toThrow("Não é possível deletar uma ordem de serviço paga/finalizada");

        // Tenta apagar uma ordem de serviço já finalizada
        expect(delOrdemServico.execute({idOrdemServico: 4})).rejects.toThrow("Não é possível deletar uma ordem de serviço paga/finalizada");

    });

})