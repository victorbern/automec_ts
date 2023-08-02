import { Request, Response } from "express";
import { FindVeiculoUC } from "./FindVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class FindVeiculoController {
    constructor(
        private findVeiculoUC: FindVeiculoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const placaVeiculo = request.params.placaVeiculo;
            const veiculo = await this.findVeiculoUC.execute({placaVeiculo});

            return response.status(200).json({error: '', result: veiculo})
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