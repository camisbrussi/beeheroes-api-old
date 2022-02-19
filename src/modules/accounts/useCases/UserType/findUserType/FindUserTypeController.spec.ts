import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update User Type Controller', () => {
  const id = uuidV4();
  beforeAll(async() => {
    connection = await createdConnection();
    await connection.runMigrations();
    
    await connection.query(
      `INSERT INTO USERS_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'User Type', 'xxxxxx', 'now()', 'now()')`,
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

  it('should be able to find a user type by id', async() => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    await request(app).post('/usertypes').send({ 
      name: 'User Type Supertest',
      description: 'User Type Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get(`/usertypes/find?id=${id}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.id).toEqual(id);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('User Type');
  });
})