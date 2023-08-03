import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { CreateServicoUC } from "./CreateServicoUC";
import { create } from "ts-node";

describe("Create Servico", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const createServico = new CreateServicoUC(mySqlServicos);

    it("should be able to create a service", () => {
        // Tenta criar um serviço
        expect(createServico.execute({
            descricaoServico: "Troca de Oleo",
            precoServico: 21
        }).then(() => {
            // Verifica se o serviço foi criado (testando pela descrição do serviço)
            expect(mySqlServicos.items.find((servico) => {
                if (servico.idServico === 2) {
                    return servico
                }
            }).descricaoServico).toBe("Troca de Oleo");

            // Verifica se o serviço foi criado (testando pelo preço do serviço)
            expect(mySqlServicos.items.find((servico) => {
                if (servico.idServico === 2) {
                    return servico;
                }
            }).precoServico).toBe(21);

        })).resolves
    })

    it("should not be able to create a service", () => {
        // Tenta criar um serviço sem uma descrição
        expect(createServico.execute({
            descricaoServico: "",
            precoServico: 21,
        })).rejects.toThrow('Campos faltando');

        // Tenta criar um serviço sem um preço
        expect(createServico.execute({
            descricaoServico: "Troca de Oleo",
            precoServico: null,
        })).rejects.toThrow('Campos faltando');
    })
})