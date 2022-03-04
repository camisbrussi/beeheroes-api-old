import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update User Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(name, description, created_at, updated_at) 
      VALUES('User Type', 'xxxxxx', 'now()', 'now()')`,
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

  it('should be able to edit a user', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    await request(app).put(`/users?id=${id}`).send({
      name: 'Admin - editado',
      email: 'editado@beeheroes.com',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get(`/users/find/?id=${id}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.name).toEqual('Admin - editado');
    expect(response.body.email).toEqual('editado@beeheroes.com');
  });

  it('should be able to edit a user and add address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'editado@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    await request(app).put(`/users?id=${id}`).send({
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get(`/users/find/?id=${id}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.address).not.toBeNull();
    expect(response.body.address.street).toEqual('Street Example');
  });
});
