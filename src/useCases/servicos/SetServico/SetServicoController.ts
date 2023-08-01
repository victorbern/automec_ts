import { Request, Response } from "express";
import { SetServicoUC } from "./SetServicoUC";

export class SetServicoControlller {
    constructor(
        private setServicoUC: SetServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idServico = Number(request.params.idServico);
        const { descricaoServico, precoServico } = request.body;

        try {
            await this.setServicoUC.execute({
                idServico,
                descricaoServico,
                precoServico
            })

            return response.status(200).json({ error: '', result: 'Dados alterados com sucesso!' })
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }
    }
}