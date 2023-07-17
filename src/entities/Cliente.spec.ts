import { expect, test } from 'vitest'
import { Cliente } from './Cliente'

test('criando um cliente', () => {
    const cliente = new Cliente({
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
    })

    expect(cliente).toBeInstanceOf(Cliente)
    expect(cliente.nomeCliente).toEqual('Bernardo')
})