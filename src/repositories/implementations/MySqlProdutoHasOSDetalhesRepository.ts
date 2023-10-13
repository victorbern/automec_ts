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

    async findByOSDetalhes(idOSDetalhes: number): Promise<Produto_has_OSDetalhes[]> {
        const produtoHasOSDetalhes: Produto_has_OSDetalhes[] = await this.prisma.produto_has_OSDetalhes.findMany({
            where: {
                idOSDetalhes: idOSDetalhes,
            }
        });

        return produtoHasOSDetalhes;
    }

    async findUnique(idOSDetalhes: number, codigoBarras: string): Promise<Produto_has_OSDetalhes> {
        let produtoHasOSDetalhes = await this.prisma.produto_has_OSDetalhes.findUnique({
            where: {
                idOSDetalhes_codigoBarras: {
                    idOSDetalhes: idOSDetalhes,
                    codigoBarras: codigoBarras
                }
            }
        })

        return produtoHasOSDetalhes;
    }

    async update(produtoHasOSDetalhes: Produto_has_OSDetalhes): Promise<void> {
        await this.prisma.produto_has_OSDetalhes.update({
            where: {
                idOSDetalhes_codigoBarras: {
                    idOSDetalhes: produtoHasOSDetalhes.idOSDetalhes,
                    codigoBarras: produtoHasOSDetalhes.codigoBarras,
                },
            },
            data: produtoHasOSDetalhes,
        })
    }

    async delete(idOSDetalhes: number, codigoBarras: string): Promise<void> {
        await this.prisma.produto_has_OSDetalhes.delete({
            where: {
                idOSDetalhes_codigoBarras: {
                    idOSDetalhes: idOSDetalhes,
                    codigoBarras: codigoBarras,
                }
            }
        });
    }
}