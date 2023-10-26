import { MySqlOrdemServicoRepository } from "../../../repositories/implementations/MySqlOrdemServicoRepository";
import { findAllClientesUC } from "../../clientes/FindAllClientes";
import { findAllVeiculosUC } from "../../veiculos/FindAllVeiculos";
import { findOrdemServicoUC } from "../FindOrdemServico";
import { findOrdemServicoByClienteUC } from "../FindOrdemServicoByCliente";
import { findOrdemServicoByVeiculoUC } from "../FindOrdemServicoByVeiculo";
import { FindAllOrdemServicoController } from "./FindAllOrdemServicoController";
import { FindAllOrdemServicoUC } from "./FindAllOrdemServicoUC";

const mySqlOrdemServicoRepository = new MySqlOrdemServicoRepository;
const findAllOrdemServicoUC = new FindAllOrdemServicoUC(
    mySqlOrdemServicoRepository, findAllClientesUC, findAllVeiculosUC, 
    findOrdemServicoUC, findOrdemServicoByClienteUC, findOrdemServicoByVeiculoUC
);

const findAllOrdemServicoController = new FindAllOrdemServicoController(findAllOrdemServicoUC);

export { findAllOrdemServicoUC, findAllOrdemServicoController }

