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
2. Crie duas databases no seu banco (beeheroes e beeheroes_test)
2. Execute os comandos abaixos;

  ```
  npm run typeorm migration:run / yarn typeorm migration:run
  docker-compose up -d
  ``` 
 3. Acesse http://localhost:3333 para ver o resultado.
 4. Você pode exportar o arquivo Insonia para fazer os testes das rotas
    
 ## TDD Desenvolvimento Orientado por Testes (Test Driven Development)
 
 Execute o comando abaixo para executar os testes;
  ```
  npm run test / yarn test
  ``` 
 
![image](https://user-images.githubusercontent.com/40186019/156446445-7adabe8e-c1dc-4352-85fd-89b0f6ac5a61.png)
  
Criado por: [Camila Sbrussi](https://github.com/camisbrussi/)!
