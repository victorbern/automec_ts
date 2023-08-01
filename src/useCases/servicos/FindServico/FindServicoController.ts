import { Request, Response } from "express";
import { FindServicoUC } from "./FindServicoUC";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            })
        }
    }
}