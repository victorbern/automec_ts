import { PrismaClient, Veiculo } from "@prisma/client";
import { IVeiculosRepository } from "../IVeiculosRepository";

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

    async save(veiculo: Veiculo): Promise<void> {
        await this.prisma.veiculo.create({
            data: veiculo
        });
    }
}