import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Entity Type Controller', () => {
  beforeAll(async() => {
    const id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USERS_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Entity Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '${id}', 'true' , 'now()', 'now()')`,
    );
  });

    afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new entity type', async() => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app).post('/entitytypes').send({ 
      name: 'Entity Type Supertest',
      description: 'Entity Type Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });
    expect(response.status).toBe(201);
  });

  it('should not be able to create a entity type with name exist', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const { refresh_token } = responseToken.body;
    const response = await request(app).post('/entitytypes').send({
      name: 'Entity Type Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });;

    expect(response.status).toBe(400);
  });
});