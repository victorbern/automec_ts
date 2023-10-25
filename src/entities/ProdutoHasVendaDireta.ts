export class Produto_Has_VendaDireta {
    public codigoBarras: string;
    public idVendaDireta: number;
    public quantidadeVendida: number;
    public precoTotal: number;
    public precoUnitario: number;

    constructor(props: Produto_Has_VendaDireta) {
        Object.assign(this, props);
    }

}