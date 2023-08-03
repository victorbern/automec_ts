import { Request, Response } from "express";
import { CreateFuncionarioUC } from "./CreateFuncionarioUC";
import { AppError } from "../../../errors/AppError";

export class CreateFuncionarioController {
    constructor(
        private createFuncionarioUC: CreateFuncionarioUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let { nomeFuncionario, isAtivo, funcao } = request.body;
            isAtivo = String(isAtivo);
            await this.createFuncionarioUC.execute({
                nomeFuncionario,
                isAtivo,
                funcao
            })
            
            return response.status(201).json({error: '', result: "Funcionário cadastrado com sucesso!"});
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