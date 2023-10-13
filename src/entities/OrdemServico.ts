export class OrdemServico {
    public idOrdemServico: number;
    public total: number;
    public km: number;
    public isFinalizada: boolean;
    public isPaga: boolean;
    public placaVeiculo: string;
    public idCliente: number;

    constructor(props: Omit<OrdemServico, 'idOrdemServico'>, idOrdemServico?: number){
        Object.assign(this, props);
        this.idOrdemServico = idOrdemServico;
    }
}