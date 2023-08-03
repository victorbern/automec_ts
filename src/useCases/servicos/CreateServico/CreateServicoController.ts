import { Request, Response } from "express";
import { CreateServicoUC } from "./CreateServicoUC";
import { AppError } from "../../../errors/AppError";

export class CreateServicoController {
    constructor(
        private crateServicoUC: CreateServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        let { descricaoServico, precoServico } = request.body;
        try {
            await this.crateServicoUC.execute({ descricaoServico, precoServico })
            return response.status(201).json({error: '', result: 'Serviço cadastrado com sucesso!'});
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