import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { IFindVeiculoByClienteRequestDTO, IFindVeiculoByClienteResponseDTO } from "./FindVeiculoByClienteDTO";

export class FindVeiculoByClienteUC {
    constructor(
        private veiculosRepository: IVeiculosRepository
    ) {}

    async execute(data: IFindVeiculoByClienteRequestDTO): Promise<IFindVeiculoByClienteResponseDTO[]> {
        const result = await this.veiculosRepository.findByIdCliente(data.idCliente);
        const veiculos: IFindVeiculoByClienteResponseDTO[] = [];
        for (let i=0; i<result.length; i++) {
            veiculos.push({
                placaVeiculo: result[i].placaVeiculo,
                marca: result[i].marca,
                modelo: result[i].modelo,
                ano: result[i].ano,
                capacidadeOleo: result[i].capacidadeOleo,
                cor: result[i].cor,
                idCliente: result[i].idCliente,
            })
        }
        return veiculos;
    }
}