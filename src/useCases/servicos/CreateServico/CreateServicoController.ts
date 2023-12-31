import { Request, Response } from "express";
import { CreateServicoUC } from "./CreateServicoUC";
import { AppError } from "../../../errors/AppError";

export class CreateServicoController {
    constructor(
        private crateServicoUC: CreateServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const descricaoServico = request.body.descricaoServico;
            const precoServico= Number(request.body.precoServico);
            await this.crateServicoUC.execute({ descricaoServico, precoServico })
            return response.status(201).json({error: '', result: 'Serviço cadastrado com sucesso!'});
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