import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { DelProdutoHasOSDetalhesUC } from "./DelProdutoHasOSDetalhesUC";

describe("Delete ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const delProdutoHasOSDetalhes = new DelProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "1",
        quantidadeVendida: 2,
        precoTotal: 5,
        precoUnitario: 2.5,
    })

    it("should be able to delete a ProdutoHasOSDetalhes", () => {
        expect(delProdutoHasOSDetalhes.execute({idOSDetalhes: 2, codigoBarras: "1"}).then(() => {
            expect(mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
                if (produtoHasOSDetalhes.idOSDetalhes == 2 && produtoHasOSDetalhes.codigoBarras == "1") {
                    return produtoHasOSDetalhes;
                }
            })).toBe(undefined);
        })).resolves
    })

    it("should not be able to delete a ProdutoHasOSDetalhes", () => {
        expect(delProdutoHasOSDetalhes.execute({idOSDetalhes: null, codigoBarras: "1"})).rejects.toThrow("Campos faltando")
        expect(delProdutoHasOSDetalhes.execute({idOSDetalhes: 2, codigoBarras: ""})).rejects.toThrow("Campos faltando")
    })
})