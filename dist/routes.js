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
exports.router = void 0;
const express_1 = require("express");
const CreateCliente_1 = require("./useCases/CreateCliente");
const FindAllClientes_1 = require("./useCases/FindAllClientes");
const FindCliente_1 = require("./useCases/FindCliente");
const SetCliente_1 = require("./useCases/SetCliente");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/cliente', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return CreateCliente_1.createClienteController.handle(request, response);
}));
router.get('/clientes', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return FindAllClientes_1.findAllClientesController.handle(request, response);
}));
router.get('/cliente/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return FindCliente_1.findClienteController.handle(request, response);
}));
router.put('/cliente/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return SetCliente_1.setClienteController.handle(request, response);
}));
//# sourceMappingURL=routes.js.map