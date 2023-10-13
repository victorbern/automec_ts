import { AppError } from "../../../errors/AppError";
import { IOrdemServicoRepository } from "../../../repositories/IOrdemServicoRepository";
import { DelExecutaFuncaoUC } from "../../ExecutaFuncao/DelExecutaFuncao/DelExecutaFuncaoUC";
import { FindAllExecutaFuncaoUC } from "../../ExecutaFuncao/FindAllExecutaFuncao/FindAllExecutaFuncaoUC";
import { DelOSDetalhesUC } from "../../OSDetalhes/DelOSDetalhes/DelOSDetalhesUC";
import { FindOSDetalhesUC } from "../../OSDetalhes/FindOSDetalhes/FindOSDetalhesUC";
import { DelProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/DelProdutoHasOSDetalhes/DelProdutoHasOSDetalhesUC";
import { FindAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhesUC";
import { IDelOrdemServicoRequestDTO } from "./DelOrdemServicoDTO";

export class DelOrdemServicoUC {
    constructor(
        private ordemDeServicoRepository: IOrdemServicoRepository,
        private findOSDetalhesUC: FindOSDetalhesUC,
        private findAllProdutoHasOSDetalhesUC: FindAllProdutoHasOSDetalhesUC,
        private delProdutoHasOSDetalhesUC: DelProdutoHasOSDetalhesUC,
        private findAllExecutaFuncaoUC: FindAllExecutaFuncaoUC,
        private delExecutaFuncaoUC: DelExecutaFuncaoUC,
        private delOSDetalhesUC: DelOSDetalhesUC,
    ) {}

    async execute(data: IDelOrdemServicoRequestDTO): Promise<void> {
        try {
            const { idOrdemServico } = data;
            if (!idOrdemServico) {
                throw new AppError("Campos faltando", 400);
            }

            // Verifica se a ordem de serviço existe
            const ordemServicoExists = await this.ordemDeServicoRepository.findById(idOrdemServico);
            if (!ordemServicoExists) {
                throw new AppError("Ordem de Serviço não encontrada!", 400);
            }

            if (ordemServicoExists.isPaga || ordemServicoExists.isFinalizada) {
                throw new AppError("Não é possível deletar uma ordem de serviço paga/finalizada", 400);
            }

            const osDetalhes = await this.findOSDetalhesUC.execute({ idOrdemServico });

            if (osDetalhes) {
                const idOSDetalhes = osDetalhes.idOSDetalhes;

                let produtoHasOSDetalhesList = await this.findAllProdutoHasOSDetalhesUC.execute({idOSDetalhes});
                for (let i in produtoHasOSDetalhesList) {
                    const codigoBarras = produtoHasOSDetalhesList[i].codigoBarras;
                    await this.delProdutoHasOSDetalhesUC.execute({idOSDetalhes, codigoBarras});
                }

                let executaFuncaoList = await this.findAllExecutaFuncaoUC.execute({idOSDetalhes});
                for (let i in executaFuncaoList) {
                    const idServico = executaFuncaoList[i].idServico;
                    const idFuncionario = executaFuncaoList[i].idFuncionario;
                    await this.delExecutaFuncaoUC.execute({idOSDetalhes, idServico, idFuncionario});
                }

                await this.delOSDetalhesUC.execute({idOSDetalhes});
            }

            await this.ordemDeServicoRepository.delete(idOrdemServico);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}