import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(name, description, created_at, updated_at) 
      VALUES('Entity Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO states(id, name, uf, created_at, updated_at) 
      VALUES('1', 'state', 'st', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO cities(id, name, state_id, created_at, updated_at) 
      VALUES('1', 'city', '1', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user ', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/users').send({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: '1',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a user with email exist', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/users').send({
      name: 'Admin2',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: '1',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });

  it('should be able to create a new user with address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const user = await request(app).post('/users').send({
      name: 'Admin',
      email: 'supertest2@beeheroes.com',
      password: '123456',
      user_type_id: '1',
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const idUser = JSON.parse(user.text).id;

    const response = await request(app).get(`/users/find?id=${idUser}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(user.status).toBe(201);
    expect(response.body.address).not.toBeNull();
  });
});
