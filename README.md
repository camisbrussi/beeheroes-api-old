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
  npm run seed:admin / yarn admin 
```

Alimentação do banco com os estados do Brasil
```
  npm run seed:states / yarn states 
```

Alimentação do banco com as citades do Brasil
```
  npm run seed:cities / yarn cities
```


  
 3. Acesse http://localhost:3333 para ver o resultado.
 4. Você pode exportar o arquivo Insonia para fazer os testes das rotas
    
 ## TDD Desenvolvimento Orientado por Testes (Test Driven Development)
 
 Execute o comando abaixo para executar os testes;
  ```
  npm run test / yarn test
  ``` 
 
![image](https://user-images.githubusercontent.com/40186019/156893342-8b5579ba-25c6-4145-9eaa-d7df5297e007.png)
  
Criado por: [Camila Sbrussi](https://github.com/camisbrussi/)!
