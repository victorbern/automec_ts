"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClienteController = exports.createClienteUC = void 0;
const MySqlClientesRepository_1 = require("../../repositories/implementations/MySqlClientesRepository");
const CreateClienteController_1 = require("./CreateClienteController");
const CreateClienteUC_1 = require("./CreateClienteUC");
const mySqlClientesRepository = new MySqlClientesRepository_1.MySqlClientesRepository;
const createClienteUC = new CreateClienteUC_1.CreateClienteUC(mySqlClientesRepository);
exports.createClienteUC = createClienteUC;
const createClienteController = new CreateClienteController_1.CreateClienteController(createClienteUC);
exports.createClienteController = createClienteController;
//# sourceMappingURL=index.js.map