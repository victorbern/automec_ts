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
exports.FindAllClientesController = void 0;
class FindAllClientesController {
    constructor(findAllClientesUC) {
        this.findAllClientesUC = findAllClientesUC;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findAllClientesUC.execute();
                const clientes = result.map(cliente => {
                    return {
                        idCliente: cliente.idCliente,
                        nomeCliente: cliente.nomeCliente,
                        cpfCnpj: cliente.cpfCnpj,
                        celularCliente: cliente.celularCliente,
                        telefoneCliente: cliente.telefoneCliente,
                        cep: cliente.cep,
                        endereco: cliente.endereco,
                        numero: cliente.numero,
                        bairro: cliente.bairro,
                        cidade: cliente.cidade,
                        uf: cliente.uf,
                        complemento: cliente.complemento,
                    };
                });
                return response.status(200).json({ error: '', result: clientes });
            }
            catch (error) {
                return response.status(500).json({
                    error: (error instanceof Error ? error.message : "Unexpected error")
                });
            }
        });
    }
}
exports.FindAllClientesController = FindAllClientesController;
//# sourceMappingURL=FindAllClientesController.js.map