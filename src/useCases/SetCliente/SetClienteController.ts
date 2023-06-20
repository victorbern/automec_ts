import { Request, Response } from "express";
import { SetClienteUC } from "./SetClienteUC";

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
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            })
        }

    }
}