import { PrismaClient } from "@prisma/client";
import { IProdutoHasVendaDiretaRepository } from "../IProdutoHasVendaDiretaRepository";
import { Produto_Has_VendaDireta } from "../../entities/ProdutoHasVendaDireta";

export class MySqlProdutoHasVendaDiretaRepository implements IProdutoHasVendaDiretaRepository {
    private prisma = new PrismaClient();

    async save(produtoHasVendaDireta: Produto_Has_VendaDireta): Promise<void> {
        await this.prisma.produto_has_VendaDireta.create({
            data: produtoHasVendaDireta,
        })
    }

    async findByVendaDireta(idVendaDireta: number): Promise<Produto_Has_VendaDireta[]> {
        const produtoHasVendaDiretaList: Produto_Has_VendaDireta[] = await this.prisma.produto_has_VendaDireta.findMany({
            where: {
                idVendaDireta: idVendaDireta,
            },
        });

        return produtoHasVendaDiretaList;
    }

    async findUnique(idVendaDireta: number, codigoBarras: string): Promise<Produto_Has_VendaDireta> {
        const produtoHasVendaDireta: Produto_Has_VendaDireta = await this.prisma.produto_has_VendaDireta.findUnique({
            where: {
                codigoBarras_idVendaDireta: {
                    idVendaDireta: idVendaDireta,
                    codigoBarras: codigoBarras,
                },
            },
        });

        return produtoHasVendaDireta
    }

    async delete(idVendaDireta: number, codigoBarras: string): Promise<void> {
        await this.prisma.produto_has_VendaDireta.delete({
            where: {
                codigoBarras_idVendaDireta: {
                    idVendaDireta: idVendaDireta,
                    codigoBarras: codigoBarras,
                },
            },
        });
    }
}