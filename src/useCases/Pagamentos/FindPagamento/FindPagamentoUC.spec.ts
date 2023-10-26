import { describe, expect, it } from "vitest";
import { InMemoryPagamentosRepository } from "../../../repositories/in-memory/in-memory-PagamentosRepository";
import { InMemoryDetalhePagamentoRepository } from "../../../repositories/in-memory/in-memory-DetalhePagamento";
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
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
import { InMemoryVendaDiretaRepository } from "../../../repositories/in-memory/in-memory-VendaDireta";
import { FindVendaDiretaUC } from "../../VendaDireta/FindVendaDireta/FindVendaDiretaUC";
import { InMemoryProdutoHasVendaDireta } from "../../../repositories/in-memory/in-memoty-ProdutoHasVendaDireta";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { FindPagamentoUC } from "./FindPagamentoUC";

describe("Find Pagamento", () => {
    const mySqlPagamentos = new InMemoryPagamentosRepository;

    const mySqlDetalhePagamento = new InMemoryDetalhePagamentoRepository;
    const findAllDetalhePagamento = new FindAllDetalhePagamentoUC(mySqlDetalhePagamento);

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

    const mySqlServicos = new InMemoryServicosRepository;
    const findServico = new FindServicoUC(mySqlServicos);

    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const findFuncionario = new FindFuncionarioUC(mySqlFuncionarios);

    const findOrdemServico = new FindOrdemServicoUC(
        mySqlOrdemServico, findCliente, findVeiculo,
        findOSDetalhes, findAllProdutoHasOSDetalhes, findAllExecutaFuncao,
        findProduto, findServico, findFuncionario,
    );

    const mySqlVendaDireta = new InMemoryVendaDiretaRepository;
    const findVendaDireta = new FindVendaDiretaUC(mySqlVendaDireta);

    const mySqlProdutoHasVendaDireta = new InMemoryProdutoHasVendaDireta;
    const findAllProdutoHasVendaDireta = new FindAllProdutoHasVendaDiretaUC(mySqlProdutoHasVendaDireta);

    const findPagamento = new FindPagamentoUC(
        mySqlPagamentos, findAllDetalhePagamento, findOrdemServico,
        findOSDetalhes, findVendaDireta, findAllProdutoHasVendaDireta,
        findProduto,
    );

    const data = new Date(Date.now());
    // Cria um pagamento para teste
    mySqlPagamentos.items.push({
        idPagamento: 2,
        dataHora: data,
        subtotal: 20,
        total: 40,
        desconto: 2,
        formaPagamento: "Cartão de Débito",
    })

    // Cria clientes para teste
    mySqlClientes.items.push({
        idCliente: 2,
        nomeCliente: "Andre",
        cpfCnpj: "156.154.125-12",
        celularCliente: "11953014839",
        telefoneCliente: "40364930",
        cep: "12970-000",
        endereco: "Rua 1",
        numero: "44",
        bairro: "Jd San Marino",
        cidade: "Piracaia",
        uf: "SP",
        complemento: "",
    })

    mySqlClientes.items.push({
        idCliente: 3,
        nomeCliente: "Bernardo",
        cpfCnpj: "475.751.788-21",
        celularCliente: "11953017858",
        telefoneCliente: "40363956",
        cep: "12970000",
        endereco: "Rua Primeira",
        numero: "40",
        bairro: "Centro",
        cidade: "São Paulo",
        uf: "SP",
        complemento: "Rua ao lado da praça",
    })

    // Cria veículos para teste
    mySqlVeiculos.items.push({
        placaVeiculo: "1",
        marca: "Fiat",
        modelo: "Touro",
        ano: 2011,
        capacidadeOleo: 5,
        cor: "Branco",
        idCliente: 2,
    });

    mySqlVeiculos.items.push({
        placaVeiculo: "2",
        marca: "Audi",
        modelo: "A1",
        ano: 2012,
        capacidadeOleo: 5,
        cor: "Prata",
        idCliente: 3,
    });

    // Cria ordens de serviço para teste
    mySqlOrdemServico.items.push({
        idOrdemServico: 2,
        total: 200,
        km: 3000,
        isFinalizada: true,
        isPaga: true,
        placaVeiculo: "1",
        idCliente: 2
    })

    mySqlOrdemServico.items.push({
        idOrdemServico: 3,
        total: 300,
        km: 4000,
        isFinalizada: true,
        isPaga: true,
        placaVeiculo: "2",
        idCliente: 3
    })

    // Cria os DetalhePagamento
    mySqlDetalhePagamento.items.push({
        idDetalhePagamento: 2,
        idOrdemServico: 2,
        idPagamento: 2
    })

    mySqlDetalhePagamento.items.push({
        idDetalhePagamento: 3,
        idOrdemServico: 3,
        idPagamento: 2
    })

    // Cria as OSDetalhes
    mySqlOSDetalhes.items.push({
        idOSDetalhes: 2,
        idOrdemServico: 2,
        dataOS: data
    })

    mySqlOSDetalhes.items.push({
        idOSDetalhes: 3,
        idOrdemServico: 3,
        dataOS: data
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

    mySqlVendaDireta.items.push({
        idVendaDireta: 2,
        idPagamento: 2,
        total: 1000,
        dataHora: data,
    })

    mySqlProdutoHasVendaDireta.items.push({
        codigoBarras: "1",
        idVendaDireta: 2,
        quantidadeVendida: 2,
        precoTotal: 30,
        precoUnitario: 15
    })

    mySqlProdutoHasVendaDireta.items.push({
        codigoBarras: "2",
        idVendaDireta: 2,
        quantidadeVendida: 3,
        precoTotal: 60,
        precoUnitario: 20
    })


    it("should be able to find a payment", () => {
        expect(findPagamento.execute({ idPagamento: 2 })).resolves.toStrictEqual({
            idPagamento: 2,
            subtotal: 20,
            total: 40,
            formaPagamento: "Cartão de Débito",
            desconto: 2,
            dataHora: data,
            vendaDireta: [
                {
                    codigoBarras: "1",
                    descricao: "Lava Auto",
                    quantidadeVendida: 2,
                    precoTotal: 30,
                    precoUnitario: 15,
                },
                {
                    codigoBarras: "2",
                    descricao: "Oleo",
                    quantidadeVendida: 3,
                    precoTotal: 60,
                    precoUnitario: 20,
                }
            ],
            ordensServico: [
                {
                    idOrdemServico: 2,
                    total: 200,
                    dataOS: data,
                    km: 3000,
                    cliente: {
                        idCliente: 2,
                        nomeCliente: "Andre",
                        cpfCnpj: "156.154.125-12",
                        celularCliente: "11953014839",
                        telefoneCliente: "40364930",
                        cep: "12970-000",
                        endereco: "Rua 1",
                        numero: "44",
                        bairro: "Jd San Marino",
                        cidade: "Piracaia",
                        uf: "SP",
                        complemento: "",
                    },
                    veiculo: {
                        placaVeiculo: "1",
                        marca: "Fiat",
                        modelo: "Touro",
                        ano: 2011,
                        capacidadeOleo: 5,
                        cor: "Branco",
                        idCliente: 2,
                    }
                },
                {
                    idOrdemServico: 3,
                    total: 300,
                    dataOS: data,
                    km: 4000,
                    cliente: {
                        idCliente: 3,
                        nomeCliente: "Bernardo",
                        cpfCnpj: "475.751.788-21",
                        celularCliente: "11953017858",
                        telefoneCliente: "40363956",
                        cep: "12970000",
                        endereco: "Rua Primeira",
                        numero: "40",
                        bairro: "Centro",
                        cidade: "São Paulo",
                        uf: "SP",
                        complemento: "Rua ao lado da praça",
                    },
                    veiculo: {
                        placaVeiculo: "2",
                        marca: "Audi",
                        modelo: "A1",
                        ano: 2012,
                        capacidadeOleo: 5,
                        cor: "Prata",
                        idCliente: 3,
                    }
                }
            ]
        })
    });


    it("should not be able to find any payment", () => {
        expect(findPagamento.execute({idPagamento: null})).rejects.toThrow("Campos faltando");

        expect(findPagamento.execute({idPagamento: 3})).resolves.toBe(null);
    })
})