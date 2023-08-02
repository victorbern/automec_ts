import { Request, Response } from "express";
import { FindAllProdutosUC } from "./FindAllProdutosUC";
import { AppError } from "../../../errors/AppError";

export class FindAllProdutosController {
    constructor(
        private findAllProdutosUC: FindAllProdutosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const produtos = await this.findAllProdutosUC.execute();
            return response.status(200).json({ error: '', result: produtos })
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