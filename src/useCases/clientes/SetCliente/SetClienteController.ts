import { Request, Response } from "express";
import { SetClienteUC } from "./SetClienteUC";
import { AppError } from "../../../errors/AppError";

export class SetClienteController {
    constructor(
        private setClienteUC: SetClienteUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const idCliente = Number(request.params.id)
        const { nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento } = request.body;
        try {
            await this.setClienteUC.execute({
                idCliente,
                nomeCliente, 
                cpfCnpj, 
                celularCliente, 
                telefoneCliente, 
                cep, 
                endereco, 
                numero, 
                bairro, 
                cidade, 
                uf, 
                complemento 
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