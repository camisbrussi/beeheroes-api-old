import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Find Project Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, is_volunteer, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'true', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATION_TYPES(id, name, created_at, updated_at) 
      VALUES('1', 'Project Type', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO states(id, name, uf, created_at, updated_at) 
      VALUES('1', 'state', 'st', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO cities(id, name, state_id, created_at, updated_at) 
      VALUES('1', 'city', '1', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ADDRESSES(id, city_id, created_at, updated_at) 
      VALUES('${id}', '1', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATIONS(id, name, description, cnpj, email, status, organization_type_id, address_id, created_at, updated_at) 
      VALUES('${id}', 'Donation Type', 'xxxxxx', '123456', 'organization@beeheroes.com', '1', '1', '${id}', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO PROJECTS(id, name, start, status, organization_id, created_at, updated_at) 
      VALUES('${id}', 'Project', 'now()', '1', '${id}', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to find a project', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const responseSubscription = await request(app).post('/subscriptions').send({
      registration_date: new Date(),
      project_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const subscriptionId = JSON.parse(responseSubscription.text).id;

    const response = await request(app).get(`/subscriptions/find?id=${subscriptionId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.id).toEqual(subscriptionId);
    expect(response.body).toHaveProperty('id');
  });
});
