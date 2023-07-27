import { describe, expect, it } from "vitest";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";
import { FindVeiculoByClienteUC } from "./FindVeiculoByClienteUC";
import { empty } from "@prisma/client/runtime";

describe("Find Veiculo By Cliente", () => {
    const mySqlVeiculos = new InMemoryVeiculosRepository;
    const findVeiculoByCliente = new FindVeiculoByClienteUC(mySqlVeiculos);

    // Cria um veículo no banco de dados para teste
    mySqlVeiculos.items.push({
        placaVeiculo: "SDA-1569",
        marca: "Fiat",
        modelo: "Touro",
        ano: 2011,
        capacidadeOleo: 5,
        cor: "Branco",
        idCliente: 1,
    })

    it("should be able to find a vehicle", () => {
        expect(findVeiculoByCliente.execute({idCliente: 1})).resolves
    })

    it("should not be able to find a vehicle", () => {
        expect(findVeiculoByCliente.execute({idCliente: 2})).resolves.toStrictEqual([])

    })

})