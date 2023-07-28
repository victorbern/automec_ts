import { Funcionario } from "../entities/Funcionario";

export interface IFuncionariosRepository {
    save(funcionario: Funcionario): Promise<void>;
    findAll(): Promise<Funcionario[]>;
    findByIdFuncionario(idFuncionario: number): Promise<Funcionario>;
    update(funcionario: Funcionario): Promise<void>;
}