import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update Occupation Area Controller', () => {
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();
    const id = uuidV4();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, is_volunteer, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'true', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to edit a occupation area', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const responseType = await request(app).post('/occupationarea').send({
      name: 'Occupation Area Supertest',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const typeId = JSON.parse(responseType.text).id;

    await request(app).put(`/occupationarea?id=${typeId}`).send({
      name: 'Occupation Area Edit test 1',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).get(`/occupationarea?id=${typeId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body[0].name).toEqual('Occupation Area Edit test 1');
  });
});
