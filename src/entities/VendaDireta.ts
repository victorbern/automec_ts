export class VendaDireta {
    public idVendaDireta: number;

    public idPagamento: number;
    public total: number;
    public dataHora: Date;

    constructor(props: Omit<VendaDireta, 'idVendaDireta'>, idVendaDireta?: number) {
        Object.assign(this, props);
    }
}
