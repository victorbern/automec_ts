import { Cliente } from "../../../entities/Cliente";
import { ExecutaFuncao } from "../../../entities/ExecutaFuncao";
import { Funcionario } from "../../../entities/Funcionario";
import { OSDetalhes } from "../../../entities/OSDetalhes";
import { Produto } from "../../../entities/Produto";
import { Produto_has_OSDetalhes } from "../../../entities/ProdutoHasOSDetalhes";
import { Servico } from "../../../entities/Servico";
import { Veiculo } from "../../../entities/Veiculo";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { FindFuncionarioUC } from "../../funcionarios/FindFuncionario/FindFuncionarioUC";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { FindServicoUC } from "../../servicos/FindServico/FindServicoUC";
import { FindVeiculoUC } from "../../veiculos/FindVeiculo/FindVeiculoUC";
import { IFindOrdemServicoRequestDTO, IFindOrdemServicoResponseDTO } from "./FindOrdemServicoDTO";

export class FindOrdemServicoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findCliente: FindClienteUC,
        private findVeiculo: FindVeiculoUC,
        private findOSDetalhes: FindOSDetalhesUC,
        private findAllProdutoHasOSDetalhes: FindAllProdutoHasOSDetalhesUC,
        private findAllExecutaFuncao: FindAllExecutaFuncaoUC,
        private findProduto: FindProdutoUC,
        private findServico: FindServicoUC,
        private findFuncionario: FindFuncionarioUC
    ) {}

    async execute(data: IFindOrdemServicoRequestDTO): Promise<IFindOrdemServicoResponseDTO> {
        try {
            if (!data.idOrdemServico) {
                throw new AppError("Campo id faltante", 400);
            }
            const ordem = await this.ordemDeServicoRepository.findById(data.idOrdemServico);

            if (ordem == null || ordem == undefined) {
                return null;
            }
            const cliente: Cliente = await this.findCliente.execute({idCliente: ordem.idCliente})
            const veiculo: Veiculo = await this.findVeiculo.execute({placaVeiculo: ordem.placaVeiculo})
            const osDetalhes: OSDetalhes = await this.findOSDetalhes.execute({idOrdemServico: ordem.idOrdemServico});
            const produtoHasOSDetalhesList: Produto_has_OSDetalhes[] = await this.findAllProdutoHasOSDetalhes.execute({idOSDetalhes: osDetalhes.idOSDetalhes})
            const executaFuncaoList: ExecutaFuncao[] = await this.findAllExecutaFuncao.execute({idOSDetalhes: osDetalhes.idOSDetalhes});

            let produtos = [];
            if (produtoHasOSDetalhesList) {
                for (let i = 0; i < produtoHasOSDetalhesList.length; i++) {
                    let codigoBarras = produtoHasOSDetalhesList[i].codigoBarras;
                    let produto: Produto = await this.findProduto.execute({codigoBarras});

                    produtos.push({
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: produtoHasOSDetalhesList[i].quantidadeVendida,
                        precoUnitario: produtoHasOSDetalhesList[i].precoUnitario,
                        precoTotal: produtoHasOSDetalhesList[i].precoTotal,
                    })
                }
            }

            let servicos = [];
            if (executaFuncaoList) {
                for (let i = 0; i < executaFuncaoList.length; i++) {
                    let idServico = executaFuncaoList[i].idServico;
                    let idFuncionario = executaFuncaoList[i].idFuncionario;
                    let servico: Servico = await this.findServico.execute({idServico});
                    let funcionario: Funcionario = await this.findFuncionario.execute({idFuncionario});

                    servicos.push({
                        idServico: servico.idServico,
                        descricaoServico: servico.descricaoServico,
                        precoServico: servico.precoServico,
                        observacao: executaFuncaoList[i].observacao,
                        idFuncionario: funcionario.idFuncionario,
                        nomeFuncionario: funcionario.nomeFuncionario,
                    });
                }
            }

            let ordemServico = {
                idOrdemServico: ordem.idOrdemServico,
                total: ordem.total,
                km: ordem.km,
                isFinalizada: ordem.isFinalizada,
                isPaga: ordem.isPaga,
                cliente: {
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
                },
                veiculo: {
                    placaVeiculo: veiculo.placaVeiculo,
                    marca: veiculo.marca,
                    modelo: veiculo.modelo,
                    ano: veiculo.ano,
                    capacidadeOleo: veiculo.capacidadeOleo,
                    cor: veiculo.cor,
                    idCliente: veiculo.idCliente,
                },
                data: osDetalhes.dataOS,
                produtos: produtos,
                servicos: servicos,
            }

            return ordemServico;
        } catch(error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}