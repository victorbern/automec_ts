export class Pagamento {
    public idPagamento: number;

    public dataHora: Date;
    public subtotal: number;
    public total: number;
    public desconto: number;
    public formaPagamento: string;

    constructor(props: Omit<Pagamento, 'idPagamento'>, idPagamento?: number) {
        Object.assign(this, props);
    }
}