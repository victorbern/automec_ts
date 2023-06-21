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
exports.SetClienteController = void 0;
class SetClienteController {
    constructor(setClienteUC) {
        this.setClienteUC = setClienteUC;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCliente = Number(request.params.id);
            const { nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento } = request.body;
            try {
                yield this.setClienteUC.execute({
                    idCliente,
                    nomeCliente,
                    cpfCnpj,
                    celularCliente,
                    telefoneCliente,
                    cep,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    complemento
                });
                return response.status(200).json({ error: '', result: 'Dados alterados com sucesso!' });
            }
            catch (error) {
                return response.status(500).json({
                    error: (error instanceof Error ? error.message : "Unexpected error")
                });
            }
        });
    }
}
exports.SetClienteController = SetClienteController;
//# sourceMappingURL=SetClienteController.js.map