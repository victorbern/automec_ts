import { PrismaClient } from "@prisma/client";
import { IVendaDiretaRepository } from "../IVendaDiretaRepository";
import { VendaDireta } from "../../entities/VendaDireta";

export class MySqlVendaDiretaRepository implements IVendaDiretaRepository {
    private prisma = new PrismaClient();

    async save(vendaDireta: VendaDireta): Promise<number> {
        const vendaDiretaCriada = await this.prisma.vendaDireta.create({
            data: vendaDireta,
        })

        return vendaDiretaCriada.idVendaDireta;
    }

    async findById(idVendaDireta: number): Promise<VendaDireta> {
        const vendaDireta: VendaDireta = await this.prisma.vendaDireta.findUnique({
            where: {
                idVendaDireta: idVendaDireta,
            },
        });
        return vendaDireta;
    }

    async findByPagamento(idPagamento: number): Promise<VendaDireta> {
        const vendaDireta: VendaDireta = await this.prisma.vendaDireta.findFirst({
            where: {
                idPagamento: idPagamento,
            },
        });

        return vendaDireta;
    }

    async delete(idVendaDireta: number): Promise<void> {
        await this.prisma.vendaDireta.delete({
            where: {
                idVendaDireta: idVendaDireta,
            },
        });
    }
}