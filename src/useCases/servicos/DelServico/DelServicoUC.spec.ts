import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { DelServicoUC } from "./DelServicoUC";

describe("Delete a service", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const delServicoUC = new DelServicoUC(mySqlServicos);

    // Cria um serviço para testes
    mySqlServicos.items.push({
        idServico: 2,
        descricaoServico: "Limpeza do motor",
        precoServico: 30,
    });

    it("should be able to delete a service", () => {
        // Tenta deletar o serviço recém criado
        expect(delServicoUC.execute({idServico: 2}).then(() => {
            expect(mySqlServicos.items.find((servico) => {
                if (servico.idServico === 2) {
                    return servico;
                }
            })).toBe(undefined);
        })).resolves
    })

    it("should not be able to delete a service", () => {
        // Tenta deletar um serviço passando um id nulo
        expect(delServicoUC.execute({idServico: null})).rejects.toThrow("Campos faltando")

        // Tenta deletar um serviço que não existe
        expect(delServicoUC.execute({idServico: 3})).rejects.toThrow("Serviço não encontrado")
    })
})