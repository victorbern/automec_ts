import { PrismaClient } from "@prisma/client";
import { IOrdemServicoRepository } from "../IOrdemServicoRepository";
import { OrdemServico } from "../../entities/OrdemServico";

export class MySqlOrdemServicoRepository implements IOrdemServicoRepository {
    private prisma = new PrismaClient();

    async save(ordemServico: OrdemServico): Promise<number> {

        const ordemServicoCriada = await this.prisma.ordemServico.create({
            data: {
                total: ordemServico.total,
                km: ordemServico.km,
                placaVeiculo: ordemServico.placaVeiculo,
                idCliente: ordemServico.idCliente
            }
        })
        return ordemServicoCriada.idOrdemServico;
    }

    async findById(idOrdemServico: number): Promise<OrdemServico> {
        const ordem: OrdemServico = await this.prisma.ordemServico.findUnique({
            where: {
                idOrdemServico: idOrdemServico,
            }
        });

        return ordem;
    }

    async findAll(): Promise<OrdemServico[]> {
        const ordens: OrdemServico[] = await this.prisma.ordemServico.findMany();
        return ordens;
    }
    async findByCliente(idCliente: number): Promise<OrdemServico[]> {
        const ordens: OrdemServico[] = await this.prisma.ordemServico.findMany({
            where: {
                idCliente: idCliente,
            },
        });
        return ordens;
    }
    async findByVeiculo(placaVeiculo: string): Promise<OrdemServico[]> {
        const ordens: OrdemServico[] = await this.prisma.ordemServico.findMany({
            where: {
                placaVeiculo: placaVeiculo,
            },
        });

        return ordens;
    }

    async isPaga(idOrdemServico: number): Promise<Boolean> {
        const ordemServico = await this.prisma.ordemServico.findUnique({
            where: {
                idOrdemServico: idOrdemServico,
            }
        })

        return ordemServico.isPaga;
    }

    async update(ordemServico: OrdemServico): Promise<void> {
        await this.prisma.ordemServico.update({
            where: {
                idOrdemServico: ordemServico.idOrdemServico,
            },
            data: ordemServico,
        })
    }

    async delete(idOrdemServico: number): Promise<void> {
        await this.prisma.ordemServico.delete({
            where: {
                idOrdemServico: idOrdemServico,
            },
        });
    }
}