import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";
import { Veiculo } from "../../../entities/Veiculo";

describe("Find All Veículos", () => {
    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findAllVeiculos = new FindAllVeiculosUC(mySqlVeiculos, findCliente)

    // Insere um cliente no banco de dados para teste
    mySqlClientes.items.push({
        idCliente: 2,
        nomeCliente: "Andre",
        cpfCnpj: "475.283.293-21",
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

    // Limpar banco de dados para teste
    mySqlVeiculos.items = [];

    // Insere alguns veículos no banco para teste
    mySqlVeiculos.items.push({
        placaVeiculo: "ABC-1234",
        marca: "Fiat",
        modelo: "Uno",
        ano: 2009,
        capacidadeOleo: 3,
        cor: "Preto",
        idCliente: 2,
    })

    mySqlVeiculos.items.push({
        placaVeiculo: "ADS-1232",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2009,
        capacidadeOleo: 3,
        cor: "Preto",
        idCliente: 2,
    })

    mySqlVeiculos.items.push({
        placaVeiculo: "BBC-2323",
        marca: "Honda",
        modelo: "Civic",
        ano: 2009,
        capacidadeOleo: 3,
        cor: "Preto",
        idCliente: 2,
    })

    it("should be able to find all vehicles without using filter", () => {
        // Busca todos os veículos e verifica se não houve erros
        expect(findAllVeiculos.execute({ filtro: null })).resolves
        expect(findAllVeiculos.execute({})).resolves.toHaveLength(3);

    })

    it("should be able to find some vehicles using filter", () => {
        // Testa o filtro pela placa do veículo
        expect(findAllVeiculos.execute({ filtro: "BC" })).resolves.toStrictEqual(
            [
                {
                    placaVeiculo: "ABC-1234",
                    marca: "Fiat",
                    modelo: "Uno",
                    ano: 2009,
                    capacidadeOleo: 3,
                    cor: "Preto",
                    idCliente: 2,
                    nomeCliente: "Andre",
                    celularCliente: "11953014839"
                },
                {
                    placaVeiculo: "BBC-2323",
                    marca: "Honda",
                    modelo: "Civic",
                    ano: 2009,
                    capacidadeOleo: 3,
                    cor: "Preto",
                    idCliente: 2,
                    nomeCliente: "Andre",
                    celularCliente: "11953014839"
                }
            ]
        );

        // Testa o filtro pela marca do veículo
        expect(findAllVeiculos.execute({ filtro: "Hond" })).resolves.toStrictEqual(
            [
                {
                    placaVeiculo: "BBC-2323",
                    marca: "Honda",
                    modelo: "Civic",
                    ano: 2009,
                    capacidadeOleo: 3,
                    cor: "Preto",
                    idCliente: 2,
                    nomeCliente: "Andre",
                    celularCliente: "11953014839"
                }
            ]
        )

        // Testa o filtro pelo modelo do veículo
        expect(findAllVeiculos.execute({ filtro: "Uno" })).resolves.toStrictEqual(
            [
                {
                    placaVeiculo: "ABC-1234",
                    marca: "Fiat",
                    modelo: "Uno",
                    ano: 2009,
                    capacidadeOleo: 3,
                    cor: "Preto",
                    idCliente: 2,
                    nomeCliente: "Andre",
                    celularCliente: "11953014839"
                }
            ]
        )

    });

    it("should not be able to find any vehicle using filter", () => {
        // Testando a busca de todos os veículos com um filtro que não existe
        expect(findAllVeiculos.execute({ filtro: "Gol" })).resolves.toHaveLength(0);
    })

    it("should not be able to find any vehicle without using filter", () => {
        mySqlVeiculos.items = []
        // Busca todos os veiculos (com a base zerada) e verifica se não houve erros
        expect(findAllVeiculos.execute({ filtro: null })).resolves.toStrictEqual([])
    })
})