import { describe, expect, it } from "vitest";
import { InMemoryPagamentosRepository } from "../../../repositories/in-memory/in-memory-PagamentosRepository";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { SetStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico/SetStatusOrdemServicoUC";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { SetEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto/SetEstoqueProdutoUC";
import { DelDetalhePagamentoUC } from "../../DetalhePagamento/DelDetalhePagamento/DelDetalhePagamentoUC";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { FindVendaDiretaUC } from "../../VendaDireta/FindVendaDireta/FindVendaDiretaUC";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { DelProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/DelProdutoHasVendaDireta/DelProdutoHasVendaDiretaUC";
import { DelVendaDiretaUC } from "../../VendaDireta/DelVendaDireta/DelVendaDiretaUC";
import { DelPagamentoUC } from "./DelPagamentoUC";

describe("Del Pagamento", () => {
    const mySqlPagamentos = new InMemoryPagamentosRepository;

    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const findAllDetalhePagamento = new FindAllDetalhePagamentoUC(mySqlDetalhePagamento);
    const delDetalhePagamento = new DelDetalhePagamentoUC(mySqlDetalhePagamento);

    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;
    const setStatusOrdemServico = new SetStatusOrdemServicoUC(mySqlOrdemServico);

    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhes);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlProdutos = new InMemoryProdutosRepository;
    const setEstoqueProduto = new SetEstoqueProdutoUC(mySqlProdutos);

    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const findVendaDireta = new FindVendaDiretaUC(mySqlVendaDireta);
    const delVendaDireta = new DelVendaDiretaUC(mySqlVendaDireta);

    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const findAllProdutoHasVendaDireta = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);
    const delProdutoHasVendaDireta = new DelProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    const delPagamentoUC = new DelPagamentoUC(
        mySqlPagamentos, findAllDetalhePagamento, setStatusOrdemServico, findOSDetalhes, 
        findAllProdutoHasOSDetalhes, setEstoqueProduto, delDetalhePagamento, findVendaDireta, 
        findAllProdutoHasVendaDireta, delProdutoHasVendaDireta, delVendaDireta,
    );
    
    const data = new Date(Date.now());

    // Cria alguns produtos para teste
    mySqlProdutos.items = [
        {
            codigoBarras: "1",
            descricao: "Oleo",
            valorCusto: 21,
            quantidadeEstoque: 54,
            precoVenda: 30,
        },
        {
            codigoBarras: "2",
            descricao: "Lubrificante",
            valorCusto: 30,
            quantidadeEstoque: 30,
            precoVenda: 35,
        },
        {
            codigoBarras: "3",
            descricao: "Lava Auto",
            valorCusto: 15,
            quantidadeEstoque: 40,
            precoVenda: 45,
        },
    ];

    mySqlOrdemServico.items = [
        {
            idOrdemServico: 1,
            total: 500,
            km: 2000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        {
            idOrdemServico: 2,
            total: 300,
            km: 3000,
            isFinalizada: false,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
    ];

    mySqlOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            dataOS: data,
            idOrdemServico: 1,
        },
        {
            idOSDetalhes: 2,
            dataOS: data,
            idOrdemServico: 2,
        },
    ];

    mySqlProdutoHasOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            codigoBarras: "1",
            quantidadeVendida: 5,
            precoTotal: 150,
            precoUnitario: 30
        },
        {
            idOSDetalhes: 1,
            codigoBarras: "2",
            quantidadeVendida: 2,
            precoTotal: 70,
            precoUnitario: 35
        },
        {
            idOSDetalhes: 2,
            codigoBarras: "3",
            quantidadeVendida: 3,
            precoTotal: 135,
            precoUnitario: 45
        },
    ];

    mySqlPagamentos.items = [
        {
            idPagamento: 1,
            dataHora: data,
            subtotal: 20,
            total: 19,
            desconto: 1,
            formaPagamento: "Cartão de Crédito",
        }
    ]

    mySqlDetalhePagamento.items = [
        {
            idDetalhePagamento: 1,
            idOrdemServico: 1,
            idPagamento: 1,
        },
        {
            idDetalhePagamento: 2,
            idOrdemServico: 2,
            idPagamento: 1,
        },
    ];

    mySqlVendaDireta.items = [
        {
            idVendaDireta: 1,
            idPagamento: 1,
            total: 1,
            dataHora: data,
        },
    ];

    mySqlProdutoHasVendaDireta.items = [
        {
            codigoBarras: "1",
            idVendaDireta: 1,
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30
        },
        {
            codigoBarras: "3",
            idVendaDireta: 1,
            quantidadeVendida: 5,
            precoTotal: 225,
            precoUnitario: 45
        },
    ];

    it("should be able to delete a payment", () => {
        expect(delPagamentoUC.execute({idPagamento: 1}).then(() => {

            // Verifica se o status das ordens de serviço foi alterado
            expect(mySqlOrdemServico.items.find((ordem) => {
                if (ordem.idOrdemServico == 1) {
                    return ordem;
                }
            }).isPaga).toBe(false);

            expect(mySqlOrdemServico.items.find((ordem) => {
                if (ordem.idOrdemServico == 2) {
                    return ordem;
                }
            }).isPaga).toBe(false);

            // Verifica se o estoque dos produtos foi atualizado

            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "1") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(61);

            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "2") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(32);

            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "3") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(48);

            // Verifica se tudo foi excluido corretamente
            expect(mySqlDetalhePagamento.items).toHaveLength(0);

            expect(mySqlVendaDireta.items.find((vendaDireta) => {
                if (vendaDireta.idVendaDireta == 1) {
                    return vendaDireta;
                }
            })).toBe(undefined);

            expect(mySqlProdutoHasVendaDireta.items).toHaveLength(0);

            expect(mySqlPagamentos.items.find((pagamento) => {
                if (pagamento.idPagamento == 1) {
                    return pagamento;
                }
            })).toBe(undefined);

        }));

        it("should not be able to del any payment", () => {
            expect(delPagamentoUC.execute({idPagamento: null})).rejects.toThrow("Campos faltando");

            // Tenta apagar um pagamento que não existe
            expect(delPagamentoUC.execute({idPagamento: 2})).rejects.toThrow("Pagamento não encontrado!");
        });
        
    });

});