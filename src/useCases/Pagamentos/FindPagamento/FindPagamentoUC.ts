import { Produto_Has_VendaDireta } from "../../../entities/ProdutoHasVendaDireta";
import { VendaDireta } from "../../../entities/VendaDireta";
import { AppError } from "../../../errors/AppError";
import { IPagamentosRepository } from "../../../repositories/IPagamentosRepository";
import { FindAllDetalhePagamentoUC } from "../../DetalhePagamento/FindAllDetalhePagamento/FindAllDetalhePagamentoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { FindVendaDiretaUC } from "../../VendaDireta/FindVendaDireta/FindVendaDiretaUC";
import { FindOrdemServicoUC } from "../../ordens_servico/FindOrdemServico/FindOrdemServicoUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { IFindPagamentoOrdemServico, IFindPagamentoRequestDTO, IFindPagamentoResponseDTO, IFindPagamentoVendaDireta } from "./FindPagamentoDTO";

export class FindPagamentoUC {
    constructor(
        private pagamentosRepository: IPagamentosRepository,
        private findAllDetalhePagamento: FindAllDetalhePagamentoUC,
        private findOrdemServico: FindOrdemServicoUC,
        private findOSDetalhes: FindOSDetalhesUC,
        private findVendaDireta: FindVendaDiretaUC,
        private findAllProdutoHasVendaDireta: FindAllProdutoHasVendaDiretaUC,
        private findProduto: FindProdutoUC,
    ) {}

    async execute(data: IFindPagamentoRequestDTO): Promise<IFindPagamentoResponseDTO> {
        try {
            const idPagamento = data.idPagamento;

            if (!idPagamento) {
                throw new AppError("Campos faltando", 400);
            }

            const pagamento = await this.pagamentosRepository.findById(idPagamento);
            if (pagamento == null || pagamento == undefined) {
                return null;
            }
            
            const detalhePagamentoList = await this.findAllDetalhePagamento.execute({idPagamento});

            const ordensServicoResult: IFindPagamentoOrdemServico[] = [];
            if (detalhePagamentoList) {
                for (let i in detalhePagamentoList) {
                    const idOrdemServico = detalhePagamentoList[i].idOrdemServico;
                    const ordemServico = await this.findOrdemServico.execute({idOrdemServico});
                    
                    let ordem: IFindPagamentoOrdemServico;

                    if (ordemServico) {
                        const total = ordemServico.total;
                        const km = ordemServico.km;
                        const cliente = ordemServico.cliente;
                        const veiculo = ordemServico.veiculo;
                        const osDetalhes = await this.findOSDetalhes.execute({idOrdemServico: detalhePagamentoList[i].idOrdemServico});
                        if (osDetalhes) {
                            const dataOS = osDetalhes.dataOS;
                            ordem = {
                                idOrdemServico: idOrdemServico,
                                total: total,
                                km: km,
                                cliente: cliente,
                                veiculo: veiculo,
                                dataOS: dataOS
                            }
                        } else {
                            ordem = {
                                idOrdemServico: idOrdemServico,
                                total: total,
                                km: km,
                                cliente: cliente,
                                veiculo: veiculo,
                                dataOS: null
                            }
                        }
                    }

                    ordensServicoResult.push({
                        idOrdemServico: ordem.idOrdemServico,
                        total: ordem.total,
                        km: ordem.km,
                        cliente: ordem.cliente,
                        veiculo: ordem.veiculo,
                        dataOS: ordem.dataOS,
                    })

                }
            }

            let vendaDiretaResult: IFindPagamentoVendaDireta[] = [];
            const vendaDireta: VendaDireta = await this.findVendaDireta.execute({idPagamento});

            if (vendaDireta) {
                const produtoHasVendaDiretaList: Produto_Has_VendaDireta[] = await this.findAllProdutoHasVendaDireta.execute({idVendaDireta: vendaDireta.idVendaDireta});
                let venda: IFindPagamentoVendaDireta;
                for (let i in produtoHasVendaDiretaList) {
                    const codigoBarras = produtoHasVendaDiretaList[i].codigoBarras;
                    const quantidadeVendida = produtoHasVendaDiretaList[i].quantidadeVendida;
                    const precoTotal = produtoHasVendaDiretaList[i].precoTotal;
                    const precoUnitario = produtoHasVendaDiretaList[i].precoUnitario;
                    const produto = await this.findProduto.execute({codigoBarras});
                    if (produto) {
                        const descricao = produto.descricao;
                        venda = {
                            codigoBarras, quantidadeVendida, precoTotal, precoUnitario, descricao
                        }
                    } else {
                        venda = {
                            codigoBarras, quantidadeVendida, precoTotal, precoUnitario,
                            descricao: ""
                        }
                    }
                    vendaDiretaResult.push(venda);
                }
            }

            let pagamentoResult: IFindPagamentoResponseDTO;
            pagamentoResult = {
                idPagamento: idPagamento,
                subtotal: pagamento.subtotal,
                total: pagamento.total,
                formaPagamento: pagamento.formaPagamento,
                desconto: pagamento.desconto,
                dataHora: pagamento.dataHora,
                vendaDireta: vendaDiretaResult,
                ordensServico: ordensServicoResult
            };
            
            return pagamentoResult;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}