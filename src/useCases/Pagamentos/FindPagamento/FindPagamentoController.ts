import { Request, Response } from "express";
import { FindPagamentoUC } from "./FindPagamentoUC";
import { AppError } from "../../../errors/AppError";

export class FindPagamentoController {
    constructor(
        private findPagamentoUC: FindPagamentoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idPagamento = Number(request.params.id);

            const pagamento = await this.findPagamentoUC.execute({idPagamento});

            if (pagamento) {
                return response.status(200).json({error: '', result: pagamento});
            }

            return response.status(400).json({error: 'Pagamento não encontrado!', result: ''});
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