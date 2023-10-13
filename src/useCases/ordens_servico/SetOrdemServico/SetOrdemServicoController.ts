import { Request, Response } from "express";
import { SetOrdemServicoUC } from "./SetOrdemServicoUC";
import { AppError } from "../../../errors/AppError";
import qs from 'qs';
import { ISetOrdemServicoProdutos, ISetOrdemServicoServicos } from "./SetOrdemServicoDTO";

export class SetOrdemServicoController {
    constructor(
        private setOrdemServicoUC: SetOrdemServicoUC
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const idOrdemServico = Number(request.params.id);
            let valores = request.body;
            valores = qs.parse(valores);
            const idCliente = Number(valores.idCliente);
            const placaVeiculo = valores.placaVeiculo;
            const total = Number(valores.total);
            const km = Number(valores.km);

            let produtos: ISetOrdemServicoProdutos[] = [];
            if (valores.produtos) {
                for (let i in valores.produtos) {
                    const codigoBarras = valores.produtos[i].codigoBarras;
                    const quantidadeVendida = Number(valores.produtos[i].quantidadeVendida);
                    const precoTotal = Number(valores.produtos[i].precoTotal);
                    const precoUnitario = Number(valores.produtos[i].precoUnitario);
                    produtos.push({
                        codigoBarras, quantidadeVendida,
                        precoTotal, precoUnitario,
                    });
                }
            }

            let servicos: ISetOrdemServicoServicos[] = [];
            if (valores.servicos) {
                for (let i in valores.servicos) {
                    const idServico = Number(valores.servicos[i].idServico);
                    const idFuncionario = Number(valores.servicos[i].idFuncionario);
                    const observacao = valores.servicos[i].observacao;
                    servicos.push({
                        idServico, idFuncionario, observacao,
                    });
                }
            }
            await this.setOrdemServicoUC.execute({
                idOrdemServico,
                idCliente,
                placaVeiculo,
                total,
                km,
                produtos,
                servicos
            });

            return response.status(200).json({error: '', result: "Dados alterados com sucesso!"});
            
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