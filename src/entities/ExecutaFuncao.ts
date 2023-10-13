export class ExecutaFuncao {
    public idOSDetalhes: number;
    public idServico: number;
    public idFuncionario: number;
    public observacao: string;

    constructor(props: ExecutaFuncao) {
        Object.assign(this, props);
    }

}