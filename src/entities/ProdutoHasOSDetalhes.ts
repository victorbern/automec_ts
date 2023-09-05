export class Produto_has_OSDetalhes {
    public idOSDetalhes: number;
    public codigoBarras: string;
    public quantidadeVendida: number;
    public precoTotal: number;
    public precoUnitario: number;

    constructor(props: Produto_has_OSDetalhes) {
        Object.assign(this, props);
    }
}