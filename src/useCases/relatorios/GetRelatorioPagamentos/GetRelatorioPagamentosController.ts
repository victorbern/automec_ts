import { Request, Response } from "express";
import { GetRelatorioPagamentosUC } from "./GetRelatorioPagamentosUC";
import { AppError } from "../../../errors/AppError";

export class GetRelatorioPagamentosController {
    constructor(
        private getRelatorioPagamentosUC: GetRelatorioPagamentosUC
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let dataDeRequest = request.body.dataDe;
            let dataAteRequest = request.body.dataAte;

            if (!dataDeRequest || !dataAteRequest) {
                throw new AppError("Campos faltando", 400)
            }

            let dataDeRequestUTC = Date.parse(dataDeRequest)
            let dataAteRequestUTC = Date.parse(dataAteRequest)

            const dataDe = new Date(dataDeRequestUTC);
            const dataAte = new Date(dataAteRequestUTC);

            const relatorioResult = await this.getRelatorioPagamentosUC.execute({dataDe, dataAte});

            return response.status(200).json({error: '', result: relatorioResult});
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({
                        error: error.message
                    });
                }
                return response.status(500).json({ error: error.message, result: '' });
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }
    }
}