import { PrismaClient } from "@prisma/client";
import { IVeiculosRepository } from "../IVeiculosRepository";
import { Veiculo } from "../../entities/Veiculo";

export class MySqlVeiculosRepository implements IVeiculosRepository {

    private prisma = new PrismaClient();
    
    async findByPlacaVeiculo(placaVeiculo: string): Promise<Veiculo> {
        const veiculo: Veiculo = await this.prisma.veiculo.findUnique({
            where: {
                placaVeiculo: placaVeiculo,
            }
        })
        return veiculo;
    }

    async findByIdCliente(idCliente: number): Promise<Veiculo[]> {
        const veiculos: Veiculo[] = await this.prisma.veiculo.findMany({
            where: {
                idCliente: idCliente
            }
        })
        return veiculos;
    }

    async findAll(): Promise<Veiculo[]> {
        const veiculos: Array<Veiculo> = await this.prisma.veiculo.findMany();
        return veiculos;
    }

    async save(veiculo: Veiculo): Promise<void> {
        await this.prisma.veiculo.create({
            data: veiculo
        });
    }

    async update(veiculo: Veiculo): Promise<void> {
        await this.prisma.veiculo.update({
            where: {
                placaVeiculo: veiculo.placaVeiculo
            },
            data: veiculo,
        });
    }

    async delete(placaVeiculo: string): Promise<void> {
        await this.prisma.veiculo.delete({
            where: {
                placaVeiculo: placaVeiculo
            }
        })
    }
}