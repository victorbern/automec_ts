import { describe, expect, it } from "vitest";
import { InMemoryClientesRepository } from "../../../repositories/in-memory/in-memory-ClientesRepository";
import { DelClienteUC } from "./DelClienteUC";
import { FindVeiculoByClienteUC } from "../../veiculos/FindVeiculoByCliente/FindVeiculoByClienteUC";
import { InMemoryVeiculosRepository } from "../../../repositories/in-memory/in-memory-VeiculosRepository";

describe("Delete Cliente", () => {
    const mySqlClientes = new InMemoryClientesRepository();
    const mySqlVeiculos = new InMemoryVeiculosRepository();
    const findVeiculoByCliente = new FindVeiculoByClienteUC(mySqlVeiculos);
    const delCliente = new DelClienteUC(mySqlClientes, findVeiculoByCliente);

    it("should be able to delete a client", () => {
        // Cria um cliente que será deletado nos testes
        mySqlClientes.items.push({
            idCliente: 2,
            nomeCliente: "Andre",
            cpfCnpj: "156.154.125-12",
            celularCliente: "11953014839",
            telefoneCliente: "40364930",
            cep: "12970-000",
            endereco: "Rua 1",
            numero: "44",
            bairro: "Jd San Marino",
            cidade: "Piracaia",
            uf: "SP",
            complemento: "",
        });

        // Deleta o cliente que criamos acima
        expect(delCliente.execute({ idCliente: 2 }).then(() => {
            // Verifica se o cliente que acabamos de deletar ainda existe no banco
            expect(
                mySqlClientes.items.find((cliente) => {
                    if (cliente.idCliente === 2) {
                        return cliente;
                    }
                })
            ).undefined
        })).resolves
        
    });

    it("should not be able to delete a client", () => {
        // Cria um cliente novo para testar se exclui quando tem um veiculo
        mySqlClientes.items.push({
            idCliente: 3,
            nomeCliente: "Luis",
            cpfCnpj: "165.369.698-56",
            celularCliente: "11953014839",
            telefoneCliente: "40364930",
            cep: "12970-000",
            endereco: "Rua 1",
            numero: "44",
            bairro: "Jd San Marino",
            cidade: "Piracaia",
            uf: "SP",
            complemento: "",
        });
    
        // Cria um veículo para o cliente acima que usamos no teste
        mySqlVeiculos.items.push({
            placaVeiculo: "SDA-1569",
            marca: "Fiat",
            modelo: "Touro",
            ano: 2011,
            capacidadeOleo: 5,
            cor: "Branco",
            idCliente: 3,
        });

        // Tenta deletar um cliente que não existe
        expect(delCliente.execute({idCliente: 4})).rejects.toThrow('Client does not found')

        // Tenta deletar um cliente que possui um veículo (acabamos de criar o cliente de teste)
        expect(delCliente.execute({idCliente: 3})).rejects.toThrow('The client has vehicles in his name');
    })
});
