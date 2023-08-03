import { Request, Response } from "express";
import { CreateClienteUC } from "./CreateClienteUC";
import { AppError } from "../../../errors/AppError";

export class CreateClienteController {
    constructor(
        private createClienteUC: CreateClienteUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento } = request.body;
            await this.createClienteUC.execute({ 
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
            return response.status(201).json({error: '', result: "Cliente cadastrado com sucesso!"});
            
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