import { AppError } from "../../../errors/AppError";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta/FindAllProdutoHasVendaDiretaUC";
import { FindVendaDiretaBetweenDatesUC } from "../../VendaDireta/FindVendaDiretaBetweenDates/FindVendaDiretaBetweenDatesUC";
import { FindOrdemServicoBetweenDatesUC } from "../../ordens_servico/FindOrdemServicoBetweenDates/FindOrdemServicoBetweenDatesUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { IGetRelatorioProdutosRequestDTO, IGetRelatorioProdutosResponseDTO } from "./GetRelatorioProdutosDTO";

export class GetRelatorioProdutosUC {
    constructor(
        private findOrdemServicoBetweenDates: FindOrdemServicoBetweenDatesUC,
        private findAllProdutoHasOSDetalhes: FindAllProdutoHasOSDetalhesUC,
        private findProduto: FindProdutoUC,
        private findVendaDiretaBetweenDates: FindVendaDiretaBetweenDatesUC,
        private findAllProdutoHasVendaDireta: FindAllProdutoHasVendaDiretaUC,
    ) { }

    async execute(data: IGetRelatorioProdutosRequestDTO): Promise<IGetRelatorioProdutosResponseDTO[]> {
        try {
            const dataDe = data.dataDe;
            const dataAte = data.dataAte;
            
            let relatorioResult: IGetRelatorioProdutosResponseDTO[] = [];
            
            if (!dataDe || !dataAte) {
                throw new AppError("Campos faltando", 400);
            }
            
            // Apenas as ordens de serviço com isPaga = true contam na soma de produtos vendidos
            let ordens = await this.findOrdemServicoBetweenDates.execute({ dataDe, dataAte });

            if (ordens) {
                for (let i in ordens) {
                    if (ordens[i].isPaga == true) {
                        const idOSDetalhes = ordens[i].idOSDetalhes;
                        let produtoHasOSDetalhesList = await this.findAllProdutoHasOSDetalhes.execute({ idOSDetalhes });
                        for (let h in produtoHasOSDetalhesList) {
                            let existe = false;
                            for (let j in relatorioResult) {
                                if (relatorioResult[j].codigoBarras == produtoHasOSDetalhesList[h].codigoBarras) {
                                    existe = true;
                                    relatorioResult[j].totalVendido += produtoHasOSDetalhesList[h].quantidadeVendida;
                                }
                            }
                            if (!existe) {
                                const codigoBarras = produtoHasOSDetalhesList[h].codigoBarras;
                                const produto = await this.findProduto.execute({ codigoBarras })
                                relatorioResult.push({
                                    codigoBarras: produtoHasOSDetalhesList[h].codigoBarras,
                                    descricao: produto.descricao,
                                    totalVendido: produtoHasOSDetalhesList[h].quantidadeVendida,
                                });
                            }
                        }
                    }
                }
            }

            let vendaDiretaList = await this.findVendaDiretaBetweenDates.execute({ dataDe, dataAte });

            if (vendaDiretaList) {
                for (let i in vendaDiretaList) {
                    const idVendaDireta = vendaDiretaList[i].idVendaDireta;
                    let produtoHasVendaDiretaList = await this.findAllProdutoHasVendaDireta.execute({ idVendaDireta });
                    for (let j in produtoHasVendaDiretaList) {
                        let existe = false;
                        for (let h in relatorioResult) {
                            if (relatorioResult[h].codigoBarras == produtoHasVendaDiretaList[j].codigoBarras) {
                                existe = true;
                                relatorioResult[h].totalVendido += produtoHasVendaDiretaList[j].quantidadeVendida;
                            }
                        }
                        if (!existe) {
                            const codigoBarras = produtoHasVendaDiretaList[j].codigoBarras;
                            const produto = await this.findProduto.execute({ codigoBarras });
                            relatorioResult.push({
                                codigoBarras: produtoHasVendaDiretaList[j].codigoBarras,
                                descricao: produto.descricao,
                                totalVendido: produtoHasVendaDiretaList[j].quantidadeVendida,
                            });
                        }
                    }
                }
            }
            
            return relatorioResult;


        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}