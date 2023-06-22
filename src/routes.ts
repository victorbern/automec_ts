import { Router } from "express";
import { createClienteController } from "./useCases/CreateCliente";
import { findAllClientesController } from "./useCases/FindAllClientes";
import { findClienteController } from "./useCases/FindCliente";
import { setClienteController } from "./useCases/SetCliente";
import { delClienteController } from "./useCases/DelCliente";

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

export { router }