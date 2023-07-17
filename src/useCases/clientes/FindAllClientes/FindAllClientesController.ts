import { Request, Response } from "express";
import { FindAllClientesUC } from "./FindAllClientesUC";
import { Cliente } from "../../../entities/Cliente";

export class FindAllClientesController {
    constructor(
        private findAllClientesUC: FindAllClientesUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.findAllClientesUC.execute();

            const clientes = result.map(cliente => {
                return {
                    idCliente: cliente.idCliente,
                    nomeCliente: cliente.nomeCliente,
                    cpfCnpj: cliente.cpfCnpj,
                    celularCliente: cliente.celularCliente,
                    telefoneCliente: cliente.telefoneCliente,
                    cep: cliente.cep,
                    endereco: cliente.endereco,
                    numero: cliente.numero,
                    bairro: cliente.bairro,
                    cidade: cliente.cidade,
                    uf: cliente.uf,
                    complemento: cliente.complemento,
                }
            })

            return response.status(200).json({error: '', result: clientes})
        } catch (error) {
            return response.status(500).json({
                error: (error instanceof Error ? error.message : "Unexpected error")
            });
        }
    }
}