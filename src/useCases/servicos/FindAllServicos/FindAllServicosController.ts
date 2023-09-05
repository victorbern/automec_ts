import { Request, Response } from "express";
import { FindAllServicosUC } from "./FindAllServicosUC";
import { AppError } from "../../../errors/AppError";

export class FindAllServicosController {
    constructor(
        private findAllServicosUC: FindAllServicosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filtro = request.params.filtro;
            const servicos = await this.findAllServicosUC.execute({filtro});
            return response.status(200).json({error: '', result: servicos})
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