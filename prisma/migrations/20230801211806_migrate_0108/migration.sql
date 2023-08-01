/*
  Warnings:

  - You are about to alter the column `precoServico` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Double`.

*/
-- AlterTable
ALTER TABLE `servico` MODIFY `precoServico` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `DetalhePagamento` ADD CONSTRAINT `detalhepagamento_ibfk_1` FOREIGN KEY (`idPagamento`) REFERENCES `Pagamento`(`idPagamento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ExecutaFuncao` ADD CONSTRAINT `executafuncao_ibfk_1` FOREIGN KEY (`idOSDetalhes`) REFERENCES `OSDetalhes`(`idOSDetalhes`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ExecutaFuncao` ADD CONSTRAINT `executafuncao_ibfk_2` FOREIGN KEY (`idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ExecutaFuncao` ADD CONSTRAINT `executafuncao_ibfk_3` FOREIGN KEY (`idServico`) REFERENCES `Servico`(`idServico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `OrdemServico` ADD CONSTRAINT `ordemservico_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `OSDetalhes` ADD CONSTRAINT `osdetalhes_ibfk_1` FOREIGN KEY (`idOrdemServico`) REFERENCES `OrdemServico`(`idOrdemServico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Produto_has_OSDetalhes` ADD CONSTRAINT `produto_has_osdetalhes_ibfk_1` FOREIGN KEY (`idOSDetalhes`) REFERENCES `OSDetalhes`(`idOSDetalhes`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Produto_has_OSDetalhes` ADD CONSTRAINT `produto_has_osdetalhes_ibfk_2` FOREIGN KEY (`codigoBarras`) REFERENCES `Produto`(`codigoBarras`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Produto_has_VendaDireta` ADD CONSTRAINT `produto_has_vendadireta_ibfk_1` FOREIGN KEY (`codigoBarras`) REFERENCES `Produto`(`codigoBarras`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Produto_has_VendaDireta` ADD CONSTRAINT `produto_has_vendadireta_ibfk_2` FOREIGN KEY (`idVendaDireta`) REFERENCES `VendaDireta`(`idVendaDireta`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `veiculo_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `VendaDireta` ADD CONSTRAINT `vendadireta_ibfk_1` FOREIGN KEY (`idPagamento`) REFERENCES `Pagamento`(`idPagamento`) ON DELETE RESTRICT ON UPDATE RESTRICT;
