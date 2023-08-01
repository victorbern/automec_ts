export class Servico {
    public idServico: number;
    public descricaoServico: string;
    public precoServico: number;
    
    constructor(props: Omit<Servico, 'idServico'>, idServico?: number) {
        Object.assign(this, props);
    }
}