import { IVeiculosRepository } from "../../../repositories/IVeiculosRepository";
import { IFindAllVeiculosResponseDTO } from "./FindAllVeiculosDTO";
import { findClienteUC } from "../../clientes/FindCliente";

export class FindAllVeiculosUC {
    constructor(
        private veiculosRepository: IVeiculosRepository,
    ) {}

    async execute(): Promise<IFindAllVeiculosResponseDTO[]> {
        const result = await this.veiculosRepository.findAll();
        const veiculos: IFindAllVeiculosResponseDTO[] = [];
        for (let i=0; i<result.length; i++) {
            const cliente = await findClienteUC.execute({idCliente: result[i].idCliente})
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