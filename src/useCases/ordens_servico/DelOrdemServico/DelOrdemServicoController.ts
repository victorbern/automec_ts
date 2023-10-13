import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { DelOrdemServicoUC } from "./DelOrdemServicoUC";

export class DelOrdemServicoController {
    constructor(
        private delOrdemServicoUC: DelOrdemServicoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idOrdemServico = Number(request.params.id);
            await this.delOrdemServicoUC.execute({idOrdemServico});

            return response.status(200).json({error: '', result: 'Ordem de serviço deletada com sucesso!'});

        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
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