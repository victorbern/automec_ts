import { Request, Response } from "express";
import { DelServicoUC } from "./DelServicoUC";
import { AppError } from "../../../errors/AppError";

export class DelServicoController {
    constructor(
        private delServicoUC: DelServicoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idServico = Number(request.params.id);

            await this.delServicoUC.execute({idServico});

            return response.status(200).json({error: '', result: "Serviço deletado com sucesso!"})
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