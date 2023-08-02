import { Request, Response } from "express";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";
import { AppError } from "../../../errors/AppError";

export class FindAllFuncionariosController {
    constructor(
        private findAllFuncionariosUC: FindAllFuncionariosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const funcionarios = await this.findAllFuncionariosUC.execute();
            return response.status(200).json({error: '', result: funcionarios});
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