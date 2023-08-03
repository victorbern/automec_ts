import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { SetVeiculoUC } from "./SetVeiculoUC";

describe("Set Veículo", () => {
    const mySqlClientes = new InMemoryClientesRepository;
    const findCliente = new FindClienteUC(mySqlClientes);

    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const setVeiculo = new SetVeiculoUC(mySqlVeiculos, findCliente);

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

    it("should be able to set a vehicle", () => {
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

        // Tenta alterar os dados do veículo que acabamos de criar
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        }).then(() => {
            // Verifica através do modelo se os dados do veículo foram alterados
            expect(mySqlVeiculos.items.find((veiculo) => {
                if (veiculo.placaVeiculo === "SDA-1569") {
                    return veiculo;
                }
            }).modelo).toBe("Mobi")
        })).resolves
    })

    it("should not be able to set a vehicle", () => {
        // Tenta alterar os dados de veículo sem passar uma placa
        expect(setVeiculo.execute({
            placaVeiculo: "",
            marca: "Fiat",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("Campos faltando")

        // Tenta alterar os dados de veículo sem passar uma marca
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("Campos faltando")

        // Tenta alterar os dados de veículo sem passar um modelo
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("Campos faltando")

        // Tenta alterar os dados de um veículo sem passar um idCliente
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: null,
        })).rejects.toThrow("Campos faltando")

        // Tenta alterar os dados de um veículo que não existe (placa do veículo não encontrada)
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1568",
            marca: "Fiat",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("Veículo não encontrado")

        // Tenta alterar o id do cliente para um id de cliente que não existe
        expect(setVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Mobi",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 3,
        })).rejects.toThrow("Cliente não encontrado")
    })
})