import { Request, Response } from "express";
import { FindClienteUC } from "./FindClienteUC";
import { Cliente } from "../../entities/Cliente";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            })
        }
    }
}