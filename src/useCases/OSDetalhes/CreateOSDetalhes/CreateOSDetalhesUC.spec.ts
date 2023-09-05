import { describe, expect, it } from "vitest";
import { InMemoryOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-OSDetalhesRepository";
import { CreateOSDetalhesUC } from "./CreateOSDetalhesUC";

describe("Criar OSDetalhes", () => {
    const mySqlOSDetalhes = new InMemoryOSDetalhesRepository;
    const createOSDetalhes = new CreateOSDetalhesUC(mySqlOSDetalhes);

    it("should be able to create a OSDetalhes", () => {
        expect(createOSDetalhes.execute({
            dataOS: new Date(Date.now()),
            idOrdemServico: 1
        })).resolves
    })
})