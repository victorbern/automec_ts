import { Request, Response } from "express";
import { FindOrdemServicoUC } from "./FindOrdemServicoUC";
import { AppError } from "../../../errors/AppError";

export class FindOrdemServicoController {
    constructor(
        private findOrdemServicoUC: FindOrdemServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response>{
        try {
            const idOrdemServico = Number(request.params.id);
            const ordem = await this.findOrdemServicoUC.execute({idOrdemServico});
            if (ordem) {
                return response.status(200).json({error: '', result: ordem});
            }

            return response.status(400).json({error: 'Ordem não encontrada!', result: ''});

        } catch(error) {
            if (error instanceof Error) {
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({ 
                        error: error.message
                    });
                }
                return response.status(500).json({error: error.message, result: ''});
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }
    }
}