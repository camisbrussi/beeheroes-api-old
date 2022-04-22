<h1 align="center"> BEEHEROES - API </h1>


## Descrição
<strong>Beeheores-API:</strong>  Está api será utilizada na plataforma Beeheroes. O Beeheroes será um projeto desenvolvido 
para atender o problema de pesquisa exposta no trabalho de conclusão do curso Engenharia de Software. 

Título do TCC: BEE HEROES: APLICANDO OS PRINCÍPIOS DE EXPERIÊNCIA DO USUÁRIO E USABILIDADE NO RECRUTAMENTO DE VOLUNTÁRIOS

##  Tecnologias
- Typescript
- Node
- Doker
- TypeORM
- Express
- Jest
- Supertest
- Multer

## Requisitos
- node
- npm
- docker
- docker-compose
- postgres 

## Instalação local


1. Faça um clone desse projeto;
2. Execute os comandos abaixos;

Criação da imagem, do banco e da aplicação
```
  docker-compose up -d
 ```

Criando as tabelas do banco de dados

```
  npm run typeorm migration:run / yarn typeorm migration:run
```

Criação de um usário Admin, com a senha admin, para acesso ao sistema
```
  npm run seed:admin / yarn seed:admin 
```

Alimentação do banco com os estados do Brasil
```
  npm run seed:states / yarn seed:states 
```

Alimentação do banco com as cidades do Brasil
```
  npm run seed:cities / yarn seed:cities
```

Alimentação do banco com as áreas profissionais
```
  npm run seed:occupation / yarn seed:occupation
```

Alimentação do banco com os tipos de entidades
```
  npm run seed:organizationType / yarn seed:organizationType
```



  
 3. Acesse http://localhost:3333 para ver o resultado.
 4. Você pode exportar o arquivo Insonia para fazer os testes das rotas
    
 ## TDD Desenvolvimento Orientado por Testes (Test Driven Development)

 O desenvolvimento deste trabalho usou o método TDD, para rodar os testes, execute o comando abaixo para executar os testes;
  ```
  npm run test / yarn test
  ``` 

  
Criado por: [Camila Sbrussi](https://github.com/camisbrussi/)!
