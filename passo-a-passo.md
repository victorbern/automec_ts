# Passo a Passo

# Inicialização do Projeto

1- Criação de diretório onde seria criado a aplicação  
2- Abri o cmd no diretório, e executei o seguinte comando para inicializar o novo projeto TypeScript:  
```console
    npm init -y
```
3- Em seguida, instalei as dependências do TypeScript:  
```console
    npm install typescript ts-node  
```
4- Criei o arquivo de configuração do TypeScript: 
```console 
    npx tsc --init  
```

# Inicialização do Prisma

1- Instalei o prisma e suas dependências com o seguinte comando:  
```console
   npm install prisma
```
2- Instalei também o driver do MySQL para fazer a conexão com o banco de dados:  
```console
   npm install mysql
```
3- Executei o seguinte comando para fazer a configuração do Prisma:  
```console
    npx prisma init
```
Este comando criou a estrutura inicial do Prisma, o que inclui o arquivo 'prisma/schema.prisma'  

# Conexão do Prisma com o Banco de Dados

Como já tennho um banco de dados criado, com todas as tabelas, deixei-o rodando localmente  
na porta padrão 3306. Logo em seguida, fiz os seguintes passos:  

1- Acessei o arquivo de configuração do prisma, o 'schema.prisma' e adicinei a configuração necessária para conectar-se ao banco de dados.  
2- Executei o seguinte comando para coletar os dados do meu bd já criado:  
```console
    npx prisma db pull
```
3- Logo em seguida, rodei seguinte comando para gerar os arquivos do Prisma a partir do meu bd:  
```console
    npx prisma generate
```
4- Fiz alterações referentes às boas práticas de nomenclatura do prisma, como iniciais maiúsculas para nomes de models.

# Criando a primeira migration

1- Criei uma pasta para armazenar as migrations, sendo a '0_init' a primeira migration:
```console
    mkdir -p prisma/migrations/0_init
```
2- Gerei um arquivo de migração com o seguinte código:
```console
    npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```
3- Executei o comando para marcar como aplicada a migração:
```console
    npx prisma migrate resolve --applied 0_init
```

# Criando ambiente de testes

1- Instalei o Vitest no ambiente de desenvolvimento:
```console
    npm install vitest -D
```

Erros: 

1- Erro P3017 na hora de dar o comando número 3. Solução: 

```text
    1- Open the migration.sql file
    2- Open command palette (Ctrl+Shift+P) and search for "Change File Encoding"
    3- Select "Save with encoding"
    4- Select "window1252" 
```

Solução encontrada em: https://stackoverflow.com/questions/76321912/error-p3017-when-i-run-npx-prisma-command
# Criação da primeira API
    mvn spring-boot:run

