import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update Permission Controller', () => {
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

  it('should be able to edit a permission', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const permission = await request(app).post('/permissions').send({
      name: 'permission name',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const permissionId = JSON.parse(permission.text).id;

    await request(app).put(`/permissions?id=${permissionId}`).send({
      name: 'Permission Edit test 1',
      description: 'Permission description Edit test 1',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).get(`/permissions?id=${permissionId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body[0].name).toEqual('Permission Edit test 1');
    expect(response.body[0].description).toEqual('Permission description Edit test 1');
  });
});
