"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetClienteUC = void 0;
const Cliente_1 = require("../../entities/Cliente");
class SetClienteUC {
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data.idCliente || !data.nomeCliente || !data.cpfCnpj || !data.celularCliente) {
                    throw new Error("Data missing");
                }
                const clienteExistCpfCnpj = yield this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
                if (clienteExistCpfCnpj.idCliente == data.idCliente) {
                    throw new Error("The CPF/CNPJ is already associated");
                }
                const clienteExistId = yield this.clientesRepository.findById(data.idCliente);
                if (!clienteExistId) {
                    throw new Error("Client not found");
                }
                const cliente = new Cliente_1.Cliente(data);
                yield this.clientesRepository.update(cliente);
            }
            catch (error) {
                return (error);
            }
        });
    }
}
exports.SetClienteUC = SetClienteUC;
//# sourceMappingURL=SetClienteUC.js.map