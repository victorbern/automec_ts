import { Request, Response } from "express";
import { DelClienteUC } from "./DelClienteUC";

export class DelClienteController {
    constructor(
        private delClienteUC: DelClienteUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idCliente = Number(request.params.id)

        try {
            await this.delClienteUC.execute({idCliente})

            return response.status(200).json({error: '', result: 'Cliente deletado com sucesso!'})
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error"), result: ''
            })
        }
    }
}