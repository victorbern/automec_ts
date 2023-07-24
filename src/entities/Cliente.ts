export class Cliente {
    public idCliente: number;

    public nomeCliente: string;
    public cpfCnpj: string;
    public celularCliente: string;
    public telefoneCliente: string;
    public cep: string;
    public endereco: string;
    public numero: string;
    public bairro: string;
    public cidade: string;
    public uf: string;
    public complemento: string;

    constructor(props: Omit<Cliente, 'idCliente'>, idCliente?: string){
        Object.assign(this, props);
    }
}