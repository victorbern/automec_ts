import { findAllProdutoHasOSDetalhesUC } from "../../ProdutoHasOSDetalhes/FindAllProdutoHasOSDetalhes";
import { findAllProdutoHasVendaDiretaUC } from "../../ProdutoHasVendaDireta/FindAllProdutoHasVendaDireta";
import { findVendaDiretaBetweenDatesUC } from "../../VendaDireta/FindVendaDiretaBetweenDates";
import { findordemServicobetweenDatesUC } from "../../ordens_servico/FindOrdemServicoBetweenDates";
import { findProdutoUC } from "../../produtos/FindProduto";
import { GetRelatorioProdutosController } from "./GetRelatorioProdutosController";
import { GetRelatorioProdutosUC } from "./GetRelatorioProdutosUC";

const getRelatorioProdutosUC = new GetRelatorioProdutosUC(
    findordemServicobetweenDatesUC, findAllProdutoHasOSDetalhesUC, 
    findProdutoUC, findVendaDiretaBetweenDatesUC, findAllProdutoHasVendaDiretaUC,
);

const getRelatorioProdutosController = new GetRelatorioProdutosController(getRelatorioProdutosUC);

export { getRelatorioProdutosUC, getRelatorioProdutosController }