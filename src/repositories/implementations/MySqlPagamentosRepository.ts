import { PrismaClient } from "@prisma/client";
import { IPagamentosRepository } from "../IPagamentosRepository";
import { Pagamento } from "../../entities/Pagamento";

export class MySqlPagamentosRepository implements IPagamentosRepository {
    private prisma = new PrismaClient();

    async save(pagamento: Pagamento): Promise<number> {
        const pagamentoCriado = await this.prisma.pagamento.create({
            data: pagamento,
        })

        return pagamentoCriado.idPagamento;
    }

    async findAll(): Promise<Pagamento[]> {
        const pagamentos: Pagamento[] = await this.prisma.pagamento.findMany();

        return pagamentos;
    }

    async findById(idPagamento: number): Promise<Pagamento> {
        const pagamento: Pagamento = await this.prisma.pagamento.findUnique({
            where: {
                idPagamento: idPagamento,
            },
        });

        return pagamento;
    }

    async findBetweenDates(dataDe: Date, dataAte: Date): Promise<Pagamento[]> {
        const pagamentos: Pagamento[] = await this.prisma.pagamento.findMany({
            where: {
                AND: [
                    {
                        dataHora: {
                            gte: dataDe,
                            lte: dataAte,
                        },
                    },
                ],
            },
        });

        return pagamentos;
    }

    async delete(idPagamento: number): Promise<void> {
        await this.prisma.pagamento.delete({
            where: {
                idPagamento: idPagamento,
            },
        });
    }
}