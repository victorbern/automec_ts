import { Request, Response } from "express";
import { SetProdutoUC } from "./SetProdutoUC";
import { AppError } from "../../../errors/AppError";

export class SetProdutoController {
    constructor(
        private setProdutoUC: SetProdutoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const codigoBarras = request.params.codigoBarras;
            const descricao = request.body.descricao;
            const valorCusto = Number(request.body.valorCusto);
            const quantidadeEstoque = Number(request.body.quantidadeEstoque);
            const precoVenda = Number(request.body.precoVenda);

            await this.setProdutoUC.execute({
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda
            });

            return response.status(200).json({error: '', result: 'Dados alterados com sucesso!'});
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