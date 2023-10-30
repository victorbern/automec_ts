import { AppError } from "../../../errors/AppError";
import { IPagamentosRepository } from "../../../repositories/IPagamentosRepository";
import { DelDetalhePagamentoUC } from "../../DetalhePagamento/DelDetalhePagamento/DelDetalhePagamentoUC";
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { DelProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/DelProdutoHasVendaDireta/DelProdutoHasVendaDiretaUC";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { DelVendaDiretaUC } from "../../VendaDireta/DelVendaDireta/DelVendaDiretaUC";
import { FindVendaDiretaUC } from "../../VendaDireta/FindVendaDireta/FindVendaDiretaUC";
import { SetStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico/SetStatusOrdemServicoUC";
import { SetEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto/SetEstoqueProdutoUC";
import { IDelPagamentoRequestDTO } from "./DelPagamentoDTO";

export class DelPagamentoUC {
    constructor(
        private pagamentosRepository: IPagamentosRepository,
        private findAllDetalhePagamento: FindAllDetalhePagamentoUC,
        private setStatusOrdemServico: SetStatusOrdemServicoUC,
        private findOSDetalhes: FindOSDetalhesUC,
        private findAllProdutoHasOSDetalhes: FindAllProdutoHasOSDetalhesUC,
        private setEstoqueProduto: SetEstoqueProdutoUC,
        private delDetalhePagamento: DelDetalhePagamentoUC,
        private findVendaDireta: FindVendaDiretaUC,
        private findAllProdutoHasVendaDireta: FindAllProdutoHasVendaDiretaUC,
        private delProdutoHasVendaDireta: DelProdutoHasVendaDiretaUC,
        private delVendaDireta: DelVendaDiretaUC,
    ) {}

    async execute(data: IDelPagamentoRequestDTO): Promise<void> {
        try {
            const idPagamento = data.idPagamento;

            if (!idPagamento) {
                throw new AppError("Campos faltando", 400);
            }

            const pagamentoExists = await this.pagamentosRepository.findById(idPagamento);

            if (!pagamentoExists) {
                throw new AppError("Pagamento não encontrado!", 400);
            }

            let detalhePagamentoList = await this.findAllDetalhePagamento.execute({idPagamento});

            for (let i in detalhePagamentoList) {
                const idOrdemServico = detalhePagamentoList[i].idOrdemServico;
                const isPaga = false;
                // Atribuição de isPaga = false para as ordens de serviço do pagamento a ser cancelado
                await this.setStatusOrdemServico.execute({idOrdemServico, isPaga})

                // Altera o estoque dos produtos vendidos pela OS
                const idOSDetalhes = (await this.findOSDetalhes.execute({idOrdemServico})).idOSDetalhes;
                let produtoHasOSDetalhesList = await this.findAllProdutoHasOSDetalhes.execute({idOSDetalhes})

                for (let j in produtoHasOSDetalhesList) {
                    const codigoBarras = produtoHasOSDetalhesList[j].codigoBarras;
                    const valorAlteracao = produtoHasOSDetalhesList[j].quantidadeVendida;
                    await this.setEstoqueProduto.execute({codigoBarras, valorAlteracao});
                }
                
                const idDetalhePagamento = detalhePagamentoList[i].idDetalhePagamento;
                this.delDetalhePagamento.execute({idDetalhePagamento});
            }

            let vendaDireta = await this.findVendaDireta.execute({idPagamento});

            if (vendaDireta) {
                const idVendaDireta = vendaDireta.idVendaDireta;
                // Percorre todas as vendas diretas para excluir os produtohasvendadireta correspondentes
                let produtoHasVendaDiretaList = await this.findAllProdutoHasVendaDireta.execute({idVendaDireta});

                for (let i in produtoHasVendaDiretaList) {
                    const idVendaDireta = produtoHasVendaDiretaList[i].idVendaDireta;
                    const codigoBarras = produtoHasVendaDiretaList[i].codigoBarras;
                    await this.delProdutoHasVendaDireta.execute({idVendaDireta, codigoBarras});

                    const valorAlteracao = produtoHasVendaDiretaList[i].quantidadeVendida;
                    // Altera o estoque dos produtos vendidos na venda direta
                    await this.setEstoqueProduto.execute({codigoBarras, valorAlteracao});
                }

                await this.delVendaDireta.execute({idVendaDireta});
            }

            await this.pagamentosRepository.delete(idPagamento);

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}