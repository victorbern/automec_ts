import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { FindAllClientesUC } from "./FindAllClientesUC";

describe("Find All Clientes", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const findAllClientes = new FindAllClientesUC(mySqlClientes);

    //Limpa o banco de dados para teste
    mySqlClientes.items = [];
    // Insere alguns clientes no banco para testes
    mySqlClientes.items.push({
        idCliente: 2,
        nomeCliente: "Andre",
        cpfCnpj: "698.685.236-21",
        celularCliente: "11953014839",
        telefoneCliente: "40364930",
        cep: "12970-000",
        endereco: "Rua 1",
        numero: "44",
        bairro: "Jd San Marino",
        cidade: "Piracaia",
        uf: "SP",
        complemento: "",
    })

    mySqlClientes.items.push({
        idCliente: 3,
        nomeCliente: "Andreia",
        cpfCnpj: "978.485.788-21",
        celularCliente: "11953014839",
        telefoneCliente: "40364930",
        cep: "12970-000",
        endereco: "Rua 1",
        numero: "44",
        bairro: "Jd San Marino",
        cidade: "Piracaia",
        uf: "SP",
        complemento: "",
    })

    mySqlClientes.items.push({
        idCliente: 4,
        nomeCliente: "Gustavo",
        cpfCnpj: "948.468.568-11",
        celularCliente: "11953014839",
        telefoneCliente: "40364930",
        cep: "12970-000",
        endereco: "Rua 1",
        numero: "44",
        bairro: "Jd San Marino",
        cidade: "Piracaia",
        uf: "SP",
        complemento: "",
    })


    it("should be able to find all clientes without using filter", () => {
        // Busca todos os clientes e compara com os dados do banco de dados
        expect(findAllClientes.execute({ filtro: null })).resolves.toBe(mySqlClientes.items);
        expect(findAllClientes.execute({})).resolves.toHaveLength(3);
    });

    it("should be able to find some clientes using filter", () => {
        // Testando filtro pelo nome
        expect(findAllClientes.execute({ filtro: "Andre" })).resolves.toStrictEqual(
            [
                {
                    idCliente: 2,
                    nomeCliente: "Andre",
                    cpfCnpj: "698.685.236-21",
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
                {
                    idCliente: 3,
                    nomeCliente: "Andreia",
                    cpfCnpj: "978.485.788-21",
                    celularCliente: "11953014839",
                    telefoneCliente: "40364930",
                    cep: "12970-000",
                    endereco: "Rua 1",
                    numero: "44",
                    bairro: "Jd San Marino",
                    cidade: "Piracaia",
                    uf: "SP",
                    complemento: "",
                }
            ]
        )

        // Testando filtro pelo cpf/cnpj
        expect(findAllClientes.execute({ filtro: "568" })).resolves.toStrictEqual(
            [
                {
                    idCliente: 4,
                    nomeCliente: "Gustavo",
                    cpfCnpj: "948.468.568-11",
                    celularCliente: "11953014839",
                    telefoneCliente: "40364930",
                    cep: "12970-000",
                    endereco: "Rua 1",
                    numero: "44",
                    bairro: "Jd San Marino",
                    cidade: "Piracaia",
                    uf: "SP",
                    complemento: "",
                }
            ]
        );

    })

    it("should not be able to find any client using filter", () => {
        // Testando a busca de todos os clientes com um filtro que não existe
        expect(findAllClientes.execute({ filtro: "Victor" })).resolves.toHaveLength(0)
    })

    it("should not be able to find any client without using filter", () => {
        mySqlClientes.items = []

        // Busca todos os clientes (com a base zerada) e verifica se não houve erros
        expect(findAllClientes.execute({ filtro: null })).resolves.toStrictEqual([]);
    })
});
