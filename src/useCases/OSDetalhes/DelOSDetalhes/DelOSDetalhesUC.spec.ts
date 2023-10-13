import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { DelOSDetalhesUC } from "./DelOSDetalhesUC";

describe("Delete OSDetalhes", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const delOSDetalhes = new DelOSDetalhesUC(mySqlOSDetalhes);

    mySqlOSDetalhes.items.push({
        idOSDetalhes: 2,
        dataOS: new Date(Date.now()),
        idOrdemServico: 2
    })

    it("should be able to delete a OSDetalhes", () => {
        expect(delOSDetalhes.execute({idOSDetalhes: 2}).then(() => {
            expect(mySqlOSDetalhes.items.find((osDetalhes) => {
                if (osDetalhes.idOSDetalhes == 2) {
                    return osDetalhes;
                }
            })).toBe(undefined);
        })).resolves
    })

    it("should not be able to delete a OSDetalhes", () => {
        expect(delOSDetalhes.execute({idOSDetalhes: null})).rejects.toThrow("Campos faltando!");
    })
})