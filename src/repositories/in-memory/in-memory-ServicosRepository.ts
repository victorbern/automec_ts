import { Servico } from "../../entities/Servico";
import { IServicosRepository } from "../IServicosRepository";

export class InMemoryServicosRepository implements IServicosRepository {
    public items: Servico[] = [
        {
            idServico: 1,
            descricaoServico: "Troca de Oleo",
            precoServico: 20,
        },
    ];

    async save(servico: Servico): Promise<void> {
        let id = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idServico > id) {
                id++;
            }
        }
        servico.idServico = id + 1;
        this.items.push(servico);
    }

    async findAll(): Promise<Servico[]> {
        return this.items;
    }

    async findAllWithFilter(filtro: string): Promise<Servico[]> {
        let servicos: Servico[] = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].descricaoServico.includes(filtro)) {
                servicos.push(this.items[i]);
            }
        }

        return servicos;
    }

    async findByIdServico(idServico: number): Promise<Servico> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idServico === idServico) {
                return this.items[i];
            }
        }
        return null;
    }

    async update(servico: Servico): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idServico === servico.idServico) {
                this.items[i] = {
                    idServico: servico.idServico,
                    descricaoServico: servico.descricaoServico,
                    precoServico: servico.precoServico,
                };
            }
        }
    }
}
