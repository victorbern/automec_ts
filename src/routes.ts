import { Router } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";
import { findAllClientesController } from "./useCases/clientes/FindAllClientes";
import { findClienteController } from "./useCases/clientes/FindCliente";
import { setClienteController } from "./useCases/clientes/SetCliente";
import { delClienteController } from "./useCases/clientes/DelCliente";
import { createVeiculoController } from "./useCases/veiculos/CreateVeiculo";
import { findAllVeiculosController } from "./useCases/veiculos/FindAllVeiculos";

const router = Router();

router.post('/cliente', async (request, response) => {
    return createClienteController.handle(request, response);
})

router.get('/clientes', async (request, response) => {
    return findAllClientesController.handle(request, response);
})

router.get('/cliente/:id', async (request, response) => {
    return findClienteController.handle(request, response);
})

router.put('/cliente/:id', async (request, response) => {
    return setClienteController.handle(request, response);
})

router.delete('/cliente/:id', async (request, response) => {
    return delClienteController.handle(request, response);
})

router.post('/veiculo', async (request, response) => {
    return createVeiculoController.handle(request, response);
})

router.get('/veiculos', async (request, response) => {
    return findAllVeiculosController.handle(request, response);
})

export { router }