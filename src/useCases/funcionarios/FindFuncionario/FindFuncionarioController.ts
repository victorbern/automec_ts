import { Request, Response } from "express";
import { FindFuncionarioUC } from "./FindFuncionarioUC";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            })
        }
    }
}