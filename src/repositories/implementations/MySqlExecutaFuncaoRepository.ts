import { PrismaClient } from "@prisma/client";
import { IExecutaFuncaoRepository } from "../IExecutaFuncaoRepository";
import { ExecutaFuncao } from "../../entities/ExecutaFuncao";

export class MySqlExecutaFuncaoRepository implements IExecutaFuncaoRepository {
    private prisma = new PrismaClient();

    async save(executaFuncao: ExecutaFuncao): Promise<void> {
        await this.prisma.executaFuncao.create({
            data: executaFuncao,
        })
    }
}