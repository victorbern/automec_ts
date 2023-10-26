import { Request, Response } from "express";
import { CreatePagamentoUC } from "./CreatePagamentoUC";
import { AppError } from "../../../errors/AppError";
import qs from 'qs';
import { ICreatePagamentoOrdensServico, ICreatePagamentoProduto, ICreatePagamentoVenda } from "./CreatePagamentoDTO";

export class CreatePagamentoController {
    constructor(
        private createPagamentoUC: CreatePagamentoUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let valores = request.body;
            valores = qs.parse(valores);

            const subtotal = Number(request.body.subtotal);
            const total = Number(request.body.total);
            const formaPagamento = request.body.formaPagamento;
            const desconto = Number(request.body.desconto);
            let ordensServico: ICreatePagamentoOrdensServico[] = [];

            if (valores.ordensServico) {
                for (let i in valores.ordensServico) {
                    const idOrdemServico = Number(valores.ordensServico[i].idOrdemServico);
                    ordensServico.push({ idOrdemServico });
                }
            }

            let vendaDireta: ICreatePagamentoVenda;

            if (valores.vendaDireta) {
                let produtos: ICreatePagamentoProduto[] = [];
                for (let i in valores.vendaDireta.produtos) {
                    produtos.push({
                        codigoBarras: valores.vendaDireta.produtos[i].codigoBarras,
                        quantidadeVendida: valores.vendaDireta.produtos[i].quantidadeVendida,
                        precoUnitario: valores.vendaDireta.produtos[i].precoUnitario,
                        precoTotal: valores.vendaDireta.produtos[i].precoTotal,
                    })
                }
                vendaDireta = {
                    total: valores.vendaDireta.total,
                    produtos: produtos,
                }
            }

            await this.createPagamentoUC.execute({
                subtotal, total, formaPagamento,
                desconto, ordensServico, vendaDireta
            })

            return response.status(201).json({error: '', result: "Pagamento cadastrado com sucesso!"})
            
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