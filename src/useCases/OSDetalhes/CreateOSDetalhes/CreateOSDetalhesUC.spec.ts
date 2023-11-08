import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { CreateOSDetalhesUC } from "./CreateOSDetalhesUC";
import { OSDetalhes } from "../../../entities/OSDetalhes";

describe("Criar OSDetalhes", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const createOSDetalhes = new CreateOSDetalhesUC(mySqlOSDetalhes);

    const data = new Date(Date.parse("2022-10-01"));

    mySqlOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            dataOS: data,
            idOrdemServico: 1,
        }
    ]

    it("should be able to create a OSDetalhes", () => {
        expect(createOSDetalhes.execute({
            dataOS: data,
            idOrdemServico: 1
        }).then((osDetalhes) => {
            expect(mySqlOSDetalhes.items.find((osDetalhes) => {
                if (osDetalhes.idOSDetalhes == 2) {
                    return osDetalhes;
                }
            }).dataOS).toBe(data);
        })).resolves;

        // Criando uma OSDetalhes sem passar uma data
        expect(createOSDetalhes.execute({idOrdemServico: 2, dataOS: null}).then((osDetalhes) => {
            expect(mySqlOSDetalhes.items.find((osDetalhes) => {
                if(osDetalhes.idOSDetalhes == 3) {
                    return osDetalhes;
                }
            }).dataOS).instanceOf(Date);
        }))
    });

    it("should not be able to create a OSDetalhes", () => {
        expect(createOSDetalhes.execute({idOrdemServico: null, dataOS: data})).rejects.toThrow("Campos faltando");
    })
})