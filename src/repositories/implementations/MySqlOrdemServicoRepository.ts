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
}