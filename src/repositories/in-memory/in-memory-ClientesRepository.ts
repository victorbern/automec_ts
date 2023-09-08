import { Cliente } from "../../entities/Cliente";
import { IClientesRepository } from "../IClientesRepository";

export class InMemoryClientesRepository implements IClientesRepository {
    public items: Cliente[] = [
        {
            idCliente: 1,
            nomeCliente: "Victor",
            cpfCnpj: "475.283.293-21",
            celularCliente: "11953014839",
            telefoneCliente: "40364930",
            cep: "12970-000",
            endereco: "Rua 1",
            numero: "44",
            bairro: "Jd San Marino",
            cidade: "Piracaia",
            uf: "SP",
            complemento: "",
        },
    ];

    async save(cliente: Cliente): Promise<void> {
        let id = 1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idCliente > id) {
                id++;
            }
        }
        cliente.idCliente = id + 1;
        this.items.push(cliente);
    }
    async findAll(): Promise<Cliente[]> {
        return this.items;
    }

    async findAllWithFilter(filtro: string): Promise<Cliente[]> {
        let clientes: Cliente[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].nomeCliente.includes(filtro) || this.items[i].cpfCnpj.includes(filtro)) {
                clientes.push(this.items[i]);
            }
        }
        return clientes;
    }

    async findByCpfCnpj(cpfCnpj: string): Promise<Cliente> {
        for (let i = 0; i < this.items.length; i++) {
            const cliente = this.items[i];
            if (cliente.cpfCnpj === cpfCnpj) {
                return cliente;
            }
        }
        return null;
    }
    async findById(idCliente: number): Promise<Cliente> {
        for (let i = 0; i < this.items.length; i++) {
            const cliente = this.items[i];
            if (cliente.idCliente === idCliente) {
                return cliente;
            }
        }
        return null;
    }
    async update(cliente: Cliente): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idCliente === cliente.idCliente) {
                this.items[i] = {
                    idCliente: cliente.idCliente,
                    nomeCliente: cliente.nomeCliente,
                    cpfCnpj: cliente.cpfCnpj,
                    celularCliente: cliente.celularCliente,
                    telefoneCliente: cliente.telefoneCliente,
                    cep: cliente.cep,
                    endereco: cliente.endereco,
                    numero: cliente.numero,
                    bairro: cliente.bairro,
                    cidade: cliente.cidade,
                    uf: cliente.uf,
                    complemento: cliente.complemento,
                };
            }
        }
    }
    async delete(idCliente: number): Promise<void> {
        for (let i=0; i<this.items.length; i++) {
            if (this.items[i].idCliente === idCliente) {
                this.items.splice(i, 1)
            }
        }
    }
}
