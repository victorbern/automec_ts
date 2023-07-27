export class Funcionario {
    public idFuncionario: number;
    public nomeFuncionario: string;
    public isAtivo: string;
    public funcao: string;

    constructor(props: Omit<Funcionario, 'idFuncionario'>, idFuncionario?: number) {
        Object.assign(this, props);
    }
}