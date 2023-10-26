import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { DelPagamentoUC } from "./DelPagamentoUC";

export class DelPagamentoController {
    constructor(
        private delPagamentoUC: DelPagamentoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idPagamento = Number(request.params.id);

            await this.delPagamentoUC.execute({idPagamento});

            return response.status(200).json({error: '', result: "Pagamento deletado com sucesso!"});
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