import { Request, Response } from "express";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";

export class FindAllFuncionariosController {
    constructor(
        private findAllFuncionariosUC: FindAllFuncionariosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const funcionarios = await this.findAllFuncionariosUC.execute();
            return response.status(200).json({error: '', result: funcionarios});
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }
    }
}