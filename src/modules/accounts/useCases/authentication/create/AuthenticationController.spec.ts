import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Authentication Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();

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

  it('should be able to authentication an user', async () => {
    const response = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authentication an user', async () => {
    const response = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'password incorret',
      });

    expect(response.status).toBe(400);
  });
});
