export class DetalhePagamento {
    public idDetalhePagamento: number;

    public idOrdemServico: number;
    public idPagamento: number;

    constructor(props: Omit<DetalhePagamento, 'idDetalhePagamento'>, idDetalhePagamento?: number) {
        Object.assign(this, props);
    }
}