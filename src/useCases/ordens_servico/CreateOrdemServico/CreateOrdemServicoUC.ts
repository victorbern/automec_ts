import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { CreateExecutaFuncaoUC } from "../../ExecutaFuncao/CreateExecutaFuncao/CreateExecutaFuncaoUC";
import { CreateProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/CreateProdutoHasOSDetalhes/CreateProdutoHasOSDetalhesUC";
import { ICreateOrdemServicoRequestDTO } from "./CreateOrdemServicoDTO";
import { CreateOSDetalhesUC } from "../../OSDetalhes/CreateOSDetalhes/CreateOSDetalhesUC";

export class CreateOrdemServicoUC {
    constructor (
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findClienteUC: FindClienteUC,
        private findVeiculoUC: FindVeiculoUC,
        private findProdutoUC: FindProdutoUC,
        private findServicoUC: FindServicoUC,
        private findFuncionarioUC: FindFuncionarioUC,
        private createOSDetalhesUC: CreateOSDetalhesUC,
        private createProdutoHasOSDetalhesUC: CreateProdutoHasOSDetalhesUC,
        private createExecutaFuncaoUC: CreateExecutaFuncaoUC
    ) {}

    async execute(data: ICreateOrdemServicoRequestDTO) {
        try {
            const { idCliente, placaVeiculo, total, km, produtos, servicos } = data;
            const isFinalizada = false;
            const isPaga = false;
            // Verifica se todos os dados foram preenchidos
            if (!idCliente || !placaVeiculo || !total) {
                throw new AppError("Campos faltando", 400);
            }

            // Verifica se o cliente existe
            const clienteExists = await this.findClienteUC.execute({idCliente});
            if (clienteExists == null) {
                throw new AppError("O cliente não foi encontrado", 400);
            }

            // Verifica se o veículo existe
            const veiculoExists = await this.findVeiculoUC.execute({placaVeiculo});
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

                    const produtoExists = await this.findProdutoUC.execute({codigoBarras})
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

                    const servicoExists = await this.findServicoUC.execute({idServico});
                    if (servicoExists == null) {
                        throw new AppError("O serviço não foi encontrado", 400);
                    }

                    const funcionarioExists = await this.findFuncionarioUC.execute({idFuncionario});
                    if (funcionarioExists == null) {
                        throw new AppError("O funcionário não foi encontrado", 400)
                    }
                }
            }

            // Cria uma instância do tipo OrdemServico
            const ordemServico = new OrdemServico({total, km, placaVeiculo, idCliente, isPaga, isFinalizada});

            // Insere esta ordem no banco de dados e pega o id que ela recebeu
            let idOrdemServico = await this.ordemDeServicoRepository.save(ordemServico);

            // Pega a data atual
            let dataOS = new Date(Date.now());

            // Insere no banco uma OSDetalhes para a Ordem de Serviço recém criada e salva o id da OSDetalhes
            const idOSDetalhes = (await this.createOSDetalhesUC.execute({dataOS, idOrdemServico})).idOSDetalhes;

            // Para cada produto, cria um ProdutoHasOSDetalhes no banco de dados
            if (produtos != null) {
                for (let i = 0; i < produtos.length; i++) {
                    const codigoBarras = produtos[i].codigoBarras;
                    const quantidadeVendida = produtos[i].quantidadeVendida;
                    const precoTotal = produtos[i].precoTotal;
                    const precoUnitario = produtos[i].precoUnitario;
                    await this.createProdutoHasOSDetalhesUC.execute({idOSDetalhes, codigoBarras, quantidadeVendida, precoTotal, precoUnitario})
                }
            }

            // Para cada serviço, cria um ExecutaFuncao no banco de dados
            if (servicos != null) {
                for (let i = 0; i < servicos.length; i++) {
                    const idFuncionario = servicos[i].idFuncionario;
                    const idServico = servicos[i].idServico;
                    const observacao = servicos[i].observacao;
                    await this.createExecutaFuncaoUC.execute({idFuncionario, idServico, observacao, idOSDetalhes});
                }
            }

        } catch(error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}