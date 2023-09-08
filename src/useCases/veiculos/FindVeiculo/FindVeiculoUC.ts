import { AppError } from "../../../errors/AppError";
import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { findClienteUC } from "../../clientes/FindCliente";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { IFindVeiculoRequestDTO, IFindVeiculoResponseDTO } from "./FindVeiculoDTO";

export class FindVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
        private findCliente: FindClienteUC
    ) {}

    async execute(data: IFindVeiculoRequestDTO): Promise<IFindVeiculoResponseDTO> {
        try {
            const result = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo)
            if (result == null) {
                return null;
            }
            const cliente = await this.findCliente.execute({idCliente: result.idCliente})
            const veiculo = {
                placaVeiculo: result.placaVeiculo,
                marca: result.marca,
                modelo: result.modelo,
                ano: result.ano,
                capacidadeOleo: result.capacidadeOleo,
                cor: result.cor,
                idCliente: result.idCliente,
                nomeCliente: cliente.nomeCliente,
                celularCliente: cliente.celularCliente,
            };
            return veiculo;
            
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}