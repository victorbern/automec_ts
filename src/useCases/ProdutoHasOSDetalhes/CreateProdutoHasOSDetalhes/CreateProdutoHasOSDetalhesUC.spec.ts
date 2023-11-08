import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { CreateProdutoHasOSDetalhesUC } from "./CreateProdutoHasOSDetalhesUC";

describe("Criar ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const createProdutoHasOSDetalhes = new CreateProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    mySqlProdutoHasOSDetalhes.items = [
        {
            idOSDetalhes: 1,
            codigoBarras: "1",
            quantidadeVendida: 2,
            precoTotal: 60,
            precoUnitario: 30
        }
    ]
    it("should be able to create a ProdutoHasOSDetalhes", () => {
        expect(createProdutoHasOSDetalhes.execute({
            idOSDetalhes: 2,
            codigoBarras: "2",
            quantidadeVendida: 6,
            precoTotal: 66,
            precoUnitario: 12
        }).then(() => {
            let produtoHasOSDetalhes = mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "2") {
                    return produtoHasOSDetalhes;
                }
            });

            expect(produtoHasOSDetalhes.quantidadeVendida).toBe(6);
            expect(produtoHasOSDetalhes.precoTotal).toBe(66);
            expect(produtoHasOSDetalhes.precoUnitario).toBe(12);

        })).resolves
    })

    it("should not be able to create a ProdutoHasOSDetalhes", () => {
        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: null, codigoBarras: "3", quantidadeVendida: 2, precoTotal: 10, precoUnitario: 5})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: 3, codigoBarras: "", quantidadeVendida: 2, precoTotal: 10, precoUnitario: 5})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: 3, codigoBarras: "3", quantidadeVendida: null, precoTotal: 10, precoUnitario: 5})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: 3, codigoBarras: "3", quantidadeVendida: 2, precoTotal: null, precoUnitario: 5})).rejects.toThrow("Campos faltando");
        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: 3, codigoBarras: "3", quantidadeVendida: 2, precoTotal: 10, precoUnitario: null})).rejects.toThrow("Campos faltando");

        expect(createProdutoHasOSDetalhes.execute({idOSDetalhes: 1, codigoBarras: "1", quantidadeVendida: 2, precoTotal: 60, precoUnitario: 30})).rejects.toThrow("A venda já existe");
    })
})