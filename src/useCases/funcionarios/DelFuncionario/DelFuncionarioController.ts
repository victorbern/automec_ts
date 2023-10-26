import { Request, Response } from "express";
import { DelFuncionarioUC } from "./DelFuncionarioUC";
import { AppError } from "../../../errors/AppError";

export class DelFuncionarioController {
    constructor(
        private delFuncionarioUC: DelFuncionarioUC,
    ){}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idFuncionario = Number(request.params.id);

            await this.delFuncionarioUC.execute({idFuncionario});

            return response.status(200).json({error: '', result: "Funcionário deletado com sucesso!"})
            
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