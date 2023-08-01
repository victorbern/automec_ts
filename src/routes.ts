import { Router } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";
import { findAllClientesController } from "./useCases/clientes/FindAllClientes";
import { findClienteController } from "./useCases/clientes/FindCliente";
import { setClienteController } from "./useCases/clientes/SetCliente";
import { delClienteController } from "./useCases/clientes/DelCliente";
import { createVeiculoController } from "./useCases/veiculos/CreateVeiculo";
import { findAllVeiculosController } from "./useCases/veiculos/FindAllVeiculos";
import { findVeiculoController } from "./useCases/veiculos/FindVeiculo";
import { setVeiculoController } from "./useCases/veiculos/SetVeiculo";
import { delVeiculoController } from "./useCases/veiculos/DelVeiculo";
import { createFuncionarioController } from "./useCases/funcionarios/CreateFuncionario";
import { findAllFuncionariosController } from "./useCases/funcionarios/FindAllFuncionarios";
import { findFuncionarioController } from "./useCases/funcionarios/FindFuncionario";
import { setFuncionarioController } from "./useCases/funcionarios/SetFuncionario";
import { setServicoController } from "./useCases/servicos/SetServico";
import { findAllServicosController } from "./useCases/servicos/FindAllServicos";
import { findServicoController } from "./useCases/servicos/FindServico";
import { createServicoController } from "./useCases/servicos/CreateServico";

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

router.get('/veiculo/:placaVeiculo', async (request, response) => {
    return findVeiculoController.handle(request, response);
})

router.put('/veiculo/:placaVeiculo', async (request, response) => {
    return setVeiculoController.handle(request, response);
})

router.delete('/veiculo/:placaVeiculo', async (request, response) => {
    return delVeiculoController.handle(request, response);
})

router.post('/funcionario', async (request, response) => {
    return createFuncionarioController.handle(request, response);
})

router.get('/funcionarios', async (request, response) => {
    return findAllFuncionariosController.handle(request, response);
})

router.get('/funcionario/:idFuncionario', async (request, response) => {
    return findFuncionarioController.handle(request, response);
})

router.put('/funcionario/:idFuncionario', async (request, response) => {
    return setFuncionarioController.handle(request, response);
})

router.post('/servico/', async (request, response) => {
    return createServicoController.handle(request, response);
})

router.get('/servicos/', async (request, response) => {
    return findAllServicosController.handle(request, response);
})

router.get('/servico/:idServico', async (request, response) => {
    return findServicoController.handle(request, response);
})

router.put('/servico/:idServico', async (request, response) => {
    return setServicoController.handle(request, response);
})

export { router }
