import { Request, Response } from "express";
import { FindProdutoUC } from "./FindProdutoUC";
import { AppError } from "../../../errors/AppError";

export class FindProdutoController {
    constructor(
        private findProdutoUC: FindProdutoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const codigoBarras = request.params.codigoBarras;
            const produto = await this.findProdutoUC.execute({codigoBarras});

            return response.status(200).json({error: '', result: produto})
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