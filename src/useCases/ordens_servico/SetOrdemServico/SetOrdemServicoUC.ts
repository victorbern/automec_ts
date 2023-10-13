import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { CreateExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao/CreateExecutaFuncaoUC";
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindExecutaFuncaoUC } from "../../ExecutaFuncao/FindExecutaFuncao/FindExecutaFuncaoUC";
import { SetExecutaFuncaoUC } from "../../ExecutaFuncao/SetExecutaFuncao/SetExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindProdutoHasOSDetalhes/FindProdutoHasOSDetalhesUC";
import { SetProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/SetProdutoHasOSDetalhes/SetProdutoHasOSDetalhesUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { ISetOrdemServicoRequestDTO } from "./SetOrdemServicoDTO";

export class SetOrdemServicoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findClienteUC: FindClienteUC,
        private findVeiculoUC: FindVeiculoUC,
        private findProdutoUC: FindProdutoUC,
        private findServicoUC: FindServicoUC,
        private findFuncionarioUC: FindFuncionarioUC,
        private findOSDetalhesUC: FindOSDetalhesUC,
        private findAllProdutoHasOSDetalhesUC: FindAllProdutoHasOSDetalhesUC,
        private delProdutoHasOSDetalhesUC: DelProdutoHasOSDetalhesUC,
        private findProdutoHasOSDetalhesUC: FindProdutoHasOSDetalhesUC,
        private createProdutoHasOSDetalhesUC: CreateProdutoHasOSDetalhesUC,
        private setProdutoHasOSDetalhesUC: SetProdutoHasOSDetalhesUC,
        private findAllExecutaFuncaoUC: FindAllExecutaFuncaoUC,
        private delExecutaFuncaoUC: DelExecutaFuncaoUC,
        private findExecutaFuncaoUC: FindExecutaFuncaoUC,
        private createExecutaFuncaoUC: CreateExecutaFuncaoUC,
        private setExecutaFuncaoUC: SetExecutaFuncaoUC,
    ) { }

    async execute(data: ISetOrdemServicoRequestDTO) {
        try {
            const { idOrdemServico, idCliente, placaVeiculo, total, km, produtos, servicos } = data;

            // Verifica se tem algum dado faltando
            if (!idOrdemServico || !idCliente || !placaVeiculo || !total) {
                throw new AppError("Campos faltando", 400);
            }

            // Verifica se a ordem de serviço existe
            const ordemExists = await this.ordemDeServicoRepository.findById(idOrdemServico);
            if (!ordemExists) {
                throw new AppError("A Ordem de Serviço não foi encontrada", 400);
            }
            // O update de ordem serviço só pode alterar dados de ordens não pagas e não finalizadas
            const isFinalizada = ordemExists.isFinalizada;
            const isPaga = ordemExists.isPaga;
            if (isFinalizada || isPaga) {
                throw new AppError("Não é possível alterar dados de uma ordem de serviço paga/finalizada", 400);
            }

            // Verifica se o cliente existe
            const clienteExists = await this.findClienteUC.execute({ idCliente })
            if (clienteExists == null) {
                throw new AppError("O cliente não foi encontrado", 400);
            }

            // Verifica se o veículo existe
            const veiculoExists = await this.findVeiculoUC.execute({ placaVeiculo })
            if (veiculoExists == null) {
                throw new AppError("O veículo não foi encontrado", 400);
            }

            // Verifica os produtos enviados e se estão certos
            if (produtos != null) {
                for (let i = 0; i < produtos.length; i++) {
                    const { codigoBarras, quantidadeVendida, precoTotal, precoUnitario } = produtos[i];
                    if (!codigoBarras || !quantidadeVendida || !precoTotal || !precoUnitario) {
                        throw new AppError("Um dos campos na posição " + i + " é nulo!", 400);
                    }

                    const produtoExists = await this.findProdutoUC.execute({ codigoBarras })
                    if (produtoExists == null) {
                        throw new AppError("O produto não foi encontrado", 400);
                    }
                }
            }

            // Verifica os serviços enviados e se estão certos
            if (servicos != null) {
                for (let i = 0; i < servicos.length; i++) {
                    const { idServico, idFuncionario } = servicos[i];
                    if (!idServico || !idFuncionario) {
                        throw new AppError("Um dos campos na posição " + i + " é nulo!", 400);
                    }

                    const servicoExists = await this.findServicoUC.execute({ idServico });
                    if (servicoExists == null) {
                        throw new AppError("O serviço não foi encontrado", 400);
                    }

                    const funcionarioExists = await this.findFuncionarioUC.execute({ idFuncionario });
                    if (funcionarioExists == null) {
                        throw new AppError("O funcionário não foi encontrado", 400)
                    }
                }
            }

            // Começa a alterar os valores da ordem de serviço
            const ordemServico = new OrdemServico({ total, km, isFinalizada, isPaga, placaVeiculo, idCliente }, idOrdemServico);
            await this.ordemDeServicoRepository.update(ordemServico);

            // Busca a OSDetalhes para começar a alterar os dados de OSDetalhes
            const osDetalhes = await this.findOSDetalhesUC.execute({ idOrdemServico });

            if (osDetalhes) {
                let idOSDetalhes = osDetalhes.idOSDetalhes;
                if (produtos != null && produtos.length > 0) {

                    // Verifica se houve alterações nos produtos vendidos pela Ordem de Serviço
                    // Busca os produtos vendidos pela Ordem de Serviço que estão no banco de dados
                    let produtoHasOSDetalhesList = await this.findAllProdutoHasOSDetalhesUC.execute({ idOSDetalhes });

                    // Agora confere os produtos que haviam sido vendidos, mas que agora foram removidos da Ordem de Serviço
                    for (let i in produtoHasOSDetalhesList) {
                        let produtoHasOSDetalhesExist = false;
                        for (let j in produtos) {
                            if (produtoHasOSDetalhesList[i].codigoBarras == produtos[j].codigoBarras) {
                                produtoHasOSDetalhesExist = true;
                            }
                        }
                        if (!produtoHasOSDetalhesExist) {
                            let codigoBarras = produtoHasOSDetalhesList[i].codigoBarras;
                            await this.delProdutoHasOSDetalhesUC.execute({ idOSDetalhes, codigoBarras });
                        }
                    }

                    // Agora confere os produtos que não haviam sido cadastrados, mas que agora estão sendo vendidos pela Ordem de Serviço
                    for (let i in produtos) {
                        let { codigoBarras, quantidadeVendida, precoTotal, precoUnitario } = produtos[i];
                        let vendaExist = await this.findProdutoHasOSDetalhesUC.execute({ idOSDetalhes, codigoBarras });
                        if (!vendaExist) {
                            // Como não existe no banco de dados, então criamos
                            await this.createProdutoHasOSDetalhesUC.execute({
                                idOSDetalhes,
                                codigoBarras,
                                quantidadeVendida,
                                precoTotal,
                                precoUnitario
                            })
                        } else {
                            // Caso venha parar aqui, é porque o produto existe no banco, então vamos comparar se os valores batem
                            if (
                                vendaExist.quantidadeVendida !== produtos[i].quantidadeVendida ||
                                vendaExist.precoTotal !== produtos[i].precoTotal
                            ) {
                                // Se entrar aqui, a venda existe no banco de dados, mas pelo menos um dos dados precisa ser atualizado
                                await this.setProdutoHasOSDetalhesUC.execute({
                                    idOSDetalhes,
                                    codigoBarras,
                                    quantidadeVendida,
                                    precoTotal,
                                    precoUnitario
                                })
                            }

                        }
                    }
                }

                if (servicos != null && servicos.length > 0) {
                    // Verifica se houve alteração nos serviços realizados na ordem de serviço
                    // Busca os serviços realizados na ordem de serviço que estão salvos no banco de dados
                    let executaFuncaoList = await this.findAllExecutaFuncaoUC.execute({ idOSDetalhes });
                    // Agora confere os serviços que haviam sido realizados, mas que agora foram removidos da Ordem de Serviço]
                    for (let i in executaFuncaoList) {
                        let executaFuncaoExist = false;
                        for (let j in servicos) {
                            if (executaFuncaoList[i].idServico == servicos[j].idServico &&
                                executaFuncaoList[i].idFuncionario == servicos[j].idFuncionario) {
                                executaFuncaoExist = true;
                            }
                        }
                        if (!executaFuncaoExist) {
                            let idServico = executaFuncaoList[i].idServico;
                            let idFuncionario = executaFuncaoList[i].idFuncionario;
                            await this.delExecutaFuncaoUC.execute({ idOSDetalhes, idServico, idFuncionario });
                        }
                    }

                    // Agora confere os serviços que não haviam sido cadastrados, mas que agora estão sendo executados na Ordem de Serviço
                    for (let i in servicos) {
                        let { idServico, idFuncionario, observacao } = servicos[i];
                        let executaServicoExist = await this.findExecutaFuncaoUC.execute({ idOSDetalhes, idServico, idFuncionario });

                        if (!executaServicoExist) {
                            // Como não existe no banco de dados, então criamos
                            await this.createExecutaFuncaoUC.execute({
                                idOSDetalhes,
                                idServico,
                                idFuncionario,
                                observacao
                            })
                        } else {
                            // Caso venha parar aqui, é porque o produto existe no banco, então vamos comparar se os valores batem
                            if (executaServicoExist.observacao != servicos[i].observacao) {
                                await this.setExecutaFuncaoUC.execute({
                                    idOSDetalhes,
                                    idServico,
                                    idFuncionario,
                                    observacao,
                                })
                            }
                        }
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