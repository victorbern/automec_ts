export class Veiculo {
    public placaVeiculo: string;
    public marca: string;
    public modelo: string;
    public ano: number;
    public capacidadeOleo: number;
    public cor: string;
    public idCliente: number;

    constructor(props: Veiculo){
        Object.assign(this, props);
    }
}