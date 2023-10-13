import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindVeiculoByClienteController } from "./FindVeiculoByClienteController";
import { FindVeiculoByClienteUC } from "./FindVeiculoByClienteUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculoByClienteUC = new FindVeiculoByClienteUC(mySqlVeiculosRepository);
const findVeiculoByClienteController = new FindVeiculoByClienteController(findVeiculoByClienteUC);

export { findVeiculoByClienteUC, findVeiculoByClienteController }