import { Request, Response } from "express";
import { FindVeiculoUC } from "./FindVeiculoUC";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            })
        }
    }
}