import { Request, Response } from "express";
import { SetServicoUC } from "./SetServicoUC";
import { AppError } from "../../../errors/AppError";

export class SetServicoControlller {
    constructor(
        private setServicoUC: SetServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        
        try {
            const idServico = Number(request.params.idServico);
            const descricaoServico = request.body.descricaoServico;
            const precoServico = Number(request.body.precoServico);
            await this.setServicoUC.execute({
                idServico,
                descricaoServico,
                precoServico
            })

            return response.status(200).json({ error: '', result: 'Dados alterados com sucesso!' })
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