import { Pagamento } from "../../../entities/Pagamento";
import { AppError } from "../../../errors/AppError";
import { IPagamentosRepository } from "../../../repositories/IPagamentosRepository";
import { CreateDetalhePagamentoUC } from "../../DetalhePagamento/CreateDetalhePagamento/CreateDetalhePagamentoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { CreateProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/CreateProdutoHasVendaDireta/CreateProdutoHasVendaDiretaUC";
import { CreateVendaDiretaUC } from "../../VendaDireta/CreateVendaDireta/CreateVendaDiretaUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { SetStatusOrdemServicoUC } from "../../ordens_servico/SetStatusOrdemServico/SetStatusOrdemServicoUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { SetEstoqueProdutoUC } from "../../produtos/SetEstoqueProduto/SetEstoqueProdutoUC";
import { ICreatePagamentoRequestDTO } from "./CreatePagamentoDTO";

export class CreatePagamentoUC {
    constructor(
        private pagamentosRepository: IPagamentosRepository,
        private findOrdemServico: FindOrdemServicoUC,
        private findProduto: FindProdutoUC,
        private setStatusOrdemServico: SetStatusOrdemServicoUC,
        private findOSDetalhes: FindOSDetalhesUC,
        private findAllProdutoHasOSDetalhes: FindAllProdutoHasOSDetalhesUC,
        private setEstoqueProduto: SetEstoqueProdutoUC,
        private createDetalhePagamento: CreateDetalhePagamentoUC,
        private createVendaDireta: CreateVendaDiretaUC,
        private createProdutoHasVendaDireta: CreateProdutoHasVendaDiretaUC,
    ) {}

    async execute(data: ICreatePagamentoRequestDTO): Promise<void> {
        try {
            const { subtotal, total, formaPagamento, ordensServico, vendaDireta } = data;
            let desconto = data.desconto;

            if (!subtotal || !total || !formaPagamento) {
                throw new AppError("Campos faltando", 400);
            }

            if (!desconto) {
                desconto = 0;
            }

            // Verifica se alguma das ordens de serviço não existe / já foi paga
            if (ordensServico) {
                for (let i in ordensServico) {
                    const idOrdemServico = ordensServico[i].idOrdemServico;
                    const ordemServico = await this.findOrdemServico.execute({ idOrdemServico });
                    if (!ordemServico) {
                        throw new AppError("A ordem de serviço na posição " + i + " não foi encontrada", 400);
                    }

                    if (ordemServico.isPaga) {
                        throw new AppError("A ordem de serviço na posição " + i + " já foi paga", 400);
                    }
                }
            }

            // Verifica se todos os produtos da venda direta existem
            if (vendaDireta) {
                for (let i in vendaDireta.produtos) {
                    const codigoBarras = vendaDireta.produtos[i].codigoBarras;
                    const produtoExists = await this.findProduto.execute({codigoBarras})

                    if (!produtoExists) {
                        throw new AppError("O produto com o código de barras " + codigoBarras + " não foi encontrado", 400)
                    }
                }
            }

            const dataHora = new Date(Date.now());
            const pagamento = new Pagamento({dataHora, subtotal, total, desconto, formaPagamento});

            const idPagamento = await this.pagamentosRepository.save(pagamento);

            if (ordensServico) {
                for (let i in ordensServico) {
                    const idOrdemServico = ordensServico[i].idOrdemServico;
                    const isPaga = true;
                    // Atribui o valor isPaga = true na ordem de serviço paga
                    await this.setStatusOrdemServico.execute({idOrdemServico, isPaga})

                    const osDetalhes = await this.findOSDetalhes.execute({idOrdemServico});
                    const produtoHasOSDetalhesList = await this.findAllProdutoHasOSDetalhes.execute({idOSDetalhes: osDetalhes.idOSDetalhes});

                    // Altera o estoque dos produtos vendidos
                    for (let i in produtoHasOSDetalhesList) {
                        const codigoBarras = produtoHasOSDetalhesList[i].codigoBarras;
                        const valorAlteracao = produtoHasOSDetalhesList[i].quantidadeVendida * -1;
                        await this.setEstoqueProduto.execute({codigoBarras, valorAlteracao});
                    }

                    // Cria um DetalhePagamento para cada Ordem de Serviço que foi paga
                    await this.createDetalhePagamento.execute({idOrdemServico, idPagamento});
                }
            }

            if (vendaDireta) {
                let dataHora = new Date(Date.now());
                const total = vendaDireta.total;
                let idVendaDireta = (await this.createVendaDireta.execute({idPagamento, total, dataHora})).idVendaDireta;

                if (vendaDireta.produtos) {
                    for (let i in vendaDireta.produtos) {
                        const codigoBarras = vendaDireta.produtos[i].codigoBarras;
                        const quantidadeVendida = vendaDireta.produtos[i].quantidadeVendida;
                        const precoTotal = vendaDireta.produtos[i].precoTotal;
                        const precoUnitario = vendaDireta.produtos[i].precoUnitario;

                        let valorAlteracao = quantidadeVendida * -1;
                        await this.setEstoqueProduto.execute({codigoBarras, valorAlteracao})

                        await this.createProdutoHasVendaDireta.execute({
                            codigoBarras, idVendaDireta, quantidadeVendida, precoTotal, precoUnitario
                        })
                    }
                }
            }

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}