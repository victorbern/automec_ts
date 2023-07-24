import { Cliente } from "../../entities/Cliente";
import { IClientesRepository } from "../IClientesRepository";

export class InMemoryClientesRepository implements IClientesRepository {
    public items: Cliente[] = [];

    async save(cliente: Cliente): Promise<void> {
        this.items.push(cliente);
    }
    async findAll(): Promise<Cliente[]> {
        return this.items;
    }
    async findByCpfCnpj(cpfCnpj: string): Promise<Cliente> {
        for (let i=0; i<this.items.length; i++) {
            const cliente = this.items[i];
            if (cliente.cpfCnpj === cpfCnpj) {
                return cliente;
            }
        }
        return null;
    }
    async findById(idCliente: number): Promise<Cliente> {
        for (let i=0; i<this.items.length; i++) {
            const cliente = this.items[i];
            if (cliente.idCliente === idCliente) {
                return cliente;
            }
        }
        return null;
    }
    async update(cliente: Cliente): Promise<void> {
        
    }
    async delete(idCliente: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}