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
import { createProdutoController } from "./useCases/produtos/CreateProduto";
import { findAllProdutosController } from "./useCases/produtos/FindAllProdutos";
import { findProdutoController } from "./useCases/produtos/FindProduto";
import { setProdutoController } from "./useCases/produtos/SetProduto";
import { createOrdemServicoController } from "./useCases/ordens_servico/CreateOrdemServico";
import { findOrdemServicoController } from "./useCases/ordens_servico/FindOrdemServico";
import { findAllOrdemServicoController } from "./useCases/ordens_servico/FindAllOrdemServico";

const router = Router();

// Inserir novo cliente
router.post('/cliente', async (request, response) => {
    return createClienteController.handle(request, response);
})

// Buscar todos os clientes
router.get('/clientes', async (request, response) => {
    return findAllClientesController.handle(request, response);
})

// Buscar clientes usando filtro
router.get('/clientes/:filtro', async (request, response) => {
    return findAllClientesController.handle(request, response);
})

// Buscar cliente pelo id
router.get('/cliente/:id', async (request, response) => {
    return findClienteController.handle(request, response);
})

// Alterar dados de cliente
router.put('/cliente/:id', async (request, response) => {
    return setClienteController.handle(request, response);
})

// Deletar cliente
router.delete('/cliente/:id', async (request, response) => {
    return delClienteController.handle(request, response);
})

// Inserir novo veículo
router.post('/veiculo', async (request, response) => {
    return createVeiculoController.handle(request, response);
})

// Buscar todos os veículos
router.get('/veiculos', async (request, response) => {
    return findAllVeiculosController.handle(request, response);
})

// Buscar veículos usando filtro
router.get('/veiculos/:filtro', async (request, response) => {
    return findAllVeiculosController.handle(request, response);
})

// Buscar veículo pela placa
router.get('/veiculo/:placaVeiculo', async (request, response) => {
    return findVeiculoController.handle(request, response);
})

// Alterar dados de veículo
router.put('/veiculo/:placaVeiculo', async (request, response) => {
    return setVeiculoController.handle(request, response);
})

// Deletar veículo
router.delete('/veiculo/:placaVeiculo', async (request, response) => {
    return delVeiculoController.handle(request, response);
})

// Criar novo funcionário
router.post('/funcionario', async (request, response) => {
    return createFuncionarioController.handle(request, response);
})

// Buscar todos os funcionários
router.get('/funcionarios', async (request, response) => {
    return findAllFuncionariosController.handle(request, response);
})

// Buscar funcionários usando filtro
router.get('/funcionarios/:filtro', async (request, response) => {
    return findAllFuncionariosController.handle(request, response);
})

// Buscar funcionário pelo id
router.get('/funcionario/:idFuncionario', async (request, response) => {
    return findFuncionarioController.handle(request, response);
})

// Alterar dados de funcionário
router.put('/funcionario/:idFuncionario', async (request, response) => {
    return setFuncionarioController.handle(request, response);
})

// Criar novo serviço
router.post('/servico/', async (request, response) => {
    return createServicoController.handle(request, response);
})

// Buscar todos os serviços
router.get('/servicos/', async (request, response) => {
    return findAllServicosController.handle(request, response);
})

// Buscar serviços usando filtro
router.get('/servicos/:filtro', async (request, response) => {
    return findAllServicosController.handle(request, response);
})

// Buscar serviço pelo id
router.get('/servico/:idServico', async (request, response) => {
    return findServicoController.handle(request, response);
})

// Alterar dados de serviço
router.put('/servico/:idServico', async (request, response) => {
    return setServicoController.handle(request, response);
})

// Criar novo produto
router.post('/produto/', async (request, response) => {
    return createProdutoController.handle(request, response);
})

// Buscar todos os produtos
router.get('/produtos/', async (request, response) => {
    return findAllProdutosController.handle(request, response);
})

// Buscar produtos usando filtro
router.get('/produtos/:filtro', async (request, response) => {
    return findAllProdutosController.handle(request, response);
})

// Buscar produto pelo código de barras
router.get('/produto/:codigoBarras', async (request, response) => {
    return findProdutoController.handle(request, response);
})

// Alterar dados de produto
router.put('/produto/:codigoBarras', async (request, response) => {
    return setProdutoController.handle(request, response);
})

// Criar nova ordem de serviço
router.post('/ordem-servico/', async (request, response) => {
    return createOrdemServicoController.handle(request, response);
})

// Busca uma ordem de serviço pelo id
router.get('/ordem-servico/:id', async (request, response) => {
    return findOrdemServicoController.handle(request, response);
})

// Busca todas as ordens de serviço
router.get('/ordens-servico/', async (request, response) => {
    return findAllOrdemServicoController.handle(request, response);
})

// Busca ordens de serviço usando filtro
router.get('/ordens-servico/:filtro', async (request, response) => {
    return findAllOrdemServicoController.handle(request, response);
})

export { router }
