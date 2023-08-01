import { describe, expect, it } from "vitest";
import { InMemoryServicosRepository } from "../../../repositories/in-memory/in-memory-ServicosRepository";
import { FindServicoUC } from "./FindServicoUC";

describe("Find Serviço", () => {
    const mySqlServicos = new InMemoryServicosRepository;
    const findServico = new FindServicoUC(mySqlServicos);

    mySqlServicos.items.push({
        idServico: 2,
        descricaoServico: "Troca de Oleo",
        precoServico: 21
    })

    it("should be able to find a service", () => {
        // Tenta procurar um serviço específico no banco de dados
        expect(findServico.execute({ idServico: 2 })).resolves.toBe(
            mySqlServicos.items.find((servico) => {
                if (servico.idServico === 2) {
                    return servico;
                }
            })
        )
    });

    it("should not be able to find a service", () => {
        // Apaga o último serviço salvo no banco
        mySqlServicos.items.pop();
        // Tenta buscar pelo serviço deletado (deve retornar null)
        expect(findServico.execute({ idServico: 2 })).resolves.toBeNull();
    })
})