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
exports.MySqlClientesRepository = void 0;
const client_1 = require("@prisma/client");
class MySqlClientesRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    findByCpfCnpj(cpfCnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield this.prisma.cliente.findUnique({
                where: {
                    cpfCnpj: cpfCnpj,
                }
            });
            return cliente;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield this.prisma.cliente.findMany();
            return clientes;
        });
    }
    findById(idCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield this.prisma.cliente.findUnique({
                where: {
                    idCliente: idCliente,
                }
            });
            return cliente;
        });
    }
    save(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            this.prisma.cliente.create({
                data: cliente
            });
        });
    }
    update(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.cliente.update({
                where: {
                    idCliente: cliente.idCliente
                },
                data: cliente,
            });
        });
    }
}
exports.MySqlClientesRepository = MySqlClientesRepository;
//# sourceMappingURL=MySqlClientesRepository.js.map