import { Request, Response } from "express";
import { CreateProdutoUC } from "./CreateProdutoUC";
import { AppError } from "../../../errors/AppError";

export class CreateProdutoController {
    constructor(
        private createProdutoUC: CreateProdutoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda } = request.body;
            await this.createProdutoUC.execute({
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda
            });

            return response.status(201).json({error: '', result: "Produto cadastrado com sucesso!"})
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