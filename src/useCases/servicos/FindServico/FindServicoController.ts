import { Request, Response } from "express";
import { FindServicoUC } from "./FindServicoUC";
import { AppError } from "../../../errors/AppError";

export class FindServicoController {
    constructor(
        private findServicoUC: FindServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idServico = Number(request.params.idServico);
        try {
            const servico = await this.findServicoUC.execute({idServico});
            if (servico) {
                return response.status(200).json({error: '', result: servico})
            }
            return response.status(400).json({error: 'Serviço não encontrado', result: ''})
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