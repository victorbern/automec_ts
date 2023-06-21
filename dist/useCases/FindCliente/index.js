"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClienteController = exports.findClienteUC = void 0;
const MySqlClientesRepository_1 = require("../../repositories/implementations/MySqlClientesRepository");
const FindClienteController_1 = require("./FindClienteController");
const FindClienteUC_1 = require("./FindClienteUC");
const mySqlClientesRepository = new MySqlClientesRepository_1.MySqlClientesRepository;
const findClienteUC = new FindClienteUC_1.FindClienteUC(mySqlClientesRepository);
exports.findClienteUC = findClienteUC;
const findClienteController = new FindClienteController_1.FindClienteController(findClienteUC);
exports.findClienteController = findClienteController;
//# sourceMappingURL=index.js.map