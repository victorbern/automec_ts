import { Request, Response } from "express";
import { SetVeiculoUC } from "./SetVeiculoUC";
import { AppError } from "../../../errors/AppError";

export class SetVeiculoController {
    constructor(
        private setVeiculoUC: SetVeiculoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const placaVeiculo = request.params.placaVeiculo;
        const {marca, modelo, ano, capacidadeOleo, cor, veiculo_idCliente} = request.body;

        try {
            await this.setVeiculoUC.execute({
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                idCliente: veiculo_idCliente,
            })

            return response.status(200).json({error: '', result: 'Dados alterados com sucesso!'})
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ 
                    error: error.message
                });
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }
    }
}