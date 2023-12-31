import { Request, Response } from "express";
import { FindVeiculoByClienteUC } from "./FindVeiculoByClienteUC";
import { AppError } from "../../../errors/AppError";

export class FindVeiculoByClienteController {
    constructor(
        private findVeiculoByClienteUC: FindVeiculoByClienteUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idCliente = Number(request.params.id);
            
            const veiculos = await this.findVeiculoByClienteUC.execute({idCliente});

            return response.status(200).json({error: '', result: veiculos})
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