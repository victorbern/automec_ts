import { Funcionario } from "../../entities/Funcionario";
import { IFuncionariosRepository } from "../IFuncionariosRepository";

export class InMemoryFuncionariosRepository implements IFuncionariosRepository {
    public items: Funcionario[] = [
        {
            idFuncionario: 1,
            nomeFuncionario: "Andre",
            isAtivo: "true",
            funcao: "Mecânico",
        },
    ];

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

    async findAllWithFilter(filtro: string): Promise<Funcionario[]> {
        let funcionarios: Funcionario[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].nomeFuncionario.includes(filtro) || this.items[i].funcao.includes(filtro)) {
                funcionarios.push(this.items[i]);
            }
        }

        return funcionarios;
    }

    async findByIdFuncionario(idFuncionario: number): Promise<Funcionario> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idFuncionario === idFuncionario) {
                return this.items[i];
            }
        }
        return null;
    }

    async update(funcionario: Funcionario): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idFuncionario === funcionario.idFuncionario) {
                this.items[i] = {
                    idFuncionario: funcionario.idFuncionario,
                    nomeFuncionario: funcionario.nomeFuncionario,
                    isAtivo: funcionario.isAtivo,
                    funcao: funcionario.funcao,
                };
            }
        }
    }

    async delete(idFuncionario: number): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].idFuncionario === idFuncionario) {
                this.items.splice(i, 1);
            }
        }
    }
}
