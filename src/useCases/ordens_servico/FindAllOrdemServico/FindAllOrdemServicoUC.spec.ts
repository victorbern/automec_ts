import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindAllClientesUC } from "../../clientes/FindAllClientes/FindAllClientesUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindAllVeiculosUC } from "../../veiculos/FindAllVeiculos/FindAllVeiculosUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindOrdemServicoUC } from "../FindOrdemServico/FindOrdemServicoUC";
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
import { FindOrdemServicoByClienteUC } from "../FindOrdemServicoByCliente/FindOrdemServicoByClienteUC";
import { FindOrdemServicoByVeiculoUC } from "../FindOrdemServicoByVeiculo/FindOrdemServicoByVeiculoUC";
import { FindAllOrdemServicoUC } from "./FindAllOrdemServicoUC";

describe("Find All Ordem Servico", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;

    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);
    const findAllClientes = new FindAllClientesUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findVeiculo = new FindVeiculoUC(mySqlVeiculos, findCliente);
    const findAllVeiculos = new FindAllVeiculosUC(mySqlVeiculos, findCliente);

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

    const mySqlExecutaFuncao = new InMemoryExecutaFuncaoRepository;
    const findAllExecutaFuncao = new FindAllExecutaFuncaoUC(mySqlExecutaFuncao);

    const findOrdemServico = new FindOrdemServicoUC(
        mySqlOrdemServico, findCliente, findVeiculo,
        findOSDetalhes, findAllProdutoHasOSDetalhes, findAllExecutaFuncao,
        findProduto, findServico, findFuncionario,
    )

    const findOrdemServicoByCliente = new FindOrdemServicoByClienteUC(mySqlOrdemServico);
    const findOrdemServicoByVeiculo = new FindOrdemServicoByVeiculoUC(mySqlOrdemServico);

    const findAllOrdemServico = new FindAllOrdemServicoUC(
        mySqlOrdemServico, findAllClientes, findAllVeiculos,
        findOrdemServico, findOrdemServicoByCliente, findOrdemServicoByVeiculo,
    )

    // Limpa todos os registros do banco
    mySqlOrdemServico.items.pop();

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

    // Ordem de serviço 2
    // Cria um cliente no banco de dados para teste
    mySqlClientes.items.push({
        idCliente: 3,
        nomeCliente: "Igor",
        cpfCnpj: "485.485.948-21",
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
        placaVeiculo: "SPA-2839",
        marca: "Fiat",
        modelo: "Gol",
        ano: 2008,
        capacidadeOleo: 5,
        cor: "Branco",
        idCliente: 3,
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
        idOrdemServico: 3,
        total: 154.6,
        km: 3000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "SPA-2839",
        idCliente: 3,
    });

    // Cria uma OSDetalhes para aquela Ordem de Serviço
    const dataOS2 = new Date(Date.now());
    mySqlOSDetalhes.items.push({
        idOrdemServico: 3,
        idOSDetalhes: 3,
        dataOS: dataOS2
    });

    // Adiciona três ProdutoHasOSDetalhes para a OSDetalhes que acabou de ser criada
    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 3,
        codigoBarras: "1",
        quantidadeVendida: 5,
        precoUnitario: 36.92,
        precoTotal: 184.6,
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 3,
        codigoBarras: "2",
        quantidadeVendida: 2,
        precoUnitario: 28,
        precoTotal: 56,
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 3,
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
        idOSDetalhes: 3
    });

    mySqlExecutaFuncao.items.push({
        idFuncionario: 3,
        idServico: 3,
        observacao: "",
        idOSDetalhes: 3
    });

    it("should be able to find all service orders", () => {
        expect(findAllOrdemServico.execute({})).resolves.toStrictEqual([
            {
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
                        precoTotal: 184.6,
                    },
                    {
                        codigoBarras: "2",
                        descricao: "Limpador de Motor",
                        quantidadeVendida: 2,
                        precoUnitario: 28,
                        precoTotal: 56,
                    },
                    {
                        codigoBarras: "3",
                        descricao: "Óleo genérico",
                        quantidadeVendida: 1,
                        precoUnitario: 26,
                        precoTotal: 26,
                    },
                ],
                servicos: [
                    {
                        idServico: 2,
                        descricaoServico: "Troca de Oleo",
                        precoServico: 21,
                        observacao: "",
                        idFuncionario: 2,
                        nomeFuncionario: "Luan",
                    },
                    {
                        idServico: 3,
                        descricaoServico: "Limpeza do Motor",
                        precoServico: 10,
                        observacao: "",
                        idFuncionario: 3,
                        nomeFuncionario: "Marcos",
                    },
                ],
            },
            {
                idOrdemServico: 3,
                total: 154.6,
                km: 3000,
                isFinalizada: false,
                isPaga: false,
                cliente: {
                    idCliente: 3,
                    nomeCliente: "Igor",
                    cpfCnpj: "485.485.948-21",
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
                    placaVeiculo: "SPA-2839",
                    marca: "Fiat",
                    modelo: "Gol",
                    ano: 2008,
                    capacidadeOleo: 5,
                    cor: "Branco",
                    idCliente: 3,
                },
                data: dataOS2,
                produtos: [
                    {
                        codigoBarras: "1",
                        descricao: "Óleo para Motor",
                        quantidadeVendida: 5,
                        precoUnitario: 36.92,
                        precoTotal: 184.6,
                    },
                    {
                        codigoBarras: "2",
                        descricao: "Limpador de Motor",
                        quantidadeVendida: 2,
                        precoUnitario: 28,
                        precoTotal: 56,
                    },
                    {
                        codigoBarras: "3",
                        descricao: "Óleo genérico",
                        quantidadeVendida: 1,
                        precoUnitario: 26,
                        precoTotal: 26,
                    },
                ],
                servicos: [
                    {
                        idServico: 2,
                        descricaoServico: "Troca de Oleo",
                        precoServico: 21,
                        observacao: "",
                        idFuncionario: 2,
                        nomeFuncionario: "Luan",
                    },
                    {
                        idServico: 3,
                        descricaoServico: "Limpeza do Motor",
                        precoServico: 10,
                        observacao: "",
                        idFuncionario: 3,
                        nomeFuncionario: "Marcos",
                    },
                ],
            }
        ])

        // Verifica se a consulta está devolvendo dois valores
        expect(findAllOrdemServico.execute({})).resolves.toHaveLength(2);

    })

    it("should be able to find just one service order using filter", () => {
        // Filtrando pelo Cliente
        expect(findAllOrdemServico.execute({ filtro: "Andre" })).resolves.toStrictEqual([
            {
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
                        precoTotal: 184.6,
                    },
                    {
                        codigoBarras: "2",
                        descricao: "Limpador de Motor",
                        quantidadeVendida: 2,
                        precoUnitario: 28,
                        precoTotal: 56,
                    },
                    {
                        codigoBarras: "3",
                        descricao: "Óleo genérico",
                        quantidadeVendida: 1,
                        precoUnitario: 26,
                        precoTotal: 26,
                    },
                ],
                servicos: [
                    {
                        idServico: 2,
                        descricaoServico: "Troca de Oleo",
                        precoServico: 21,
                        observacao: "",
                        idFuncionario: 2,
                        nomeFuncionario: "Luan",
                    },
                    {
                        idServico: 3,
                        descricaoServico: "Limpeza do Motor",
                        precoServico: 10,
                        observacao: "",
                        idFuncionario: 3,
                        nomeFuncionario: "Marcos",
                    },
                ],
            }
        ])

        // Verificando se está devolvendo apenas um valor quando usa o filtro
        expect(findAllOrdemServico.execute({filtro: "Andre"})).resolves.toHaveLength(1)

        // Filtrando pelo Veiculo
        expect(findAllOrdemServico.execute({ filtro: "Touro" })).resolves.toStrictEqual([
            {
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
                        precoTotal: 184.6,
                    },
                    {
                        codigoBarras: "2",
                        descricao: "Limpador de Motor",
                        quantidadeVendida: 2,
                        precoUnitario: 28,
                        precoTotal: 56,
                    },
                    {
                        codigoBarras: "3",
                        descricao: "Óleo genérico",
                        quantidadeVendida: 1,
                        precoUnitario: 26,
                        precoTotal: 26,
                    },
                ],
                servicos: [
                    {
                        idServico: 2,
                        descricaoServico: "Troca de Oleo",
                        precoServico: 21,
                        observacao: "",
                        idFuncionario: 2,
                        nomeFuncionario: "Luan",
                    },
                    {
                        idServico: 3,
                        descricaoServico: "Limpeza do Motor",
                        precoServico: 10,
                        observacao: "",
                        idFuncionario: 3,
                        nomeFuncionario: "Marcos",
                    },
                ],
            }
        ])

        // Verificando se está devolvendo apenas um valor quando usa o filtro
        expect(findAllOrdemServico.execute({filtro: "Andre"})).resolves.toHaveLength(1)
    })

    it("should be able to find just one service order without using filter", () => {
        // Apaga o último registro do banco de dados
        mySqlOrdemServico.items.pop();

        // Verifica se está retornando apenas um valor
        expect(findAllOrdemServico.execute({})).resolves.toHaveLength(1);
    })

    it("should not be able to find any service order", () => {
        // Apaga o primeiro registro do banco de dados, deixando vazio
        mySqlOrdemServico.items.pop();

        expect(findAllOrdemServico.execute({})).resolves.toHaveLength(0);
    })
})