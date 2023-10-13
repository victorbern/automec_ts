import { Request, Response } from "express";
import { SetOrdemServicoUC } from "./SetOrdemServicoUC";
import { AppError } from "../../../errors/AppError";

export class SetOrdemServicoController {
    constructor(
        private setOrdemServicoUC: SetOrdemServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idOrdemServico = Number(request.params.id);
            const { idCliente, placaVeiculo, total, km, produtos, servicos } = request.body;
            await this.setOrdemServicoUC.execute({
                idOrdemServico,
                idCliente,
                placaVeiculo,
                total,
                km,
                produtos,
                servicos
            });

            return response.status(200).json({error: '', result: "Dados alterados com sucesso!"});
            
        } catch (error) {
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