import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update Role Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

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

  it('should be able to edit a role', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const role = await request(app).post('/roles').send({
      name: 'role name',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const roleId = JSON.parse(role.text).id;

    await request(app).put(`/roles?id=${roleId}`).send({
      name: 'Role Edit test 1',
      description: 'Role description Edit test 1',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).get(`/roles?id=${roleId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body[0].name).toEqual('Role Edit test 1');
    expect(response.body[0].description).toEqual('Role description Edit test 1');
  });
});
