import { Request, Response } from "express";
import { FindAllServicosUC } from "./FindAllServicosUC";

export class FindAllServicosController {
    constructor(
        private findAllServicosUC: FindAllServicosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const servicos = await this.findAllServicosUC.execute();
            return response.status(200).json({error: '', result: servicos})
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }
    }
}