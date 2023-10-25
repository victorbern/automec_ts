import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { DelProdutoUC } from "./DelProdutoUC";

export class DelProdutoController {
    constructor(
        private delProdutoUC: DelProdutoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const codigoBarras = request.params.codigo;
            await this.delProdutoUC.execute({codigoBarras});

            return response.status(200).json({error: '', result: "Produto deletado com sucesso!"});
            
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