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
exports.FindClienteController = void 0;
class FindClienteController {
    constructor(findClienteUC) {
        this.findClienteUC = findClienteUC;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCliente = Number(request.params.id);
            try {
                const cliente = yield this.findClienteUC.execute({ idCliente });
                if (cliente) {
                    return response.status(200).json({ error: '', result: cliente });
                }
                return response.status(400).json({ error: 'Cliente não encontrado!', result: '' });
            }
            catch (error) {
                return response.status(500).json({
                    error: (error instanceof Error ? error.message : "Unexpected error")
                });
            }
        });
    }
}
exports.FindClienteController = FindClienteController;
//# sourceMappingURL=FindClienteController.js.map