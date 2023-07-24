import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { findClienteUC } from "../../FindCliente";
import { IFindVeiculoRequestDTO, IFindVeiculoResponseDTO } from "./FindVeiculoDTO";

export class FindVeiculoUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
    ) {}

    async execute(data: IFindVeiculoRequestDTO): Promise<IFindVeiculoResponseDTO> {
        try {
            const result = await this.veiculosRepository.findByPlacaVeiculo(data.placaVeiculo)
            const cliente = await findClienteUC.execute({idCliente: result.idCliente})
            const veiculo = {
                placaVeiculo: result.placaVeiculo,
                marca: result.marca,
                modelo: result.modelo,
                ano: result.ano,
                capacidadeOleo: result.capacidadeOleo,
                cor: result.cor,
                veiculo_idCliente: result.idCliente,
                nomeCliente: cliente.nomeCliente,
                celularCliente: cliente.celularCliente,
            };
            return veiculo;
            
        } catch (error) {
            throw new Error("Unexpected Error")
        }
    }
}