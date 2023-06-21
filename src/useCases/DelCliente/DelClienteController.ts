import { Request, Response } from "express";
import { DelClienteUC } from "./DelClienteUC";

export class DelClienteController {
    constructor(
        private delClienteUC: DelClienteUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idCliente = Number(request.params.idCliente)

        try {
            await this.delClienteUC.execute({idCliente})

            return response.json(200).send("Cliente deletado com sucesso!")
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error"), result: ''
            })
        }
    }
}