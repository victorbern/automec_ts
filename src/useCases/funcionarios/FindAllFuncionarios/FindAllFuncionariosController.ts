import { Request, Response } from "express";
import { FindAllFuncionariosUC } from "./FindAllFuncionariosUC";
import { AppError } from "../../../errors/AppError";

export class FindAllFuncionariosController {
    constructor(
        private findAllFuncionariosUC: FindAllFuncionariosUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filtro = request.params.filtro;
            const funcionarios = await this.findAllFuncionariosUC.execute({filtro});
            return response.status(200).json({error: '', result: funcionarios});
        } catch (error) {
            if (error instanceof Error) {
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