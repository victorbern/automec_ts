import { Request, Response } from "express";
import { DelVeiculoUC } from "./DelVeiculoUC";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error"), result: ''
            })
        }
    }
}