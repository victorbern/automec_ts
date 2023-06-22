"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClienteController = exports.setClienteUC = void 0;
const MySqlClientesRepository_1 = require("../../repositories/implementations/MySqlClientesRepository");
const SetClienteController_1 = require("./SetClienteController");
const SetClienteUC_1 = require("./SetClienteUC");
const mySqlClientesRepository = new MySqlClientesRepository_1.MySqlClientesRepository;
const setClienteUC = new SetClienteUC_1.SetClienteUC(mySqlClientesRepository);
exports.setClienteUC = setClienteUC;
const setClienteController = new SetClienteController_1.SetClienteController(setClienteUC);
exports.setClienteController = setClienteController;
//# sourceMappingURL=index.js.map