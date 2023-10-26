export interface IFindPagamentoRequestDTO {
    idPagamento: number;
}

export interface IFindPagamentoResponseDTO {
    idPagamento: number;
    subtotal: number;
    total: number;
    formaPagamento: string;
    desconto: number;
    dataHora: Date;
    vendaDireta: IFindPagamentoVendaDireta[];
    ordensServico: IFindPagamentoOrdemServico[];
}

export interface IFindPagamentoVendaDireta {
    codigoBarras: string;
    descricao?: string;
    quantidadeVendida: number;
    precoTotal: number;
    precoUnitario: number;
}

export interface IFindPagamentoOrdemServico {
    idOrdemServico: number;
    total: number;
    dataOS?: Date;
    km: number;
    cliente: IFindPagamentoCliente;
    veiculo: IFindPagamentoVeiculo;
}

export interface IFindPagamentoCliente {
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

export interface IFindPagamentoVeiculo {
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