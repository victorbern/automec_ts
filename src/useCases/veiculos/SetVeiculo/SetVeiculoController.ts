import { Request, Response } from "express";
import { SetVeiculoUC } from "./SetVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class SetVeiculoController {
    constructor(
        private setVeiculoUC: SetVeiculoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const placaVeiculo = request.params.placaVeiculo;
            const ano = Number(request.body.ano);
            const capacidadeOleo = Number(request.body.capacidadeOleo);
            const idCliente = Number(request.body.idCliente)
            const {marca, modelo, cor } = request.body;
            await this.setVeiculoUC.execute({
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                idCliente: idCliente,
            })

            return response.status(200).json({error: '', result: 'Dados alterados com sucesso!'})
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