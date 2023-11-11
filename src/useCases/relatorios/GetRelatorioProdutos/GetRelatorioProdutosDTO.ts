export interface IGetRelatorioProdutosRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IGetRelatorioProdutosResponseDTO {
    codigoBarras: string;
    descricao: string;
    totalVendido: number;
}