export interface IFindOSDetalhesBetweenDatesRequestDTO {
    dataDe: Date;
    dataAte: Date;
}

export interface IFindOSDetalhesBetweenDatesResponseDTO {
    idOSDetalhes: number;
    dataOS: Date;
    idOrdemServico: number;
}