export class OSDetalhes {
    public idOSDetalhes: number;
    public dataOS: Date;
    public idOrdemServico: number;

    constructor(props: Omit<OSDetalhes, 'idOSDetalhes'>, idOSDetalhes?: string) {
        Object.assign(this, props);
    }
}