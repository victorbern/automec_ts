import { PrismaClient } from "@prisma/client";
import { IProdutoHasOSDetalhesRepository } from "../IProdutoHasOSDetalhesRepository";
import { Produto_has_OSDetalhes } from "../../entities/ProdutoHasOSDetalhes";

export class MySqlProdutoHasOSDetalhesRepository implements IProdutoHasOSDetalhesRepository {
    private prisma = new PrismaClient();

    async save(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void> {
        await this.prisma.produto_has_OSDetalhes.create({
            data: produtoHasOSDetalhes
        })
    }
}