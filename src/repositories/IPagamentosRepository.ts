import { Pagamento } from "../entities/Pagamento";

export interface IPagamentosRepository {
    save(pagamento: Pagamento): Promise<number>;
    findAll(): Promise<Pagamento[]>;
    findById(idPagamento: number): Promise<Pagamento>;
    findBetweenDates(dataDe: Date, dataAte: Date): Promise<Pagamento[]>;
    delete(idPagamento: number): Promise<void>;
}