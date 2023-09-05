import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { CreateOrdemServicoUC } from "./CreateOrdemServicoUC";

export class CreateOrdemServicoController {
    constructor (
        private createOrdemServicoUC: CreateOrdemServicoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { idCliente, placaVeiculo, total, km, produtos, servicos } = request.body;

            await this.createOrdemServicoUC.execute({
                idCliente,
                placaVeiculo,
                total,
                km,
                produtos,
                servicos
            })

            return response.status(201).json({error: '', result: "Ordem de Serviço cadastrada com sucesso!"})
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