import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { FindOSDetalhesUC } from "./FindOSDetalhesUC";

describe("Find OSDetalhes", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const findOSDetalhes = new FindOSDetalhesUC(mySqlOSDetalhes);

    mySqlOSDetalhes.items.push({
        idOrdemServico: 2,
        idOSDetalhes: 2,
        dataOS: new Date(Date.now())
    })
    
    it("should be able to find a OSDetalhes", () => {
        expect(findOSDetalhes.execute({idOrdemServico: 2})).resolves.toBe(
            mySqlOSDetalhes.items.find((osDetalhes) => {
                if (osDetalhes.idOrdemServico === 2) {
                    return osDetalhes;
                }
            })
        )
    });

    it("should not be able to find a OSDetalhes", () => {
        // Apaga o último OSDetalhes salvo no banco
        mySqlOSDetalhes.items.pop();
        // Tenta buscar pelo OSDetalhes deletado (deve retornar null)
        expect(findOSDetalhes.execute({idOrdemServico: 2})).resolves.toBeNull();
    })
})