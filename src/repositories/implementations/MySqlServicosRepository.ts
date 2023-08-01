import { PrismaClient } from "@prisma/client";
import { IServicosRepository } from "../IServicosRepository";
import { Servico } from "../../entities/Servico";

export class MySqlServicosRepository implements IServicosRepository {
    private prisma = new PrismaClient();

    async save(servico: Servico): Promise<void> {
        await this.prisma.servico.create({ data: servico });
    }

    async findAll(): Promise<Servico[]> {
        const servicos: Servico[] = await this.prisma.servico.findMany();
        return servicos;
    }

    async findByIdServico(idServico: number): Promise<Servico> {
        const servico: Servico = await this.prisma.servico.findUnique({
            where: {
                idServico: idServico,
            },
        });
        return servico;
    }

    async update(servico: Servico): Promise<void> {
        await this.prisma.servico.update({
            where: {
                idServico: servico.idServico,
            },
            data: servico
        })
    }
}