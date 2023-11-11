import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
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
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { FindProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindProdutoHasOSDetalhes/FindProdutoHasOSDetalhesUC";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { SetProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/SetProdutoHasOSDetalhes/SetProdutoHasOSDetalhesUC";
import { InMemoryExecutaFuncaoRepository } from "../../../repositories/in-memory/in-memory-ExecutaFuncaoRepository";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { FindExecutaFuncaoUC } from "../../ExecutaFuncao/FindExecutaFuncao/FindExecutaFuncaoUC";
import { CreateExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao/CreateExecutaFuncaoUC";
import { SetExecutaFuncaoUC } from "../../ExecutaFuncao/SetExecutaFuncao/SetExecutaFuncaoUC";
import { SetOrdemServicoUC } from "./SetOrdemServicoUC";

describe("Set Ordem Serviço", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;

    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findVeiculo = new FindVeiculoUC(mySqlVeiculos, findCliente);

    const mySqlProdutos = new InMemoryProdutosRepository;
    const findProduto = new FindProdutoUC(mySqlProdutos);

    const mySqlServicos = new InMemoryServicosRepository;
    const findServico = new FindServicoUC(mySqlServicos);

    const mySqlFuncionarios = new InMemoryFuncionariosRepository;
    const findFuncionario = new FindFuncionarioUC(mySqlFuncionarios);

    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhes);

    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
    const delProdutoHasOSDetalhes = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
    const findProdutoHasOSDetalhes = new FindProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
    const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);
    const setProdutoHasOSDetalhes = new SetProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);
    const delExecutaFuncao = new DelExecutaFuncaoUC(mySqlExecutaFuncao);
    const findExecutaFuncao = new FindExecutaFuncaoUC(mySqlExecutaFuncao);
    const createExecutaFuncao = new CreateExecutaFuncaoUC(mySqlExecutaFuncao);
    const setExecutaFuncao = new SetExecutaFuncaoUC(mySqlExecutaFuncao);

    const setOrdemServicoUC = new SetOrdemServicoUC(
        mySqlOrdemServico, findCliente, findVeiculo, findProduto, findServico, findFuncionario, findOSDetalhes,
        findAllProdutoHasOSDetalhes, delProdutoHasOSDetalhes, findProdutoHasOSDetalhes, createProdutoHasOSDetalhes, setProdutoHasOSDetalhes,
        findAllExecutaFuncao, delExecutaFuncao, findExecutaFuncao, createExecutaFuncao, setExecutaFuncao
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

    mySqlClientes.items.push({
        idCliente: 3,
        nomeCliente: "Lucas",
        cpfCnpj: "169.168.584-23",
        celularCliente: "11956894857",
        telefoneCliente: "40369586",
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

    mySqlVeiculos.items.push({
        placaVeiculo: "ATR-5414",
        marca: "Citroen",
        modelo: "C4",
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
        precoVenda: 20
    })

    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Limpador de Motor",
        valorCusto: 23,
        quantidadeEstoque: 50,
        precoVenda: 30
    })

    mySqlProdutos.items.push({
        codigoBarras: "3",
        descricao: "Óleo genérico",
        valorCusto: 20,
        quantidadeEstoque: 25,
        precoVenda: 40
    })

    mySqlProdutos.items.push({
        codigoBarras: "4",
        descricao: "Lubrificante",
        valorCusto: 20,
        quantidadeEstoque: 25,
        precoVenda: 40
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

    mySqlServicos.items.push({
        idServico: 4,
        descricaoServico: "Troca das velas",
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

    mySqlFuncionarios.items.push({
        idFuncionario: 4,
        nomeFuncionario: "Antonio",
        isAtivo: "sim",
        funcao: "Mecânico",
    })

    mySqlOrdemServico.items.push({
        idOrdemServico: 2,
        total: 2100,
        km: 2000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "SDA-1569",
        idCliente: 2
    })

    mySqlOSDetalhes.items.push({
        idOSDetalhes: 2,
        dataOS: new Date(Date.now()),
        idOrdemServico: 2,
    })

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "1",
        quantidadeVendida: 10,
        precoTotal: 2000,
        precoUnitario: 20
    })

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "2",
        quantidadeVendida: 2,
        precoTotal: 60,
        precoUnitario: 30
    })

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "3",
        quantidadeVendida: 1,
        precoTotal: 40,
        precoUnitario: 40
    })

    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 2,
        observacao: "",
        idOSDetalhes: 2
    })

    mySqlExecutaFuncao.items.push({
        idFuncionario: 3,
        idServico: 3,
        observacao: "",
        idOSDetalhes: 2
    })

    // Criando uma ordem de serviço já paga para testes
    mySqlOrdemServico.items.push({
        idOrdemServico: 10,
        total: 100,
        km: 2000,
        isFinalizada: false,
        isPaga: true,
        placaVeiculo: "FDP-2912",
        idCliente: 1
    })

    // Criando uma ordem de serviço já finalizada para testes
    mySqlOrdemServico.items.push({
        idOrdemServico: 11,
        total: 100,
        km: 2000,
        isFinalizada: true,
        isPaga: false,
        placaVeiculo: "FDP-2912",
        idCliente: 1
    })

    // it("should be able to set a service order", () => {
    //     expect(setOrdemServicoUC.execute({
    //         idOrdemServico: 2,
    //         idCliente: 3,
    //         placaVeiculo: "ATR-5414",
    //         total: 2300,
    //         km: 3000,
    //         produtos: [
    //             {
    //                 codigoBarras: "1",
    //                 quantidadeVendida: 2,
    //                 precoTotal: 200,
    //                 precoUnitario: 100
    //             },
    //             {
    //                 codigoBarras: "3",
    //                 quantidadeVendida: 5,
    //                 precoTotal: 200,
    //                 precoUnitario: 40
    //             },
    //             {
    //                 codigoBarras: "4",
    //                 quantidadeVendida: 6,
    //                 precoTotal: 240,
    //                 precoUnitario: 40
    //             },
    //         ],
    //         servicos: [
    //             {
    //                 idServico: 2,
    //                 idFuncionario: 2,
    //                 observacao: ""
    //             },
    //             {
    //                 idServico: 4,
    //                 idFuncionario: 4,
    //                 observacao: ""
    //             },
    //         ]
    //     }).then(() => {
    //         // Verifica se os dados da ordem de serviço foram alterados
    //         expect(mySqlOrdemServico.items.find((ordemServico) => {
    //             if (ordemServico.idOrdemServico == 2) {
    //                 return ordemServico;
    //             }
    //         })).toStrictEqual({
    //             idOrdemServico: 2,
    //             idCliente: 3,
    //             placaVeiculo: "ATR-5414",
    //             total: 2300,
    //             km: 3000,
    //             isFinalizada: false,
    //             isPaga: false,
    //         });

    //         // Verifica se os dados de ProdutoHasOSDetalhes foram alterados
    //         // Testa pela quantidade vendida o produto com codigo de barras 1
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "1") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).quantidadeVendida).toBe(2)

    //         // Testa pelo preço total o produto com codigo de barras 1
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "1") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoTotal).toBe(200)

    //         // Testa pelo preço unitário o produto com codigo de barras 1
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "1") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoUnitario).toBe(100)

    //         // Testa se apagou corretamente o produto com codigo de barras 2
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "2") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         })).toBeUndefined();

    //         // Testa pela quantidade vendida o produto com codigo de barras 3
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "3") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).quantidadeVendida).toBe(5)

    //         // Testa pelo preço total o produto com codigo de barras 3
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "3") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoTotal).toBe(200)

    //         // Testa pelo preço unitário o produto com codigo de barras 3
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "3") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoUnitario).toBe(40)

    //         // Testa pela quantidade vendida o produto com codigo de barras 4
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "4") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).quantidadeVendida).toBe(6)

    //         // Testa pela quantidade vendida o produto com codigo de barras 4
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "4") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoTotal).toBe(240)

    //         // Testa pela quantidade vendida o produto com codigo de barras 4
    //         expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
    //             if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "4") {
    //                 return produtoHasOSDetalhes;
    //             }
    //         }).precoUnitario).toBe(40)

    //         // Verifica se os dados de ExecutaFuncao foram alterados
    //         // Verifica se o serviço de id 2 ainda está presente
    //         expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
    //             if (executaFuncao.idOSDetalhes == 2 && executaFuncao.idServico == 2 && executaFuncao.idFuncionario == 2) {
    //                 return executaFuncao;
    //             }
    //         }).idServico).toBe(2);

    //         // Verifica se o serviço de id 3 foi apagado
    //         expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
    //             if (executaFuncao.idOSDetalhes == 2 && executaFuncao.idServico == 3 && executaFuncao.idFuncionario == 3) {
    //                 return executaFuncao;
    //             }
    //         })).toBeUndefined();

    //         // Verifica se o serviço de id 4 foi criado
    //         expect(mySqlExecutaFuncao.items.find((executaFuncao) => {
    //             if (executaFuncao.idOSDetalhes == 2 && executaFuncao.idServico == 4 && executaFuncao.idFuncionario == 4) {
    //                 return executaFuncao;
    //             }
    //         }).idServico).toBe(4);

    //     }));

    // })
    it("should not be able to set a service order", () => {
        // Tentando alterar uma ordem de serviço com o id nulo
        expect(setOrdemServicoUC.execute({
            idOrdemServico: null,
            idCliente: 3,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Campos faltando");

        // Tentando alterar uma ordem de serviço com o id do cliente nulo
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 2,
            idCliente: null,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Campos faltando");

        // Tentando alterar uma ordem de serviço uma placa de veiculo nula
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 2,
            idCliente: 3,
            placaVeiculo: "",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Campos faltando");

        // Tentando alterar uma ordem de serviço com o total nulo
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 2,
            idCliente: 3,
            placaVeiculo: "ATR-5414",
            total: null,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Campos faltando");

        // Tentando alterar uma ordem de serviço que não existe
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 3,
            idCliente: 3,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("A Ordem de Serviço não foi encontrada");

        // Tentando alterar dados de uma ordem de serviço já paga
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 10,
            idCliente: 3,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Não é possível alterar dados de uma ordem de serviço paga/finalizada");
        
        // Tentando alterar dados de uma ordem de serviço já finalizada
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 11,
            idCliente: 3,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("Não é possível alterar dados de uma ordem de serviço paga/finalizada");

        // Tentando alterar dados de uma ordem de serviço com um cliente que não existe
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 2,
            idCliente: 4,
            placaVeiculo: "ATR-5414",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("O cliente não foi encontrado");

        // Tentando alterar dados de uma ordem de serviço com um veiculo que não existe
        expect(setOrdemServicoUC.execute({
            idOrdemServico: 2,
            idCliente: 3,
            placaVeiculo: "TST-1111",
            total: 2300,
            km: 3000,
            produtos: [],
            servicos: [],
        })).rejects.toThrow("O veículo não foi encontrado");


    })


})