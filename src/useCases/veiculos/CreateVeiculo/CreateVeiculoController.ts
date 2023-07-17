import { Request, Response } from "express";
import { CreateVeiculoUC } from "./CreateVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class CreateVeiculoController {
    constructor (
        private createVeiculoUC: CreateVeiculoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { placaVeiculo, marca, modelo, ano, capacidadeOleo, cor, idCliente } = request.body;

        try {
            await this.createVeiculoUC.execute({
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                idCliente
            })

            return response.status(201).json({result: "Veiculo cadastrado com sucesso!"});
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ 
                    error: error.message
                });
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }
        

    }
}