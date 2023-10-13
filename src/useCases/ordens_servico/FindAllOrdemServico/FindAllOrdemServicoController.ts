import { Request, Response } from "express";
import { FindAllOrdemServicoUC } from "./FindAllOrdemServicoUC";
import { AppError } from "../../../errors/AppError";

export class FindAllOrdemServicoController {
    constructor(
        private findAllOrdemServicoUC: FindAllOrdemServicoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filtro = request.params.filtro;

            const ordens = await this.findAllOrdemServicoUC.execute({filtro});

            return response.status(200).json({error: '', result: ordens});
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