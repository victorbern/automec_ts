import { Cliente } from "../../entities/Cliente";
import { IClientesRepository } from "../IClientesRepository";
import { PrismaClient } from "@prisma/client";

export class MySqlClientesRepository implements IClientesRepository {
    private prisma = new PrismaClient({
        // log: [
        //     "query", "info", "warn", "error"
        // ]
    });

    async findByCpfCnpj(cpfCnpj: string): Promise<Cliente> {
        const cliente: Cliente = await this.prisma.cliente.findUnique({
            where: {
                cpfCnpj: cpfCnpj,
            },
        });

        return cliente;
    }

    async findAll(): Promise<Cliente[]> {
        const clientes: Array<Cliente> = await this.prisma.cliente.findMany();
        return clientes;
    }

    async findAllWithFilter(filtro: string): Promise<Cliente[]> {
        const clientes: Array<Cliente> = await this.prisma.cliente.findMany({
            where: {
                OR: [
                    {
                        nomeCliente: {
                            contains: filtro,
                        },
                    },
                    {
                        cpfCnpj: {
                            contains: filtro,
                        }
                    }
                ],
            },
        });
        return clientes;
    }

    async findById(idCliente: number): Promise<Cliente> {
        const cliente: Cliente = await this.prisma.cliente.findUnique({
            where: {
                idCliente: idCliente,
            },
        });
        return cliente;
    }

    async save(cliente: Cliente): Promise<void> {
        await this.prisma.cliente.create({
            data: cliente,
        });
    }

    async update(cliente: Cliente): Promise<void> {
        await this.prisma.cliente.update({
            where: {
                idCliente: cliente.idCliente,
            },
            data: cliente,
        });
    }

    async delete(idCliente: number): Promise<void> {
        await this.prisma.cliente.delete({
            where: {
                idCliente: idCliente,
            },
        });
    }
}
