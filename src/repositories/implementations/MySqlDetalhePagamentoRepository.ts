import { PrismaClient } from "@prisma/client";
import { IDetalhePagamentoRepository } from "../IDetalhePagamentoRepository";
import { DetalhePagamento } from "../../entities/DetalhePagamento";

export class MySqlDetalhePagamentoRepository implements IDetalhePagamentoRepository {
    private prisma = new PrismaClient();

    async save(detalhePagamento: DetalhePagamento): Promise<void> {
        await this.prisma.detalhePagamento.create({
            data: detalhePagamento,
        })
    }

    async findByPagamento(idPagamento: number): Promise<DetalhePagamento[]> {
        const detalhePagamentoList: DetalhePagamento[] = await this.prisma.detalhePagamento.findMany({
            where: {
                idPagamento: idPagamento,
            }
        });

        return detalhePagamentoList;
    }

    async findById(idDetalhePagamento: number): Promise<DetalhePagamento> {
        const detalhePagamento: DetalhePagamento = await this.prisma.detalhePagamento.findUnique({
            where: {
                idDetalhePagamento: idDetalhePagamento,
            },
        });

        return detalhePagamento;
    }


    async delete(idDetalhePagamento: number): Promise<void> {
        await this.prisma.detalhePagamento.delete({
            where: {
                idDetalhePagamento: idDetalhePagamento,
            },
        });
    }
}