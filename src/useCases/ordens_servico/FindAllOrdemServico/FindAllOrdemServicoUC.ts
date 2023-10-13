import { OrdemServico } from "../../../entities/OrdemServico";
import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { isNumber } from "../../../utils/UsefulFunctions";
import { FindAllClientesUC } from "../../clientes/FindAllClientes/FindAllClientesUC";
import { FindAllVeiculosUC } from "../../veiculos/FindAllVeiculos/FindAllVeiculosUC";
import { FindOrdemServicoUC } from "../FindOrdemServico/FindOrdemServicoUC";
import { FindOrdemServicoByClienteUC } from "../FindOrdemServicoByCliente/FindOrdemServicoByClienteUC";
import { FindOrdemServicoByVeiculoUC } from "../FindOrdemServicoByVeiculo/FindOrdemServicoByVeiculoUC";
import { IFindAllOrdemServicoRequestDTO, IFindAllOrdemServicoResponseDTO } from "./FindAllOrdemServicoDTO";

export class FindAllOrdemServicoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findAllClientes: FindAllClientesUC,
        private findAllVeiculos: FindAllVeiculosUC,
        private findOrdemServico: FindOrdemServicoUC,
        private findOrdemServicoByCliente: FindOrdemServicoByClienteUC,
        private findOrdemServicoByVeiculo: FindOrdemServicoByVeiculoUC
    ) { }

    async execute(data: IFindAllOrdemServicoRequestDTO): Promise<IFindAllOrdemServicoResponseDTO[]> {
        try {

            let ordens: OrdemServico[] = [];

            if (!data.filtro) {
                ordens = await this.ordemDeServicoRepository.findAll()
            } else {
                let clientes = await this.findAllClientes.execute({ filtro: data.filtro });
                let veiculos = await this.findAllVeiculos.execute({ filtro: data.filtro });
                // Verifica se o filtro contém apenas elementos númericos
                if (isNumber(data.filtro)) {
                    let ordem = await this.ordemDeServicoRepository.findById(Number(data.filtro));
                    // Verifica se foi encontrada uma ordem de serviço
                    if (ordem) {
                        // Verifica se esta ordem de serviço já foi paga
                        if (ordem.isPaga == false) {
                            ordens.push(ordem);
                        }
                    }
                }
                if (clientes) {
                    for (let i = 0; i < clientes.length; i++) {
                        let idCliente = clientes[i].idCliente;
                        let ordensClienteList = await this.findOrdemServicoByCliente.execute({ idCliente })
                        if (ordensClienteList) {
                            for (let j = 0; j < ordensClienteList.length; j++) {
                                if (ordensClienteList[j].isPaga == false) {
                                    ordens.push(ordensClienteList[j]);
                                }
                            }
                        }
                    }
                }
                if (veiculos) {
                    for (let i = 0; i < veiculos.length; i++) {
                        let placaVeiculo = veiculos[i].placaVeiculo;
                        let ordensVeiculoList = await this.findOrdemServicoByVeiculo.execute({ placaVeiculo })
                        if (ordensVeiculoList) {
                            for (let j = 0; j < ordensVeiculoList.length; j++) {
                                if (ordensVeiculoList[j].isPaga == false) {
                                    ordens.push(ordensVeiculoList[j]);
                                }
                            }
                        }
                    }
                }
                // Remover itens duplicados
                const setOrdem = new Set();
                ordens = ordens.filter((ordem) => {
                    const ordemDuplicada = setOrdem.has(ordem.idOrdemServico);
                    setOrdem.add(ordem.idOrdemServico);
                    return !ordemDuplicada;
                })

            }
            let result: IFindAllOrdemServicoResponseDTO[] = [];

            if (ordens) {
                for (let i = 0; i < ordens.length; i++) {
                    let idOrdemServico = ordens[i].idOrdemServico;
                    let ordem = await this.findOrdemServico.execute({ idOrdemServico });
                    result.push(ordem)
                }
            } 
            return result;

        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}