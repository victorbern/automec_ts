import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { SetServicoUC } from "./SetServicoUC";

describe("Set Serviço", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const setServico = new SetServicoUC(mySqlServicos);

    it("should be able to set a service", () => {
        // Cria um serviço que será usado como teste para editar seus dados
        mySqlServicos.items.push({
            idServico: 2,
            descricaoServico: "Troca de Oleo",
            precoServico: 21
        });

        // Tenta alterar os dados do serviço que acabamos de criar
        expect(setServico.execute({
            idServico: 2,
            descricaoServico: "Limpeza",
            precoServico: 21
        }).then(() => {
            // Verifica através da descrição se os dados do serviço foram alterados
            expect(mySqlServicos.items.find((servico) => {
                if (servico.idServico === 2) {
                    return servico;
                }
            }).descricaoServico).toBe("Limpeza");
        })).resolves
    })

    it("should not be able to set a service", () => {
        // Tenta alterar os dados de serviço sem passar um id
        expect(setServico.execute({
            idServico: null,
            descricaoServico: "Limpeza",
            precoServico: 21,
        })).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de serviço sem passar uma descrição
        expect(setServico.execute({
            idServico: 2,
            descricaoServico: "",
            precoServico: 21,
        })).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de serviço sem passar um preço
        expect(setServico.execute({
            idServico: 2,
            descricaoServico: "Limpeza",
            precoServico: null,
        })).rejects.toThrow('Campos faltando');

        // Tenta alterar os dados de um serviço que não existe
        expect(setServico.execute({
            idServico: 3,
            descricaoServico: "Limpeza",
            precoServico: 21,
        })).rejects.toThrow('Serviço não encontrado');
    })
})