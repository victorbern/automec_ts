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
exports.CreateClienteUC = void 0;
const Cliente_1 = require("../../entities/Cliente");
class CreateClienteUC {
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nomeCliente || !data.celularCliente || !data.cpfCnpj) {
                throw new Error('There are missing fields');
            }
            const clienteAlreadyExists = yield this.clientesRepository.findByCpfCnpj(data.cpfCnpj);
            if (clienteAlreadyExists) {
                throw new Error('The CPF/CNPJ already exists');
            }
            const cliente = new Cliente_1.Cliente(data);
            try {
                yield this.clientesRepository.save(cliente);
            }
            catch (error) {
            }
        });
    }
}
exports.CreateClienteUC = CreateClienteUC;
//# sourceMappingURL=CreateClienteUC.js.map