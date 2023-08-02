import { Request, Response } from "express";
import { FindClienteUC } from "./FindClienteUC";
import { AppError } from "../../../errors/AppError";

export class FindClienteController {
    constructor(
        private findClienteUC: FindClienteUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idCliente = Number(request.params.id)
        try {
            const cliente = await this.findClienteUC.execute({idCliente})
            if (cliente) {
                return response.status(200).json({error:'', result: cliente})
            } 
            return response.status(400).json({error: 'Cliente não encontrado!', result: ''})
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