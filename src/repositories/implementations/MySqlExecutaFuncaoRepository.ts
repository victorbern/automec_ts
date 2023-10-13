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

    async findByOSDetalhes(idOSDetalhes: number): Promise<ExecutaFuncao[]>{
        const executaFuncao: ExecutaFuncao[] = await this.prisma.executaFuncao.findMany({
            where: {
                idOSDetalhes: idOSDetalhes,
            }
        })
        
        return executaFuncao;
    }

    async findUnique(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<ExecutaFuncao> {
        const executaFuncao = await this.prisma.executaFuncao.findUnique({
            where: {
                idOSDetalhes_idFuncionario_idServico: {
                    idOSDetalhes: idOSDetalhes,
                    idServico: idServico,
                    idFuncionario: idFuncionario,
                }
            }
        });
        return executaFuncao;
    }

    async update(executaFuncao: ExecutaFuncao): Promise<void> {
        await this.prisma.executaFuncao.update({
            where: {
                idOSDetalhes_idFuncionario_idServico: {
                    idOSDetalhes: executaFuncao.idOSDetalhes,
                    idServico: executaFuncao.idServico,
                    idFuncionario: executaFuncao.idFuncionario,
                },
            },
            data: executaFuncao,
        });
    }

    async delete(idOSDetalhes: number, idServico: number, idFuncionario: number): Promise<void> {
        await this.prisma.executaFuncao.delete({
            where: {
                idOSDetalhes_idFuncionario_idServico: {
                    idOSDetalhes: idOSDetalhes,
                    idServico: idServico,
                    idFuncionario: idFuncionario,
                }
            }
        });
    }
}