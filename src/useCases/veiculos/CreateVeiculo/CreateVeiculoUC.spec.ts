import { describe, expect, it } from "vitest";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { CreateVeiculoUC } from "./CreateVeiculoUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";

describe("Create Veiculo", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findCliente = new FindClienteUC(mySqlClientes);
    const mySqlVeiculos = new InMemoryVeiculosRepository();

    const createVeiculo = new CreateVeiculoUC(
        mySqlVeiculos,
        findCliente
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

    it("should be able to create a vehicle", () => {
        // Cria um veiculo para ver se está salvando no banco de dados
        expect(
            createVeiculo
                .execute({
                    placaVeiculo: "SDA-1569",
                    marca: "Fiat",
                    modelo: "Touro",
                    ano: 2011,
                    capacidadeOleo: 5,
                    cor: "Branco",
                    idCliente: 2,
                })
                .then(() => {
                    // Procura no banco para ver se o veículo foi salvo mesmo
                    // Testa para ver se a placa confere
                    expect(
                        mySqlVeiculos.items.find((veiculo) => {
                            if (veiculo.placaVeiculo === "SDA-1569") {
                                return veiculo;
                            }
                        }).placaVeiculo
                    ).toBe("SDA-1569");

                    // Testa para ver se a marca confere
                    expect(
                        mySqlVeiculos.items.find((veiculo) => {
                            if (veiculo.placaVeiculo === "SDA-1569") {
                                return veiculo;
                            }
                        }).marca
                    ).toBe("Fiat");

                    // Testa para ver se o modelo confere
                    expect(
                        mySqlVeiculos.items.find((veiculo) => {
                            if (veiculo.placaVeiculo === "SDA-1569") {
                                return veiculo;
                            }
                        }).modelo
                    ).toBe("Touro");

                    // Testa para ver se o id do cliente confere
                    expect(
                        mySqlVeiculos.items.find((veiculo) => {
                            if (veiculo.placaVeiculo === "SDA-1569") {
                                return veiculo;
                            }
                        }).idCliente
                    ).toBe(2);
                })
        ).resolves;
    });

    it("should not be able to create a vehicle", () => {
        // Tenta criar um veículo com a placa faltando (é para falhar)
        expect(createVeiculo.execute({
            placaVeiculo: "",
            marca: "Fiat",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("There are missing fields")

        // Tenta criar um veículo com a marca faltando (é para falhar)
        expect(createVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("There are missing fields")

        // Tenta criar um veículo com o modelo faltando (é para falhar)
        expect(createVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: null,
        })).rejects.toThrow("There are missing fields")

        // Tenta criar um veiculo com uma placa que já existe (é para falhar)
        expect(createVeiculo.execute({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })).rejects.toThrow("The placaVeiculo already exists")

        // Tenta criar um veículo com um cliente que não está cadastrado no banco de dados (é para falhar)
        expect(createVeiculo.execute({
            placaVeiculo: "SDA-1568",
            marca: "Fiat",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 3,
        })).rejects.toThrow("The client does not exist")
    })
});
