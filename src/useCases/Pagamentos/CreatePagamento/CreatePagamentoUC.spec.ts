import { describe, expect, it } from "vitest";
import { InMemoryPagamentosRepository } from "../../../repositories/in-memory/in-memory-PagamentosRepository";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { SetStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico/SetStatusOrdemServicoUC";
import { SetEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto/SetEstoqueProdutoUC";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { CreateDetalhePagamentoUC } from "../../DetalhePagamento/CreateDetalhePagamento/CreateDetalhePagamentoUC";
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { CreateVendaDiretaUC } from "../../VendaDireta/CreateVendaDireta/CreateVendaDiretaUC";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { CreateProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/CreateProdutoHasVendaDireta/CreateProdutoHasVendaDiretaUC";
import { CreatePagamentoUC } from "./CreatePagamentoUC";
import { DetalhePagamento } from "../../../entities/DetalhePagamento";
import { Produto_Has_VendaDireta } from "../../../entities/ProdutoHasVendaDireta";

describe("Create a payment", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;

    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findVeiculo = new FindVeiculoUC(mySqlVeiculos, findCliente);

    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhes);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);

    const mySqlProdutos = new InMemoryProdutosRepository;
    const findProduto = new FindProdutoUC(mySqlProdutos);
    const setEstoqueProduto = new SetEstoqueProdutoUC(mySqlProdutos);

    const mySqlServicos = new InMemoryServicosRepository;
    const findServico = new FindServicoUC(mySqlServicos);

    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const findFuncionario = new FindFuncionarioUC(mySqlFuncionarios);

    const findOrdemServico = new FindOrdemServicoUC(
        mySqlOrdemServico,
        findCliente,
        findVeiculo,
        findOSDetalhes,
        findAllProdutoHasOSDetalhes,
        findAllExecutaFuncao,
        findProduto,
        findServico,
        findFuncionario
    );

    const setStatusOrdemServico = new SetStatusOrdemServicoUC(mySqlOrdemServico);

    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const createDetalhePagamento = new CreateDetalhePagamentoUC(mySqlDetalhePagamento);

    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const createVendaDireta = new CreateVendaDiretaUC(mySqlVendaDireta);

    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const createProdutoHasVendaDireta = new CreateProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    const mySqlPagamentos = new InMemoryPagamentosRepository;
    const createPagamento = new CreatePagamentoUC(
        mySqlPagamentos, findOrdemServico, findProduto, setStatusOrdemServico,
        findOSDetalhes, findAllProdutoHasOSDetalhes, setEstoqueProduto,
        createDetalhePagamento, createVendaDireta, createProdutoHasVendaDireta,
    )

    // Cria ordens de serviço para teste
    mySqlOrdemServico.items.push({
        idOrdemServico: 2,
        total: 200,
        km: 3000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "1",
        idCliente: 1
    })

    mySqlOrdemServico.items.push({
        idOrdemServico: 3,
        total: 300,
        km: 4000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "2",
        idCliente: 2
    })

    // Cria as OSDetalhes
    mySqlOSDetalhes.items.push({
        idOSDetalhes: 2,
        idOrdemServico: 2,
        dataOS: new Date(Date.now())
    })

    mySqlOSDetalhes.items.push({
        idOSDetalhes: 3,
        idOrdemServico: 3,
        dataOS: new Date(Date.now())
    })

    // Cria produtos que foram vendidos
    mySqlProdutos.items.push({
        codigoBarras: "1",
        descricao: "Lava Auto",
        precoVenda: 15,
        quantidadeEstoque: 25,
        valorCusto: 10,
    })

    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Oleo",
        precoVenda: 20,
        quantidadeEstoque: 40,
        valorCusto: 15,
    })

    mySqlProdutos.items.push({
        codigoBarras: "3",
        descricao: "Lubrificante",
        precoVenda: 30,
        quantidadeEstoque: 50,
        valorCusto: 25,
    })

    // Cria dois produtos separados para venda direta

    mySqlProdutos.items.push({
        codigoBarras: "4",
        descricao: "Refil",
        precoVenda: 34,
        quantidadeEstoque: 50,
        valorCusto: 29,
    })

    // Cria os as vendas dos produtos -> dois produtos em uma ordem e outros dois em outra
    mySqlProdutoHasOSDetalhes.items.push({
        codigoBarras: "1",
        idOSDetalhes: 2,
        precoTotal: 75,
        precoUnitario: 15,
        quantidadeVendida: 5
    })

    mySqlProdutoHasOSDetalhes.items.push({
        codigoBarras: "3",
        idOSDetalhes: 2,
        precoTotal: 90,
        precoUnitario: 30,
        quantidadeVendida: 3
    })

    mySqlProdutoHasOSDetalhes.items.push({
        codigoBarras: "1",
        idOSDetalhes: 3,
        precoTotal: 45,
        precoUnitario: 15,
        quantidadeVendida: 3
    })

    mySqlProdutoHasOSDetalhes.items.push({
        codigoBarras: "2",
        idOSDetalhes: 3,
        precoTotal: 20,
        precoUnitario: 20,
        quantidadeVendida: 1
    })


    it("should be able to create a payment", () => {
        expect(createPagamento.execute({
            subtotal: 255,
            total: 255,
            formaPagamento: "Dinheiro",
            desconto: null,
            ordensServico: [
                {
                    idOrdemServico: 2,
                },
                {
                    idOrdemServico: 3,
                },
            ],
            vendaDireta: {
                total: 200,
                produtos: [
                    {
                        codigoBarras: "4",
                        precoTotal: 170,
                        precoUnitario: 34,
                        quantidadeVendida: 5,
                    },
                    {
                        codigoBarras: "3",
                        precoTotal: 30,
                        precoUnitario: 30,
                        quantidadeVendida: 1,
                    }
                ]
            }
        }).then(() => {
            // Verifica se foi criado uma instancia em pagamento com base nos valores e salva em uma variavel
            let pagamento = mySqlPagamentos.items.find((pagamento) => {
                if (pagamento.idPagamento == 2) {
                    return pagamento;
                }
            })

            // Testa o valor de subtotal
            expect(pagamento.subtotal).toBe(255);

            // Testa o valor de total
            expect(pagamento.total).toBe(255);

            // Testa o valor de forma de pagamento
            expect(pagamento.formaPagamento).toBe("Dinheiro");

            // Testa o valor de desconto (se foi alterado de null para 0)
            expect(pagamento.desconto).toBe(0);

            let detalhesPagamento = mySqlDetalhePagamento.items;

            // expect(detalhesPagamento).toBe(true)

            // Verifica se foi criado as instâncias de DetalhePagamento
            expect(mySqlDetalhePagamento.items.find((detalhePagamento) => {
                if (detalhePagamento.idPagamento == 2 && detalhePagamento.idOrdemServico == 2) {
                    return detalhePagamento;
                }
            })).toBeInstanceOf(DetalhePagamento);

            expect(mySqlDetalhePagamento.items.find((detalhePagamento) => {
                if (detalhePagamento.idPagamento == 2 && detalhePagamento.idOrdemServico == 3) {
                    return detalhePagamento;
                }
            })).toBeInstanceOf(DetalhePagamento);

            // Verifica se o status das ordens de serviço foi alterado
            expect(mySqlOrdemServico.items.find((ordem) => {
                if (ordem.idOrdemServico == 2) {
                    return ordem;
                }
            }).isPaga).toBeTruthy();

            expect(mySqlOrdemServico.items.find((ordem) => {
                if (ordem.idOrdemServico == 3) {
                    return ordem;
                }
            }).isPaga).toBeTruthy();

            // Verifica se o estoque dos produtos foi alterado
            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "1") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(17);


            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "2") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(39);

            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "3") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(46);

            expect(mySqlProdutos.items.find((produto) => {
                if (produto.codigoBarras == "4") {
                    return produto;
                }
            }).quantidadeEstoque).toBe(45);

            // Verifica se a venda direta foi criada e salva com o id pagamento igual a 2
            expect(mySqlVendaDireta.items.find((vendaDireta) => {
                if (vendaDireta.idVendaDireta == 2) {
                    return vendaDireta;
                }
            }).idPagamento).toBe(2)

            // Verifica se as vendas de venda direta foram salvas corretamente
            let produtosCadastrados: Produto_Has_VendaDireta[] = [];
            for (let i = 0; i < mySqlProdutoHasVendaDireta.items.length; i++) {
                if (mySqlProdutoHasVendaDireta.items[i].idVendaDireta === 2) {
                    produtosCadastrados.push(mySqlProdutoHasVendaDireta.items[i])
                }
            }

            // Verifica se o produto 3 foi cadastrado corretamente -> verifica o valor de quantidadeVendida
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "3") {
                    return produtoHasVendaDireta;
                }
            }).quantidadeVendida).toBe(1);

            // Verifica se o produto 3 foi cadastrado corretamente -> verifica o valor de precoTotal
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "3") {
                    return produtoHasVendaDireta;
                }
            }).precoTotal).toBe(30);

            // Verifica se o produto 3 foi cadastrado corretamente -> verifica o valor de precoUnitario
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "3") {
                    return produtoHasVendaDireta;
                }
            }).precoUnitario).toBe(30);

            // Verifica se o produto 4 foi cadastrado corretamente -> verifica o valor de quantidadeVendida
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "4") {
                    return produtoHasVendaDireta;
                }
            }).quantidadeVendida).toBe(5);

            // Verifica se o produto 4 foi cadastrado corretamente -> verifica o valor de precoTotal
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "4") {
                    return produtoHasVendaDireta;
                }
            }).precoTotal).toBe(170);

            // Verifica se o produto 4 foi cadastrado corretamente -> verifica o valor de precoUnitario
            expect(produtosCadastrados.find((produtoHasVendaDireta) => {
                if (produtoHasVendaDireta.codigoBarras === "4") {
                    return produtoHasVendaDireta;
                }
            }).precoUnitario).toBe(34);
        })).resolves

    });

    // Cria uma ordem de serviço para teste (testar se já foi paga)
    mySqlOrdemServico.items.push({
        idOrdemServico: 4,
        total: 300,
        km: 4000,
        isFinalizada: false,
        isPaga: true,
        placaVeiculo: "2",
        idCliente: 2
    })

    mySqlOSDetalhes.items.push({
        dataOS: new Date(Date.now()),
        idOrdemServico: 4,
        idOSDetalhes: 4
    })

    it("should not be able to create a payment", () => {
        // Tenta criar um pagamento com subtotal faltando
        expect(createPagamento.execute({
            subtotal: null, total: 2, formaPagamento: "Crédito", desconto: 2, ordensServico: null, vendaDireta: null,
        })).rejects.toThrow("Campos faltando")

        // Tenta criar um pagamento com total faltando
        expect(createPagamento.execute({
            subtotal: 3, total: null, formaPagamento: "Crédito", desconto: 2, ordensServico: null, vendaDireta: null,
        })).rejects.toThrow("Campos faltando")

        // Tenta criar um pagamento com formaPagamento faltando
        expect(createPagamento.execute({
            subtotal: 2, total: 2, formaPagamento: "", desconto: 2, ordensServico: null, vendaDireta: null,
        })).rejects.toThrow("Campos faltando")

        // Tenta criar um pagamento com uma ordem de serviço que não existe
        expect(createPagamento.execute({
            subtotal: 2, total: 2, formaPagamento: "Crédito", desconto: 2, ordensServico: [{idOrdemServico: 5}], vendaDireta: null,
        })).rejects.toThrow("A ordem de serviço na posição 0 não foi encontrada")

        // Tenta criar um pagamento com uma ordem de serviço já paga
        expect(createPagamento.execute({
            subtotal: 2, total: 2, formaPagamento: "Crédito", desconto: 2, ordensServico: [{idOrdemServico: 4}], vendaDireta: null,
        })).rejects.toThrow("A ordem de serviço na posição 0 já foi paga")

        // Tenta criar um pagamento com uma venda direta com um produto que não existe
        expect(createPagamento.execute({
            subtotal: 2, total: 2, formaPagamento: "Crédito", desconto: 2, ordensServico: null, vendaDireta: {total: 2, produtos: [{codigoBarras: "10", precoTotal: 10, precoUnitario: 10, quantidadeVendida: 1}]},
        })).rejects.toThrow("O produto com o código de barras 10 não foi encontrado")

    })
})