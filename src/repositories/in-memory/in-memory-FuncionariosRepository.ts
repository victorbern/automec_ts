import { Funcionario } from "../../entities/Funcionario";
import { IFuncionariosRepository } from "../IFuncionariosRepository";

export class InMemoryFuncionariosRepository implements IFuncionariosRepository {
    public items: Funcionario[] = [
        {
            idFuncionario: 1,
            nomeFuncionario: "Andre",
            isAtivo: "true",
            funcao: "Mecânico"
        }
    ]

    async save(funcionario: Funcionario): Promise<void> {
        let id = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idFuncionario > id) {
                id++;
            }
        }
        funcionario.idFuncionario = id + 1;
        this.items.push(funcionario);
    }

    async findAll(): Promise<Funcionario[]> {
        return this.items;
    }

    async findByIdFuncionario(idFuncionario: number): Promise<Funcionario> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idFuncionario === idFuncionario) {
                return this.items[i];
            }
        }
        return null;
    }
}