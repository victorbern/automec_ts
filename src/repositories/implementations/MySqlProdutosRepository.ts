import { PrismaClient } from "@prisma/client";
import { IProdutosRepository } from "../IProdutosRepository";
import { Produto } from "../../entities/Produto";

export class MySqlProdutosRepository implements IProdutosRepository {
    private prisma = new PrismaClient();

    async save(produto: Produto): Promise<void> {
        await this.prisma.produto.create({
            data: produto,
        });
    }

    async findAll(): Promise<Produto[]> {
        const produtos: Produto[] = await this.prisma.produto.findMany();
        return produtos;
    }

    async findAllWithFilter(filtro: string): Promise<Produto[]> {
        const produtos: Produto[] = await this.prisma.produto.findMany({
            where: {
                OR: [
                    {
                        descricao: {
                            contains: filtro,
                        }
                    },
                    {
                        codigoBarras: {
                            contains: filtro,
                        }
                    }
                ]
            }
        });
        return produtos;
    }

    async findByCodigoBarras(codigoBarras: string): Promise<Produto> {
        const produto: Produto = await this.prisma.produto.findUnique({
            where: {
                codigoBarras: codigoBarras,
            },
        });

        return produto;
    }

    async update(produto: Produto): Promise<void> {
        await this.prisma.produto.update({
            where: {
                codigoBarras: produto.codigoBarras,
            },
            data: produto,
        });
    }
}
