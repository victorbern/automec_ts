import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { CreateProdutoHasOSDetalhesUC } from "./CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";

describe("Criar ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    it("should be able to create a ProdutoHasOSDetalhes", () => {
        expect(createProdutoHasOSDetalhes.execute({
            
        }))
    })
})