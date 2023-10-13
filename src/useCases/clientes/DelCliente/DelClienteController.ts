import { Request, Response } from "express";
import { DelClienteUC } from "./DelClienteUC";
import { AppError } from "../../../errors/AppError";

export class DelClienteController {
    constructor(
        private delClienteUC: DelClienteUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idCliente = Number(request.params.id)
            
            await this.delClienteUC.execute({idCliente})

            return response.status(200).json({error: '', result: 'Cliente deletado com sucesso!'})
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