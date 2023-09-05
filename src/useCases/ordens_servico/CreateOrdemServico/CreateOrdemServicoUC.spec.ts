import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { InMemoryProdutosRepository } from "../../../repositories/in-memory/in-memory-ProdutosRepository";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { InMemoryFuncionariosRepository } from "../../../repositories/in-memory/in-memory-FuncionariosRepository";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { CreateOSDetalhesUC } from "../../OSDetalhes/CreateOSDetalhes/CreateOSDetalhesUC";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { CreateExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao/CreateExecutaFuncaoUC";
import { CreateOrdemServicoUC } from "./CreateOrdemServicoUC";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";
import { createOrdemServicoUC } from ".";

describe("Create Ordem de Serviço", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository();
    const findVeiculo = new FindVeiculoUC(mySqlVeiculos, findCliente);

    const mySqlProdutos = new InMemoryProdutosRepository();
    const findProduto = new FindProdutoUC(mySqlProdutos);

    const mySqlServicos = new InMemoryServicosRepository();
    const findServico = new FindServicoUC(mySqlServicos);

    const mySqlFuncionarios = new InMemoryFuncionariosRepository();
    const findFuncionario = new FindFuncionarioUC(mySqlFuncionarios);

    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository();
    const createOSDetalhes = new CreateOSDetalhesUC(mySqlOSDetalhes);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository();
    const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository();
    const createExecutaFuncao = new CreateExecutaFuncaoUC(mySqlExecutaFuncao);

    const mySqlOrdemServico = new InMemoryOrdemServicoRepository();
    const createOrdemServico = new CreateOrdemServicoUC(
        mySqlOrdemServico, findCliente, findVeiculo, 
        findProduto, findServico, findFuncionario, 
        createOSDetalhes, createProdutoHasOSDetalhes, createExecutaFuncao
    );

    // Cria um cliente no banco de dados para teste
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

    // Cria um veículo no banco de dados para teste
    mySqlVeiculos.items.push({
        placaVeiculo: "SDA-1569",
        marca: "Fiat",
        modelo: "Touro",
        ano: 2011,
        capacidadeOleo: 5,
        cor: "Branco",
        idCliente: 2,
    })

    // Cria três produtos no banco de dados para teste
    mySqlProdutos.items.push({
        codigoBarras: "1",
        descricao: "Óleo para Motor",
        valorCusto: 18.96,
        quantidadeEstoque: 45,
        precoVenda: 36.92
    })

    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Limpador de Motor",
        valorCusto: 23,
        quantidadeEstoque: 50,
        precoVenda: 28
    })

    mySqlProdutos.items.push({
        codigoBarras: "3",
        descricao: "Óleo genérico",
        valorCusto: 20,
        quantidadeEstoque: 25,
        precoVenda: 26
    })

    // Cria dois serviços no banco de dados para teste
    mySqlServicos.items.push({
        idServico: 2,
        descricaoServico: "Troca de Oleo",
        precoServico: 21
    })

    mySqlServicos.items.push({
        idServico: 3,
        descricaoServico: "Limpeza do Motor",
        precoServico: 10
    })

    // Cria dois funcionários no banco de dados para teste
    mySqlFuncionarios.items.push({
        idFuncionario: 2,
        nomeFuncionario: "Luan",
        isAtivo: "sim",
        funcao: "Mecânico",
    })

    mySqlFuncionarios.items.push({
        idFuncionario: 3,
        nomeFuncionario: "Marcos",
        isAtivo: "sim",
        funcao: "Mecânico",
    })

    it("should be able to create a service order", () => { 
        // Cria uma ordem de serviço para ver se está salvando no banco de dados
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "1",
                    quantidadeVendida: 5,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "2",
                    quantidadeVendida: 2,
                    precoTotal: 56,
                    precoUnitario: 28
                },
                {
                    codigoBarras: "3",
                    quantidadeVendida: 1,
                    precoTotal: 26,
                    precoUnitario: 26
                }
            ],
            servicos: [
                {
                    idServico: 2,
                    idFuncionario: 2,
                    observacao: ""
                },
                {
                    idServico: 3,
                    idFuncionario: 3,
                    observacao: ""
                }
            ]
        }).then(() => {
            //Procura no banco para ver se a ordem de serviço foi salva mesmo
            const ordem = mySqlOrdemServico.items.find((ordem) => {
                if (ordem.idOrdemServico === 2) {
                    return ordem;
                }
            })

            // Procura no banco a osDetalhes recém criada
            const osDetalhes = mySqlOSDetalhes.items.find((osDetalhes) => {
                if (osDetalhes.idOrdemServico === ordem.idOrdemServico) {
                    return osDetalhes;
                }
            })

            // Testa se o id do cliente está batendo
            expect(ordem.idCliente).toBe(2);

            // Testa se o nome do cliente está batendo
            expect(mySqlClientes.items.find((cliente) => {
                if (cliente.idCliente === ordem.idCliente) {
                    return cliente;
                }
            }).nomeCliente).toBe("Andre")

            // Testa se a placa do veículo está batendo
            expect(ordem.placaVeiculo).toBe("SDA-1569")

            // Testa se a marca do veículo está batendo
            expect(mySqlVeiculos.items.find((veiculo) => {
                if (veiculo.placaVeiculo === ordem.placaVeiculo) {
                    return veiculo;
                }
            }).marca).toBe("Fiat");

            // Testa se o total está batendo
            expect(ordem.total).toBe(266.6)

            // Testa se o km está batendo
            expect(ordem.km).toBe(2000);

            // Testa se a isFinalizada inicializa como false
            expect(ordem.isFinalizada).toBe(false)

            // Testa se a isPaga inicializa como false
            expect(ordem.isPaga).toBe(false)

            // Procura todos os ProdutoHasOSDetalhes cadastrados no banco de dados
            let produtosCadastrados: Produto_has_OSDetalhes[] = [];
            for (let i = 0; i < mySqlProdutoHasOSDetalhes.items.length; i++) {
                if (mySqlProdutoHasOSDetalhes.items[i].idOSDetalhes === osDetalhes.idOSDetalhes) {
                    produtosCadastrados.push(mySqlProdutoHasOSDetalhes.items[i])
                }
            }
            
            // Verifica se a venda do produto 1 foi cadastrada corretamente
            expect(produtosCadastrados.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.codigoBarras === "1") {
                    return produtoHasOSDetalhes;
                }
            }).quantidadeVendida).toBe(5);

            // Verifica se a venda do produto 2 foi cadastrada corretamente
            expect(produtosCadastrados.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.codigoBarras === "2") {
                    return produtoHasOSDetalhes;
                }
            }).quantidadeVendida).toBe(2);

            // Verifica se a venda do produto 3 foi cadastrada corretamente
            expect(produtosCadastrados.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.codigoBarras === "3") {
                    return produtoHasOSDetalhes;
                }
            }).quantidadeVendida).toBe(1);

            // Procura todos os ExecutaFuncao cadastrados no banco de dados
            let funcoesExecutadas: ExecutaFuncao[] = [];
            for (let i = 0; i < mySqlExecutaFuncao.items.length; i++) {
                if (mySqlExecutaFuncao.items[i].idOSDetalhes === osDetalhes.idOSDetalhes) {
                    funcoesExecutadas.push(mySqlExecutaFuncao.items[i]);
                }
            } 

            // Verifica se o serviço 2 realizado foi cadastrado corretamente
            expect(funcoesExecutadas.find((executaFuncao) => {
                if (executaFuncao.idServico === 2) {
                    return executaFuncao;
                }
            }).idFuncionario).toBe(2);

            // Verifica se o serviço 3 realizado foi cadastrado corretamente
            expect(funcoesExecutadas.find((executaFuncao) => {
                if (executaFuncao.idServico === 3) {
                    return executaFuncao;
                }
            }).idFuncionario).toBe(3);

        }))

    })

    it("should not be able to create a service order", () => {
        // Tenta criar uma ordem de serviço com um idCliente faltando
        expect(createOrdemServico.execute({
            idCliente: null,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: null
        })).rejects.toThrow("Campos faltando")

        // Tenta criar uma ordem de serviço com uma placaVeiculo faltando
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: null
        })).rejects.toThrow("Campos faltando")

        // Tenta criar uma ordem de serviço com um total faltando
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: null,
            km: 2000,
            produtos: null,
            servicos: null
        })).rejects.toThrow("Campos faltando")

        // Tenta criar uma ordem de serviço com um cliente que não existe
        expect(createOrdemServico.execute({
            idCliente: 3,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: null
        })).rejects.toThrow("O cliente não foi encontrado")

        // Tenta criar uma ordem de serviço com um veículo que não existe
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "ADS-1565",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: null
        })).rejects.toThrow("O veículo não foi encontrado")

        // Testar o cadastro dos produtos na ordem de serviço
        // Testar se algum dos dados enviados dos produtos é nulo

        // Testando o código de barras na posição 0
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "",
                    quantidadeVendida: 5,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "2",
                    quantidadeVendida: 2,
                    precoTotal: 56,
                    precoUnitario: 28
                }
            ],
            servicos: null
        })).rejects.toThrow("Um dos campos na posição 0 é nulo!")

        // Testando a quantidadeVendida na posição 0
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "1",
                    quantidadeVendida: null,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "2",
                    quantidadeVendida: null,
                    precoTotal: 56,
                    precoUnitario: 28
                }
            ],
            servicos: null
        })).rejects.toThrow("Um dos campos na posição 0 é nulo!")

        // Testando o precoTotal na posição 1
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "1",
                    quantidadeVendida: 5,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "2",
                    quantidadeVendida: 2,
                    precoTotal: null,
                    precoUnitario: 28
                }
            ],
            servicos: null
        })).rejects.toThrow("Um dos campos na posição 1 é nulo!")

        // Testando o precoUnitario na posição 1
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "1",
                    quantidadeVendida: 5,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "2",
                    quantidadeVendida: 2,
                    precoTotal: 56,
                    precoUnitario: null
                }
            ],
            servicos: null
        })).rejects.toThrow("Um dos campos na posição 1 é nulo!")

        // Testando a criação de uma ordem de serviço com um produto que não existe na posição 1
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: [
                {
                    codigoBarras: "1",
                    quantidadeVendida: 5,
                    precoTotal: 184.6,
                    precoUnitario: 36.92
                },
                {
                    codigoBarras: "4",
                    quantidadeVendida: 2,
                    precoTotal: 56,
                    precoUnitario: 28
                }
            ],
            servicos: null
        })).rejects.toThrow("O produto não foi encontrado")

        // Testar o cadastro de executaFuncao na ordem de serviço
        // Testar se algum dos dados enviados da executaFuncao é nulo
        
        // Tenta criar uma ordem serviço com um idServico nulo na posição 0
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: 
            [
                {
                    idServico: null,
                    idFuncionario: 2,
                    observacao: ""
                },
                {
                    idServico: 3,
                    idFuncionario: 3,
                    observacao: ""
                }
            ]
        })).rejects.toThrow("Um dos campos na posição 0 é nulo!")

        // Tenta criar uma ordem serviço com um idFuncionario nulo na posição 1
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: 
            [
                {
                    idServico: 2,
                    idFuncionario: 2,
                    observacao: ""
                },
                {
                    idServico: 3,
                    idFuncionario: null,
                    observacao: ""
                }
            ]
        })).rejects.toThrow("Um dos campos na posição 1 é nulo!")

        // Tenta criar uma ordem serviço com um serviço que não existe
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: 
            [
                {
                    idServico: 4,
                    idFuncionario: 2,
                    observacao: ""
                },
                {
                    idServico: 3,
                    idFuncionario: 3,
                    observacao: ""
                }
            ]
        })).rejects.toThrow("O serviço não foi encontrado")

        // Tenta criar uma ordem serviço com um serviço que não existe
        expect(createOrdemServico.execute({
            idCliente: 2,
            placaVeiculo: "SDA-1569",
            total: 266.6,
            km: 2000,
            produtos: null,
            servicos: 
            [
                {
                    idServico: 2,
                    idFuncionario: 2,
                    observacao: ""
                },
                {
                    idServico: 3,
                    idFuncionario: 4,
                    observacao: ""
                }
            ]
        })).rejects.toThrow("O funcionário não foi encontrado")
    })

})
