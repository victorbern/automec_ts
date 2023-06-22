"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllClientesController = exports.findAllClientesUC = void 0;
const MySqlClientesRepository_1 = require("../../repositories/implementations/MySqlClientesRepository");
const FindAllClientesController_1 = require("./FindAllClientesController");
const FindAllClientesUC_1 = require("./FindAllClientesUC");
const mySqlClientesRepository = new MySqlClientesRepository_1.MySqlClientesRepository;
const findAllClientesUC = new FindAllClientesUC_1.FindAllClientesUC(mySqlClientesRepository);
exports.findAllClientesUC = findAllClientesUC;
const findAllClientesController = new FindAllClientesController_1.FindAllClientesController(findAllClientesUC);
exports.findAllClientesController = findAllClientesController;
//# sourceMappingURL=index.js.map