import { Request, Response } from "express";
import { CreateClienteUC } from "./CreateClienteUC";

export class CreateClienteController {
    constructor(
        private createClienteUC: CreateClienteUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento } = request.body;
        try {
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
            return response.status(201).json({result: "Cliente cadastrado com sucesso!"});
            
        } catch (error) {
            return response.status(500).json({ 
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }

    }
}