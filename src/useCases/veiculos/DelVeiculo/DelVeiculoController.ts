import { Request, Response } from "express";
import { DelVeiculoUC } from "./DelVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class DelVeiculoController {
    constructor(
        private delVeiculoUC: DelVeiculoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const placaVeiculo = request.params.placaVeiculo;

        try {
            await this.delVeiculoUC.execute({placaVeiculo})

            return response.status(200).json({error: '', result: 'Veículo deletado com sucesso!'})

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