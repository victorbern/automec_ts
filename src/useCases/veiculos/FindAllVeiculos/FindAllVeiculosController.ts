import { Request, Response } from "express";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";
import { AppError } from "../../../errors/AppError";

export class FindAllVeiculosController {
    constructor(
        private findAllVeiculosUC: FindAllVeiculosUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filtro = request.params.filtro;
            const veiculos = await this.findAllVeiculosUC.execute({filtro});
            
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