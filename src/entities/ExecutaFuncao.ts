export class ExecutaFuncao {
    public idFuncionario: number;
    public idServico: number;
    public observacao: string;
    public idOSDetalhes: number;

    constructor(props: ExecutaFuncao) {
        Object.assign(this, props);
    }

}