import { describe, expect, it } from "vitest";
import { CreateClienteUC } from "./CreateClienteUC";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";

describe('Create Cliente', () => {
    const mySql = new InMemoryClientesRepository;
    const createCliente = new CreateClienteUC(mySql)

    it('should be able to create a cliente', () => {
        expect(createCliente.execute({
            nomeCliente: 'Bernardo',
            cpfCnpj: '475.751.788-21',
            celularCliente: '11953017858',
            telefoneCliente: '40363956',
            cep: '12970000',
            endereco: 'Rua Primeira',
            numero: '40',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: 'Rua ao lado da praça'
        })).resolves
    })

    it('shouldnt be able to create a cliente', () => {
        expect(createCliente.execute({
            nomeCliente: '',
            cpfCnpj: '475.751.788-21',
            celularCliente: '11953017858',
            telefoneCliente: '40363956',
            cep: '12970000',
            endereco: 'Rua Primeira',
            numero: '40',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: 'Rua ao lado da praça'
        })).rejects.toThrow('There are missing fields')

        expect(createCliente.execute({
            nomeCliente: 'Bernardo',
            cpfCnpj: '475.751.788-21',
            celularCliente: '',
            telefoneCliente: '40363956',
            cep: '12970000',
            endereco: 'Rua Primeira',
            numero: '40',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: 'Rua ao lado da praça'
        })).rejects.toThrow('There are missing fields')

        expect(createCliente.execute({
            nomeCliente: 'Bernardo',
            cpfCnpj: '',
            celularCliente: '11953017858',
            telefoneCliente: '40363956',
            cep: '12970000',
            endereco: 'Rua Primeira',
            numero: '40',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: 'Rua ao lado da praça'
        })).rejects.toThrow('There are missing fields')

        expect(createCliente.execute({
            nomeCliente: 'Bernardo',
            cpfCnpj: '475.751.788-21',
            celularCliente: '11953017858',
            telefoneCliente: '40363956',
            cep: '12970000',
            endereco: 'Rua Primeira',
            numero: '40',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: 'Rua ao lado da praça'
        })).rejects.toThrow('The CPF/CNPJ already exists')
    })
})