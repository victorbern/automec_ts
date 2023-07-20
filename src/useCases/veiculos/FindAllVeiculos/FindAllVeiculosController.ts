import { Request, Response } from "express";
import { FindAllVeiculosUC } from "./FindAllVeiculosUC";

export class FindAllVeiculosController {
    constructor(
        private findAllVeiculosUC: FindAllVeiculosUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const veiculos = await this.findAllVeiculosUC.execute();
            
            return response.status(200).json({error: '', result: veiculos})
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }
    }
}