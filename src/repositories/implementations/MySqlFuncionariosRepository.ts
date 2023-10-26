import { PrismaClient } from "@prisma/client";
import { IFuncionariosRepository } from "../IFuncionariosRepository";
import { Funcionario } from "../../entities/Funcionario";

export class MySqlFuncionariosRepository implements IFuncionariosRepository {
    private prisma = new PrismaClient();

    async save(funcionario: Funcionario): Promise<void> {
        await this.prisma.funcionario.create({
            data: funcionario,
        });
    }

    async findAll(): Promise<Funcionario[]> {
        const funcionarios: Funcionario[] =
            await this.prisma.funcionario.findMany();
        return funcionarios;
    }

    async findAllWithFilter(filtro: string): Promise<Funcionario[]> {
        const funcionarios: Funcionario[] = await this.prisma.funcionario.findMany({
            where: {
                OR: [
                    {
                        nomeFuncionario: {
                            contains: filtro,
                        },
                    },
                    {
                        funcao: {
                            contains: filtro,
                        },
                    },
                ],
            },
        });
        return funcionarios;
    }

    async findByIdFuncionario(idFuncionario: number): Promise<Funcionario> {
        const funcionario: Funcionario =
            await this.prisma.funcionario.findUnique({
                where: {
                    idFuncionario: idFuncionario,
                },
            });
        return funcionario;
    }

    async update(funcionario: Funcionario): Promise<void> {
        await this.prisma.funcionario.update({
            where: {
                idFuncionario: funcionario.idFuncionario,
            },
            data: funcionario,
        });
    }

    async delete(idFuncionario: number): Promise<void> {
        await this.prisma.funcionario.delete({
            where: {
                idFuncionario: idFuncionario,
            },
        });
    }
}
