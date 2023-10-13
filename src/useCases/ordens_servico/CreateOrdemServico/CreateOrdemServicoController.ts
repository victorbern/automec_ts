import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { CreateOrdemServicoUC } from "./CreateOrdemServicoUC";
import qs from 'qs';
import { ICreateOrdemDeServicoProdutos, ICreateOrdemDeServicoServicos, ICreateOrdemServicoRequestDTO } from "./CreateOrdemServicoDTO";

export class CreateOrdemServicoController {
    constructor (
        private createOrdemServicoUC: CreateOrdemServicoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let valores = request.body;
            valores = qs.parse(valores);

            const idCliente = Number(request.body.idCliente);
            const placaVeiculo = request.body.placaVeiculo;
            const total = Number(request.body.total);
            const km = Number(request.body.km);

            let produtos: ICreateOrdemDeServicoProdutos[] = [];
            if (valores.produtos) {
                for (let i in valores.produtos) {
                    const codigoBarras = valores.produtos[i].codigoBarras;
                    const quantidadeVendida = Number(valores.produtos[i].quantidadeVendida);
                    const precoTotal = Number(valores.produtos[i].precoTotal);
                    const precoUnitario = Number(valores.produtos[i].precoUnitario);
                    produtos.push({
                        codigoBarras, quantidadeVendida,
                        precoTotal, precoUnitario,
                    })
                }
            }

            let servicos: ICreateOrdemDeServicoServicos[] = [];
            if (valores.servicos) {
                for (let i in valores.servicos) {
                    const idServico = Number(valores.servicos[i].idServico);
                    const idFuncionario = Number(valores.servicos[i].idFuncionario);
                    const observacao = valores.servicos[i].observacao;
                    servicos.push({
                        idServico, idFuncionario, observacao
                    })
                }
            }
            
            await this.createOrdemServicoUC.execute({
                idCliente,
                placaVeiculo,
                total,
                km,
                produtos,
                servicos
            })

            return response.status(201).json({error: '', result: "Ordem de Serviço cadastrada com sucesso!"})
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