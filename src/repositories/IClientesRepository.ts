import { Cliente } from "../entities/Cliente";

export interface IClientesRepository {
    save(cliente: Cliente): Promise<void>;
    findAll(): Promise<Array<Cliente>>;
    findByCpfCnpj(cpfCnpj: string): Promise<Cliente>;
    findById(idCliente: number): Promise<Cliente>;
    update(cliente: Cliente): Promise<void>;
    delete(idCliente: number): Promise<void>;
}