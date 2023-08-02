import { Request, Response } from "express";
import { SetFuncionarioUC } from "./SetFuncionarioUC";
import { AppError } from "../../../errors/AppError";

export class SetFuncionarioController {
    constructor(
        private setFuncionarioUC: SetFuncionarioUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idFuncionario = Number(request.params.idFuncionario);
        const { nomeFuncionario, isAtivo, funcao } = request.body;

        try {
            await this.setFuncionarioUC.execute({
                idFuncionario,
                nomeFuncionario,
                isAtivo,
                funcao
            })

            return response.status(200).json({ error: '', result: 'Dados alterados com sucesso!'})
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