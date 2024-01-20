<h1>Automec</h1> 

<p align="center">
  <img src="https://github.com/nodejs/nodejs.org/raw/main/public/static/images/logos/nodejs-new-pantone-white.svg" width="50px" height="50px"/>

</p>

> Status do Projeto: :heavy_check_mark: concluido

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Deploy da Aplicação](#deploy-da-aplicação-dash)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

... 

Insira os tópicos do README em links para facilitar a navegação do leitor

## Descrição do projeto 

<p align="justify">
  Sistema de gerenciamento de uma oficina mecânica especializada em troca de óleo. Aplicação que permite a manipulação de clientes, veiculos, servicos, produtos, ordens de serviço, pagamentos e relatórios.
</p>

## Funcionalidades

:heavy_check_mark: Criar, buscar, editar e remover clientes.

:heavy_check_mark: Criar, buscar, editar e remover veículos.  

:heavy_check_mark: Criar, buscar, editar e alterar o estoque de produtos.

:heavy_check_mark: Criar, buscar e editar funcionários.

:heavy_check_mark: Criar, buscar e editar serviços.

:heavy_check_mark: Criar, buscar, editar e remover ordens de serviço.

:heavy_check_mark: Criar, buscar e cancelar pagamentos.

:heavy_check_mark: Gerar relatórios de pagamentos criados em um período.

:heavy_check_mark: Gerar relatórios de ordens de serviço com base no tipo de pagamento em um período.

:heavy_check_mark: Gerar relatório de produtos com base na quantidade vendida em um periodo.

Se ainda não houver deploy, insira capturas de tela da aplicação ou gifs

## Pré-requisitos

:warning: [Docker](https://www.docker.com/products/docker-desktop/)

## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/victorbern/automec_ts.git
```
Após clonar o projeto, acesse a pasta:
```
cd automec_ts
```
Rode o seguinte código no terminal:
```
docker compose up
```
Pronto, agora o docker irá baixar a imagem do front-end, do mysql, do nginx e do adminer e irá criar uma imagem nova a partir do código do projeto.
Logo após tudo carregar, o sistema ficará disponível para uso em https://localhost:3050
... 

## Como rodar os testes

Para rodar os testes, com o terminal aberto rode:

```
$ npm test
```

## Casos de Uso

Explique com mais detalhes como a sua aplicação poderia ser utilizada. O uso de **gifs** aqui seria bem interessante. 

Exemplo: Caso a sua aplicação tenha alguma funcionalidade de login apresente neste tópico os dados necessários para acessá-la.

## JSON :floppy_disk:

### Usuários: 

|name|email|password|token|avatar|
| -------- |-------- |-------- |-------- |-------- |
|Lais Lima|laislima98@hotmail.com|lais123|true|https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-U_HbQAipum9lWln3APcBIwng7T46hdBA42EJv8Hf6Z4fDT3&usqp=CAU|

... 

Se quiser, coloque uma amostra do banco de dados 

## Linguagens, dependencias e libs utilizadas :books:

- [React](https://pt-br.reactjs.org/docs/create-a-new-react-app.html)
- [React PDF](https://react-pdf.org/)

...

Liste as tecnologias utilizadas no projeto que **não** forem reconhecidas pelo Github 

## Tarefas em aberto

Se for o caso, liste tarefas/funcionalidades que ainda precisam ser implementadas na sua aplicação

:memo: Tarefa 1 

:memo: Tarefa 2 

:memo: Tarefa 3 

## Desenvolvedores/Contribuintes :octocat:

## Licença 

The [MIT License]() (MIT)

Copyright :copyright: 2023 - Automec
