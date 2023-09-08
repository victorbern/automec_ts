import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { FindOrdemServicoUC } from "./FindOrdemServicoUC";
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

describe("Buscar Ordem de Serviço", () => {
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
    });

    // Cria um veículo no banco de dados para teste
    mySqlVeiculos.items.push({
        placaVeiculo: "SDA-1569",
        marca: "Fiat",
        modelo: "Touro",
        ano: 2011,
        capacidadeOleo: 5,
        cor: "Branco",
        idCliente: 2,
    });

    // Cria três produtos no banco de dados para teste
    mySqlProdutos.items.push({
        codigoBarras: "1",
        descricao: "Óleo para Motor",
        valorCusto: 18.96,
        quantidadeEstoque: 45,
        precoVenda: 36.92
    });

    mySqlProdutos.items.push({
        codigoBarras: "2",
        descricao: "Limpador de Motor",
        valorCusto: 23,
        quantidadeEstoque: 50,
        precoVenda: 28
    });

    mySqlProdutos.items.push({
        codigoBarras: "3",
        descricao: "Óleo genérico",
        valorCusto: 20,
        quantidadeEstoque: 25,
        precoVenda: 26
    });

    // Cria dois serviços no banco de dados para teste
    mySqlServicos.items.push({
        idServico: 2,
        descricaoServico: "Troca de Oleo",
        precoServico: 21
    });

    mySqlServicos.items.push({
        idServico: 3,
        descricaoServico: "Limpeza do Motor",
        precoServico: 10
    });

    // Cria dois funcionários no banco de dados para teste
    mySqlFuncionarios.items.push({
        idFuncionario: 2,
        nomeFuncionario: "Luan",
        isAtivo: "sim",
        funcao: "Mecânico",
    });

    mySqlFuncionarios.items.push({
        idFuncionario: 3,
        nomeFuncionario: "Marcos",
        isAtivo: "sim",
        funcao: "Mecânico",
    });

    // Cria a ordem de serviço no banco
    mySqlOrdemServico.items.push({
        idOrdemServico: 2,
        total: 266.6,
        km: 2000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "SDA-1569",
        idCliente: 2,
    });

    // Cria uma OSDetalhes para aquela Ordem de Serviço
    const dataOS = new Date(Date.now());
    mySqlOSDetalhes.items.push({
        idOrdemServico: 2,
        idOSDetalhes: 2,
        dataOS: dataOS
    });

    // Adiciona três ProdutoHasOSDetalhes para a OSDetalhes que acabou de ser criada
    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "1",
        quantidadeVendida: 5,
        precoUnitario: 36.92,
        precoTotal: 184.6,
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "2",
        quantidadeVendida: 2,
        precoUnitario: 28,
        precoTotal: 56,
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "3",
        quantidadeVendida: 1,
        precoUnitario: 26,
        precoTotal: 26,
    });
    
    // Adiciona duas ExecutaFuncao para a OSDetalhes que acabou de ser criada
    mySqlExecutaFuncao.items.push({
        idFuncionario: 2,
        idServico: 2,
        observacao: "",
        idOSDetalhes: 2
    });

    mySqlExecutaFuncao.items.push({
        idFuncionario: 3,
        idServico: 3,
        observacao: "",
        idOSDetalhes: 2
    });

    it("should be able to find a service order", () => {
        // Tenta buscar uma ordem de serviço específica no banco de dados
        expect(findOrdemServico.execute({idOrdemServico: 2})).resolves.toStrictEqual({
            idOrdemServico: 2,
            total: 266.6,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
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
                placaVeiculo: "SDA-1569",
                marca: "Fiat",
                modelo: "Touro",
                ano: 2011,
                capacidadeOleo: 5,
                cor: "Branco",
                idCliente: 2,
            },
            data: dataOS,
            produtos: [
                {
                    codigoBarras: "1",
                    descricao: "Óleo para Motor",
                    quantidadeVendida: 5,
                    precoUnitario: 36.92,
                    precoTotal: 184.6
                },
                {
                    codigoBarras: "2",
                    descricao: "Limpador de Motor",
                    quantidadeVendida: 2,
                    precoUnitario: 28,
                    precoTotal: 56
                },
                {
                    codigoBarras: "3",
                    descricao: "Óleo genérico",
                    quantidadeVendida: 1,
                    precoUnitario: 26,
                    precoTotal: 26
                },
            ],
            servicos: [
                {
                    idServico: 2,
                    descricaoServico: "Troca de Oleo",
                    precoServico: 21,
                    observacao: "",
                    idFuncionario: 2,
                    nomeFuncionario: "Luan"
                },
                {
                    idServico: 3,
                    descricaoServico: "Limpeza do Motor",
                    precoServico: 10,
                    observacao: "",
                    idFuncionario: 3,
                    nomeFuncionario: "Marcos"
                }
            ]
        })
    });

    it("should not be able to find a service order", () => {
        // Tentando procurar uma ordem de serviço sem passar um id
        expect(findOrdemServico.execute({idOrdemServico: null})).rejects.toThrow("Campo id faltante");

        // Procurando por uma ordem de serviço que não existe
        expect(findOrdemServico.execute({idOrdemServico: 3})).resolves.toBeNull();
    })


});