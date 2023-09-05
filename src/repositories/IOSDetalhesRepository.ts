import { OSDetalhes } from "../entities/OSDetalhes";

export interface IOSDetalhesRepository {
    save(osDetalhes: OSDetalhes): Promise<number>;
}