import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Find Occupation Area Controller', () => {
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();
    const id = uuidV4();

    await connection.query(
      `INSERT INTO USER_TYPES(name, description, created_at, updated_at) 
      VALUES('Organization Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1', '1' , 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to find a occupation area by id', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const responseOccupation = await request(app).post('/occupationarea').send({
      name: 'Occupation Area Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const occupationId = JSON.parse(responseOccupation.text).id;

    const response = await request(app).get(`/occupationarea/find?id=${occupationId}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.id).toEqual(occupationId);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Occupation Area Supertest');
  });
});
