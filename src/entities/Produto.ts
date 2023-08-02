export class Produto {
    public codigoBarras: string;
    public descricao: string;
    public valorCusto: number;
    public quantidadeEstoque: number;
    public precoVenda: number;

    constructor(props: Produto) {
        Object.assign(this, props);
    }
}