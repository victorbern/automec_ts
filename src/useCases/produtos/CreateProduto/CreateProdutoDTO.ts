export interface ICreateProdutoRequestDTO {
    codigoBarras: string;
    descricao: string;
    valorCusto: number;
    quantidadeEstoque: number;
    precoVenda: number;
}