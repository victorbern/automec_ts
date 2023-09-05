import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { IFindAllVeiculosRequestDTO, IFindAllVeiculosResponseDTO } from "./FindAllVeiculosDTO";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { Veiculo } from "../../../entities/Veiculo";

export class FindAllVeiculosUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
        private findCliente: FindClienteUC
    ) {}

    async execute(data: IFindAllVeiculosRequestDTO): Promise<IFindAllVeiculosResponseDTO[]> {
        let result: Veiculo[] = [];
        if (!data.filtro) {
            result = await this.veiculosRepository.findAll();
        } else {
            result = await this.veiculosRepository.findAllWithFilter(data.filtro);
        }
        const veiculos: IFindAllVeiculosResponseDTO[] = [];
        for (let i=0; i<result.length; i++) {
            const cliente = await this.findCliente.execute({idCliente: result[i].idCliente})
            veiculos.push({
                placaVeiculo: result[i].placaVeiculo,
                marca: result[i].marca,
                modelo: result[i].modelo,
                ano: result[i].ano,
                capacidadeOleo: result[i].capacidadeOleo,
                cor: result[i].cor,
                veiculo_idCliente: result[i].idCliente,
                nomeCliente: cliente.nomeCliente,
                celularCliente: cliente.celularCliente
            })
        }
        return veiculos;
    }
}