import { MySqlVeiculosRepository } from "../../../repositories/implementations/MySqlVeiculosRepository";
import { FindVeiculoByClienteUC } from "./FindVeiculoByClienteUC";

const mySqlVeiculosRepository = new MySqlVeiculosRepository;
const findVeiculoByClienteUC = new FindVeiculoByClienteUC(mySqlVeiculosRepository);

export { findVeiculoByClienteUC }