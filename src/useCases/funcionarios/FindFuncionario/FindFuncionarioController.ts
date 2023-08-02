import { Request, Response } from "express";
import { FindFuncionarioUC } from "./FindFuncionarioUC";
import { AppError } from "../../../errors/AppError";

export class FindFuncionarioController {
    constructor(
        private findFuncionarioUC: FindFuncionarioUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idFuncionario = Number(request.params.idFuncionario);
        try {
            const funcionario = await this.findFuncionarioUC.execute({idFuncionario})
            if (funcionario) {
                return response.status(200).json({error: '', result: funcionario})
            }
            return response.status(400).json({error: 'Funcionário não encontrado', result: ''})
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