-- CreateTable
CREATE TABLE `Cliente` (
    `idCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCliente` VARCHAR(60) NULL,
    `cpfCnpj` VARCHAR(18) NULL,
    `celularCliente` VARCHAR(20) NULL,
    `telefoneCliente` VARCHAR(20) NULL,
    `cep` VARCHAR(14) NULL,
    `endereco` VARCHAR(60) NULL,
    `numero` VARCHAR(6) NULL,
    `bairro` VARCHAR(60) NULL,
    `cidade` VARCHAR(60) NULL,
    `uf` VARCHAR(2) NULL,
    `complemento` VARCHAR(60) NULL,

    UNIQUE INDEX `cpfCnpj`(`cpfCnpj`),
    PRIMARY KEY (`idCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalhePagamento` (
    `idDetalhePagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `idOrdemServico` INTEGER NULL,
    `idPagamento` INTEGER NULL,

    INDEX `idPagamento`(`idPagamento`),
    PRIMARY KEY (`idDetalhePagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExecutaFuncao` (
    `idOSDetalhes` INTEGER NOT NULL,
    `idFuncionario` INTEGER NOT NULL,
    `idServico` INTEGER NOT NULL,
    `observacao` VARCHAR(45) NULL,
    `quantidade` INTEGER NULL,

    INDEX `idFuncionario`(`idFuncionario`),
    INDEX `idServico`(`idServico`),
    PRIMARY KEY (`idOSDetalhes`, `idFuncionario`, `idServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `idFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFuncionario` VARCHAR(60) NULL,
    `isAtivo` VARCHAR(3) NULL,
    `funcao` VARCHAR(45) NULL,

    PRIMARY KEY (`idFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdemServico` (
    `idOrdemServico` INTEGER NOT NULL AUTO_INCREMENT,
    `total` FLOAT NULL,
    `km` INTEGER NULL,
    `isFinalizada` BOOLEAN NULL DEFAULT false,
    `isPaga` BOOLEAN NULL DEFAULT false,
    `placaVeiculo` VARCHAR(8) NULL,
    `idCliente` INTEGER NULL,

    INDEX `idCliente`(`idCliente`),
    PRIMARY KEY (`idOrdemServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OSDetalhes` (
    `idOSDetalhes` INTEGER NOT NULL AUTO_INCREMENT,
    `dataOS` DATETIME(0) NULL,
    `idOrdemServico` INTEGER NULL,

    INDEX `idOrdemServico`(`idOrdemServico`),
    PRIMARY KEY (`idOSDetalhes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `idPagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `dataHora` DATETIME(0) NULL,
    `subtotal` FLOAT NULL,
    `total` FLOAT NULL,
    `desconto` FLOAT NULL,
    `formaPagamento` VARCHAR(45) NULL,

    PRIMARY KEY (`idPagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `codigoBarras` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(45) NULL,
    `valorCusto` FLOAT NULL,
    `quantidadeEstoque` INTEGER NULL,
    `precoVenda` FLOAT NULL,

    PRIMARY KEY (`codigoBarras`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto_has_OSDetalhes` (
    `idOSDetalhes` INTEGER NOT NULL,
    `codigoBarras` VARCHAR(45) NOT NULL,
    `quantidadeVendida` INTEGER NULL,
    `precoTotal` FLOAT NULL,
    `precoUnitario` FLOAT NULL,

    INDEX `codigoBarras`(`codigoBarras`),
    PRIMARY KEY (`idOSDetalhes`, `codigoBarras`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto_has_VendaDireta` (
    `codigoBarras` VARCHAR(45) NOT NULL,
    `idVendaDireta` INTEGER NOT NULL,
    `quantidadeVendida` INTEGER NULL,
    `precoTotal` FLOAT NULL,
    `precoUnitario` FLOAT NULL,

    INDEX `idVendaDireta`(`idVendaDireta`),
    PRIMARY KEY (`codigoBarras`, `idVendaDireta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `idServico` INTEGER NOT NULL AUTO_INCREMENT,
    `descricaoServico` VARCHAR(60) NULL,
    `precoServico` VARCHAR(45) NULL,

    PRIMARY KEY (`idServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculo` (
    `placaVeiculo` VARCHAR(8) NOT NULL,
    `marca` VARCHAR(45) NULL,
    `modelo` VARCHAR(45) NULL,
    `ano` INTEGER NULL,
    `capacidadeOleo` DOUBLE NULL,
    `cor` VARCHAR(45) NULL,
    `idCliente` INTEGER NULL,

    INDEX `idCliente`(`idCliente`),
    PRIMARY KEY (`placaVeiculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendaDireta` (
    `idVendaDireta` INTEGER NOT NULL AUTO_INCREMENT,
    `idPagamento` INTEGER NULL,
    `total` FLOAT NULL,
    `dataHora` DATETIME(0) NULL,

    INDEX `idPagamento`(`idPagamento`),
    PRIMARY KEY (`idVendaDireta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

