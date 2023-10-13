import { PrismaClient } from "@prisma/client";
import { IOSDetalhesRepository } from "../IOSDetalhesRepository";
import { OSDetalhes } from "../../entities/OSDetalhes";

export class MySqlOSDetalhesRepository implements IOSDetalhesRepository{
    private prisma = new PrismaClient();

    async save(osDetalhes: OSDetalhes): Promise<number> {
        const osDetalhesCriado = await this.prisma.oSDetalhes.create({
            data: osDetalhes
        })

        return osDetalhesCriado.idOSDetalhes;
    }

    async findByOrdemServico(idOrdemServico: number): Promise<OSDetalhes> {
        const osDetalhes: OSDetalhes = await this.prisma.oSDetalhes.findFirst({
            where: {
                idOrdemServico: idOrdemServico,
            }
        })

        return osDetalhes;
    }

    async findById(idOSDetalhes: number): Promise<OSDetalhes> {
        const osDetalhes: OSDetalhes = await this.prisma.oSDetalhes.findUnique({
            where: {
                idOSDetalhes: idOSDetalhes,
            },
        });
        return osDetalhes;
    }

    async delete(idOSDetalhes: number): Promise<void> {
        await this.prisma.oSDetalhes.delete({
            where: {
                idOSDetalhes: idOSDetalhes,
            },
        });
    }
}