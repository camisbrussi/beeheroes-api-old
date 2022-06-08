import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Filer Organization Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    jest.setTimeout(100000);
    connection = await createdConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, is_volunteer, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'true', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATION_TYPES(id, name, created_at, updated_at) 
      VALUES('1', 'Organization Type', 'now()', 'now()')`,
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

  it('should be able to filter a organization for name', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
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

    await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization2@beeheroes.com',
      cnpj: '1111111111',
      description: 'Description Organization',
      organization_type_id: 1,
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
    const response = await request(app).post('/organizations/filter').send({
      query: {
        name: 'Organization',
      },
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.length).toEqual(2);
  });
});
