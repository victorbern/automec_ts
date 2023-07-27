import { describe, expect, it } from "vitest";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { DelVeiculoUC } from "./DelVeiculoUC";

describe("Delete Vehicle", () => {
    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const delVeiculo = new DelVeiculoUC(mySqlVeiculos);

    it("should be able to delete a vehicle", () => {
        // Cria um veículo para testes
        mySqlVeiculos.items.push({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 2,
        })
        // Tenta deletar o veículo recém criado
        expect(delVeiculo.execute({placaVeiculo: "SDA-1569"}).then(() => {
            expect(mySqlVeiculos.items.find((veiculo) => {
                if (veiculo.placaVeiculo === "SDA-1569") {
                    return veiculo;
                }
            })).toBe(undefined)
        })).resolves
    })

    it("should not be able to delete a vehicle", () => {
        // Tenta deletar um veículo que não existe
        expect(delVeiculo.execute({placaVeiculo: "SDA-1568"})).rejects.toThrow("Vehicle does not found");
    })
})