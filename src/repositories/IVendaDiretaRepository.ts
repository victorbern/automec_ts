import { VendaDireta } from "../entities/VendaDireta";

export interface IVendaDiretaRepository {
    save(vendaDireta: VendaDireta): Promise<number>;
    findById(idVendaDireta: number): Promise<VendaDireta>;
    findByPagamento(idPagamento: number): Promise<VendaDireta>;
    delete(idVendaDireta: number): Promise<void>;
}