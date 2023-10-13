import { Request, Response } from "express";
import { CreateVeiculoUC } from "./CreateVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class CreateVeiculoController {
    constructor(
        private createVeiculoUC: CreateVeiculoUC,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        
        try {
            const placaVeiculo = request.body.placaVeiculo;
            const ano = Number(request.body.ano);
            const capacidadeOleo = Number(request.body.capacidadeOleo);
            const idCliente = Number(request.body.idCliente)
            const { marca, modelo, cor } = request.body;
            await this.createVeiculoUC.execute({
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                idCliente
            })

            return response.status(201).json({ error: '', result: "Veiculo cadastrado com sucesso!" });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({
                        error: error.message
                    });
                }
                return response.status(500).json({ error: error.message, result: '' });
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }


    }
}