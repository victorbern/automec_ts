import { describe, expect, it } from "vitest";
import { InMemoryOrdemServicoRepository } from "../../../repositories/in-memory/in-memory-OrdemServicoRepository";
import { FindOrdemServicoByVeiculoUC } from "./FindOrdemServicoByVeiculoUC";

describe("Find OrdemServico By Veiculo", () => {
    const mySqlOrdemServicoRepository = new InMemoryOrdemServicoRepository;
    const findOrdemServicoByVeiculo = new FindOrdemServicoByVeiculoUC(mySqlOrdemServicoRepository);

    mySqlOrdemServicoRepository.items.push({
        idOrdemServico: 2,
        total: 200,
        km: 3000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "ADS-2912",
        idCliente: 2
    });

    mySqlOrdemServicoRepository.items.push({
        idOrdemServico: 3,
        total: 200,
        km: 3000,
        isFinalizada: false,
        isPaga: false,
        placaVeiculo: "ADS-2912",
        idCliente: 3
    });
    it("should be able to find some service orders", () => {
        expect(findOrdemServicoByVeiculo.execute({placaVeiculo: "ADS-2912"})).resolves.toStrictEqual([
            {
                idOrdemServico: 2,
                total: 200,
                km: 3000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "ADS-2912",
                idCliente: 2
            },
            {
                idOrdemServico: 3,
                total: 200,
                km: 3000,
                isFinalizada: false,
                isPaga: false,
                placaVeiculo: "ADS-2912",
                idCliente: 3
            },
        ]);

        // Verifica se está sendo retornado 2 valores no array
        expect(findOrdemServicoByVeiculo.execute({placaVeiculo: "ADS-2912"})).resolves.toHaveLength(2);

    });

    it("should be able to find just one service order", () => {
        // Apaga o último registro do banco para ter apenas um a ser consultado
        mySqlOrdemServicoRepository.items.pop();

        expect(findOrdemServicoByVeiculo.execute({placaVeiculo: "ADS-2912"})).resolves.toHaveLength(1);
    });

    it("should not be able to find any service order", () => {
        // Apaga o primeiro registro do banco para não ter nenhum a ser consultado
        mySqlOrdemServicoRepository.items.pop();

        expect(findOrdemServicoByVeiculo.execute({placaVeiculo: "ADS-2912"})).resolves.toHaveLength(0);
    })
})