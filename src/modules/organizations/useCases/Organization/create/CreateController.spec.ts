import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Organization Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'user Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '${id}', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATION_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Organization Type', 'xxxxxx', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new organization ', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a organization with email exist', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });
});
