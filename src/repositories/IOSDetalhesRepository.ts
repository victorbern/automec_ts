import { OSDetalhes } from "../entities/OSDetalhes";

export interface IOSDetalhesRepository {
    save(osDetalhes: OSDetalhes): Promise<number>;
    findByOrdemServico(idOrdemServico: number): Promise<OSDetalhes>;
    findById(idOSDetalhes: number): Promise<OSDetalhes>;
    findBetweenDates(dataDe: Date, dataAte: Date): Promise<OSDetalhes[]>;
    delete(idOSDetalhes: number): Promise<void>;
}