import { describe, expect, it } from "vitest";
import { CreateClienteUC } from "./CreateClienteUC";
import { Cliente } from "../../../entities/Cliente";
import { MySqlClientesRepository } from "../../../repositories/implementations/MySqlClientesRepository";

describe('Create Cliente', () => {
    it('should be able to create a cliente', () => {
        const mySql = new MySqlClientesRepository();
        const createCliente = new CreateClienteUC(mySql)

        // expect(createCliente.execute({
        //     nomeCliente: 'Bernardo',
        //     cpfCnpj: '475.751.788-21',
        //     celularCliente: '11953017858',
        //     telefoneCliente: '40363956',
        //     cep: '12970000',
        //     endereco: 'Rua Primeira',
        //     numero: '40',
        //     bairro: 'Centro',
        //     cidade: 'São Paulo',
        //     uf: 'SP',
        //     complemento: 'Rua ao lado da praça'
        // })).
    })
})