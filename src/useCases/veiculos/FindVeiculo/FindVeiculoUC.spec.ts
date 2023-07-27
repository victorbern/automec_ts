import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindVeiculoUC } from "./FindVeiculoUC";

describe("Find Veículo", () => {
    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findVeiculo = new FindVeiculoUC(mySqlVeiculos, findCliente);

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

    it("should be able to find a vehicle", () => {
        // Tenta procurar pelo veículo recem criado e espera que não dê erro
        expect(findVeiculo.execute({placaVeiculo: "SDA-1569"})).resolves
    })

    it("should not be able to find a vehicle", () => {
        mySqlVeiculos.items.pop()
        // Tenta buscar pelo veículo deletado (deve retornar null)
        expect(findVeiculo.execute({placaVeiculo: "SDA-1569"})).resolves.toBeNull()
    })
})