export interface IFindAllPagamentosRequestDTO {
    filtro?: string;
}

export interface IFindAllPagamentosResponseDTO {
    idPagamento: number;
    subtotal: number;
    total: number;
    formaPagamento: string;
    desconto: number;
    dataHora: Date;
    vendaDireta: IFindAllPagamentosVendaDireta[];
    ordensServico: IFindAllPagamentosOrdemServico[];
}

export interface IFindAllPagamentosVendaDireta {
    codigoBarras: string;
    descricao?: string;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}

export interface IFindAllPagamentosOrdemServico {
    idOrdemServico: number;
    total: number;
    dataOS: Date;
    km: number;
    cliente: IFindAllPagamentosCliente;
    veiculo: IFindAllPagamentosVeiculo;
}

export interface IFindAllPagamentosCliente {
    idCliente?: number;
    nomeCliente?: string;
    cpfCnpj?: string;
    celularCliente?: string;
    telefoneCliente?: string;
    cep?: string;
    endereco?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    complemento?: string;
}

export interface IFindAllPagamentosVeiculo {
    placaVeiculo?: string;
    marca?: string;
    modelo?: string;
    ano?: number;
    capacidadeOleo?: number;
    cor?: string;
    idCliente?: number;
    nomeCliente?: string;
    celularCliente?: string;
}