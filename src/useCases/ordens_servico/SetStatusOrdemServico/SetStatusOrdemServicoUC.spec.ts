import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { SetStatusOrdemServicoUC } from "./SetStatusOrdemServicoUC";

describe("Set StatusOrdemServico", () => {
    const mySqlOrdemServico = new InMemoryOrdemServicoRepository;
    const setStatusOrdemServico = new SetStatusOrdemServicoUC(mySqlOrdemServico);

    mySqlOrdemServico.items = [
        {
            idOrdemServico: 1,
            total: 100,
            km: 2000,
            isFinalizada: false,
            isPaga: false,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        },
        {
            idOrdemServico: 2,
            total: 200,
            km: 3000,
            isFinalizada: true,
            isPaga: true,
            placaVeiculo: "FDP-2912",
            idCliente: 1
        }
    ];

    it("should be able to set a service order's status", () => {
        expect(setStatusOrdemServico.execute({idOrdemServico: 1, isPaga: true}).then(() => {
            expect(mySqlOrdemServico.items.find((ordemServico) => {
                if (ordemServico.idOrdemServico == 1) {
                    return ordemServico;
                }
            }).isPaga).toBe(true);
        }))

        expect(setStatusOrdemServico.execute({idOrdemServico: 2, isPaga: false}).then(() => {
            expect(mySqlOrdemServico.items.find((ordemServico) => {
                if (ordemServico.idOrdemServico == 2) {
                    return ordemServico;
                }
            }).isPaga).toBe(false);
        }))
    });

    it("should not be able to set a service order's status", () => {
        expect(setStatusOrdemServico.execute({idOrdemServico: null, isPaga: true})).rejects.toThrow("Campos faltando");

        expect(setStatusOrdemServico.execute({idOrdemServico: 4, isPaga: false})).rejects.toThrow("Ordem de Serviço não encontrada");
    });
})