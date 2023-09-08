import { describe, expect, it } from "vitest";
import { InMemoryProdutoHasOSDetalhesRepository } from "../../../repositories/in-memory/in-memory-ProdutoHasOSDetalhesRepository";
import { FindAllProdutoHasOSDetalhesUC } from "./FindAllProdutoHasOSDetalhesUC";
import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";

describe("Find All ProdutoHasOSDetalhes", () => {
    const mySqlProdutoHasOSDetalhes = new InMemoryProdutoHasOSDetalhesRepository;
    const findAllProdutoHasOSDetalhes = new FindAllProdutoHasOSDetalhesUC(mySqlProdutoHasOSDetalhes);

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "1",
        quantidadeVendida: 3,
        precoTotal: 60,
        precoUnitario: 20
    });

    mySqlProdutoHasOSDetalhes.items.push({
        idOSDetalhes: 2,
        codigoBarras: "2",
        quantidadeVendida: 4,
        precoTotal: 80,
        precoUnitario: 20
    });

    it("should be able to find some sold products", () => {
        let produtohasOSDetalhesList: Produto_has_OSDetalhes[] = [];
        mySqlProdutoHasOSDetalhes.items.find((produtoHasOSDetalhes) => {
            if (produtoHasOSDetalhes.idOSDetalhes === 2) {
                produtohasOSDetalhesList.push(produtoHasOSDetalhes);
            }
        })
        expect(findAllProdutoHasOSDetalhes.execute({idOSDetalhes: 2})).resolves.toStrictEqual(produtohasOSDetalhesList);

        // Verifica se está retornando os dois produtos vendidos
        expect(findAllProdutoHasOSDetalhes.execute({idOSDetalhes: 2})).resolves.toHaveLength(2)

    });

    it("should be able to find just one product", () => {
        // Apaga o segundo registro do banco e deve encontrar apenas um produto vendido
        mySqlProdutoHasOSDetalhes.items.pop();
        
        expect(findAllProdutoHasOSDetalhes.execute({idOSDetalhes: 2})).resolves.toHaveLength(1);
    });

    it("should not be able to find any product", () => {
        // Apaga o primeiro registro do banco e não deve encontrar mais nada
        mySqlProdutoHasOSDetalhes.items.pop();

        expect(findAllProdutoHasOSDetalhes.execute({idOSDetalhes: 2})).resolves.toHaveLength(0);
    });
})