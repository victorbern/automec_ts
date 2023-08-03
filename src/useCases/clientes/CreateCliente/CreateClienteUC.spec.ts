import { describe, expect, it } from "vitest";
import { CreateClienteUC } from "./CreateClienteUC";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";

describe("Create Cliente", () => {
    const mySqlClientes = new InMemoryClientesRepository;
    const createCliente = new CreateClienteUC(mySqlClientes);

    it("should be able to create a cliente", () => {
        // Cria um cliente para ver se está salvando no banco
        expect(
            createCliente.execute({
                nomeCliente: "Bernardo",
                cpfCnpj: "475.751.788-21",
                celularCliente: "11953017858",
                telefoneCliente: "40363956",
                cep: "12970000",
                endereco: "Rua Primeira",
                numero: "40",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                complemento: "Rua ao lado da praça",
            }).then(() => {
                // Procura no banco para ver se o cliente foi salvo mesmo
                // Testa se o nome confere
                expect(mySqlClientes.items.find(cliente => {
                    if (cliente.idCliente === 2) {
                        return cliente;
                    }
                }).nomeCliente).toBe("Bernardo")
                
                // Testa se o cpf/cnpj confere
                expect(mySqlClientes.items.find(cliente => {
                    if (cliente.idCliente === 2) {
                        return cliente;
                    }
                }).cpfCnpj).toBe("475.751.788-21")
        
                // Testa se o número de celular confere
                expect(mySqlClientes.items.find(cliente => {
                    if (cliente.idCliente === 2) {
                        return cliente;
                    }
                }).celularCliente).toBe("11953017858")
            })
        ).resolves;
        
    });

    it("should not be able to create a cliente", () => {
        // Tenta criar um cliente com o nome faltando (é para falhar)
        expect(
            createCliente.execute({
                nomeCliente: "",
                cpfCnpj: "475.751.788-21",
                celularCliente: "11953017858",
                telefoneCliente: "40363956",
                cep: "12970000",
                endereco: "Rua Primeira",
                numero: "40",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                complemento: "Rua ao lado da praça",
            })
        ).rejects.toThrow("Campos faltando");

        // Tenta criar um cliente com o celular faltando (é para falhar)
        expect(
            createCliente.execute({
                nomeCliente: "Bernardo",
                cpfCnpj: "475.751.788-21",
                celularCliente: "",
                telefoneCliente: "40363956",
                cep: "12970000",
                endereco: "Rua Primeira",
                numero: "40",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                complemento: "Rua ao lado da praça",
            })
        ).rejects.toThrow("Campos faltando");
        
        // Tenta criar um cliente com o cpf/cnpj faltando (é para falhar)
        expect(
            createCliente.execute({
                nomeCliente: "Bernardo",
                cpfCnpj: "",
                celularCliente: "11953017858",
                telefoneCliente: "40363956",
                cep: "12970000",
                endereco: "Rua Primeira",
                numero: "40",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                complemento: "Rua ao lado da praça",
            })
        ).rejects.toThrow("Campos faltando");

        /* Tenta criar um cliente com um cpf/cnpj que já existe no banco (este é o
        cliente que criamos no teste para ver se estava salvando) */
        expect(
            createCliente.execute({
                nomeCliente: "Bernardo",
                cpfCnpj: "475.751.788-21",
                celularCliente: "11953017858",
                telefoneCliente: "40363956",
                cep: "12970000",
                endereco: "Rua Primeira",
                numero: "40",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                complemento: "Rua ao lado da praça",
            })
        ).rejects.toThrow("O CPF/CNPJ já foi cadastrado");
    });
});
